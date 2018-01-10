USE [barrier_staging]
GO

CREATE VIEW [dbo].[vw_sap_work_order_data_stage_1] AS
SELECT COALESCE(asset.id,-1) asset_id
	  ,COALESCE([facility].[id],-1) [facility_id]
	  ,COALESCE(ps.id,-1) [performance_standard_id]
	  ,COALESCE(pg.id,-1) [planner_group_id]
	  ,COALESCE(abc.id, -1) [abc_indicator_id]
	  ,CASE
					WHEN [data].[order_type] = 'UM02'
					AND PATINDEX('%DFRD%', [user_status]) > 0
					AND CAST([data].[latest_allowable_finish_date] AS DATETIME2) >= Getdate()
					THEN 'Deferred Reactive'

					WHEN [data].[order_type] = 'UM01'
					AND PATINDEX('%DFRD%', [user_status]) > 0
					AND CAST([data].[latest_allowable_finish_date] AS DATETIME2) >= Getdate()
					THEN 'Deferred Preventative'

					WHEN [data].[order_type] = 'UM02'
					AND CAST([data].[latest_allowable_finish_date] AS DATETIME2) < Getdate()
					THEN 'Backlog Reactive'

					WHEN [data].[order_type] = 'UM01'
					AND CAST([data].[latest_allowable_finish_date] AS DATETIME2) < Getdate()
					THEN 'Backlog Preventative'

					ELSE 'Incorrect Assignment'
			  END AS 'barrier_metrics'
	    ,[data].[functional_location]
		,[data].[work_order_number]
		,[data].[work_order_description]
		,[data].[order_type]
		,[data].[user_status]
 		,CASE WHEN (PATINDEX('%AWDF%',user_status) > 0) THEN 'Y' ELSE 'N' END AS 'awaiting_deferrment'
 		,CASE WHEN (PATINDEX('%DFRD%',user_status) > 0) THEN 'Y' ELSE 'N' END AS 'deferred'
		,[data].[work_centre]
		,CASE WHEN LTRIM(RTRIM([data].[latest_allowable_finish_date])) = '' THEN NULL ELSE CAST([data].[latest_allowable_finish_date] AS DATETIME2) END [latest_allowable_finish_date]
		,[data].[maint_activ_type]
		,[data].[system_status]
  FROM [barrier_staging].[dbo].[sap_work_order_data_nm01] [data]
  LEFT JOIN [barrier].[dbo].[asset] [asset]
  ON [asset].[code] = 'NM01'
  LEFT JOIN [barrier].[dbo].[facility] [facility]
  ON [data].[facility_code] = [facility].[code] AND [facility].[asset_id] = [asset].[id]
  LEFT JOIN [barrier].[dbo].[performance_standard_mapping] [ps_mapping]
  ON [data].[functional_location] = [ps_mapping].[code] AND [ps_mapping].[asset_id] = [asset].[id]
  LEFT JOIN [barrier].[dbo].[performance_standard] [ps]
  ON [ps_mapping].[ps_id] = [ps].[id] AND [ps_mapping].[asset_id] = [ps].[asset_id]
  LEFT JOIN [barrier].[dbo].[planner_group] [pg]
  ON [data].[planner_group] = [pg].[code] AND [pg].[asset_id] = [asset].[id]
  LEFT JOIN [barrier].[dbo].[abc_indicator] [abc]
  ON [data].[abc_field] = [abc].[code] AND [abc].[asset_id] = [asset].[id]
  WHERE [data].[user_status] NOT LIKE '%WCOM%' AND [data].[system_status] NOT LIKE '%TECO%' AND [data]. [order_type] IN ('UM01', 'UM02')
  AND [data].[maint_activ_type] IN ('SFC', 'SFF', 'EXM')
  GO

CREATE VIEW [dbo].[vw_sap_work_order_data_stage_2] AS
SELECT [stage_1].[asset_id]
    ,[stage_1].[facility_id]
    ,[stage_1].[performance_standard_id]
    ,[stage_1].[planner_group_id]
    ,[stage_1].[abc_indicator_id]
    ,COALESCE([ps].[barrier_type_id], -1) [barrier_type_id]
    ,COALESCE([metric].[id], -1) [barrier_metric_id]
    ,[stage_1].[functional_location]
    ,[stage_1].[work_order_number]
    ,[stage_1].[work_order_description]
    ,[stage_1].[order_type]
    ,[stage_1].[user_status]
    ,[stage_1].[awaiting_deferrment]
    ,[stage_1].[deferred]
    ,[stage_1].[work_centre]
    ,[stage_1].[latest_allowable_finish_date]
    ,[stage_1].[maint_activ_type]
    ,[stage_1].[system_status]
FROM [barrier_staging].[dbo].[vw_sap_work_order_data_stage_1] [stage_1]
LEFT JOIN [barrier].[dbo].[barrier_metric] [metric]
ON [stage_1].[barrier_metrics] = [metric].[name]
LEFT JOIN [barrier].[dbo].[performance_standard] [ps]
ON [stage_1].[performance_standard_id] = [ps].[id]
GO

CREATE VIEW [dbo].[vw_facility_level_data_stage_1] AS
SELECT [facility_id]
      ,[barrier_type_id]
      ,[barrier_metric_id]
      ,COUNT(*) [count_of_data]
  FROM [barrier_staging].[dbo].[vw_sap_work_order_data_stage_2]
  GROUP BY [facility_id]
      ,[barrier_type_id]
      ,[barrier_metric_id]
GO

CREATE VIEW [dbo].[vw_facility_level_data_stage_2] AS
SELECT
          [a].[facility_id]
		, [a].[barrier_type_id]
		, [a].[barrier_metric_id]
		, [a].[count_of_data]
		, CASE
			WHEN [d].[amber_start] IS NULL OR [d].[amber_end] IS NULL THEN NULL
			WHEN [a].[count_of_data] < [d].[amber_start] THEN 'G'
			WHEN [a].[count_of_data] > [d].[amber_end] THEN 'R'
			ELSE 'A'
		  END [rag_status]
FROM [barrier_staging].[dbo].[vw_facility_level_data_stage_1] [a]
LEFT JOIN [barrier].[dbo].[barrier_type] [c]
on [a].[barrier_type_id] = [c].[id]
LEFT JOIN  [barrier].[dbo].[facility_rule_set] [d]
ON [c].[barrier_id] = [d].[barrier_id] AND [a].[barrier_metric_id] = [d].[barrier_metric_id]
AND [d].[current_flag] = 1
GO

CREATE VIEW [dbo].[vw_asset_level_data_stage_1] AS
SELECT  [snapshot_date]
	  ,	[facility_id]
	  , [barrier_type_id]
	  , SUM([count_of_data]) [count_of_data]
	  , (SELECT COUNT([rag_status])
	  			FROM [barrier].[dbo].[facility_level_data] [red]
				  WHERE [red].[facility_id] = [main].[facility_id] AND [rag_status]='R'
				  AND [red].[barrier_type_id] = [main].[barrier_type_id]) [red_count]
	  , (SELECT COUNT([rag_status])
	  			FROM [barrier].[dbo].[facility_level_data] [amber]
				  WHERE [amber].[facility_id] = [main].[facility_id] AND [rag_status]='A'
				  AND [amber].[barrier_type_id] = [main].[barrier_type_id]) [amber_count]
 	  , (SELECT COUNT([rag_status])
	  			FROM [barrier].[dbo].[facility_level_data] [green]
				  WHERE [green].[facility_id] = [main].[facility_id] AND [rag_status]='G'
				  AND [green].[barrier_type_id] = [main].[barrier_type_id]) [green_count]
FROM [barrier].[dbo].[facility_level_data] [main]
WHERE [barrier_type_id] > 0 AND [barrier_metric_id] > 0
GROUP BY [snapshot_date]
	    ,[facility_id]
	  	,[barrier_type_id]
GO

CREATE VIEW [dbo].[vw_asset_level_data_stage_2] AS
SELECT	   snapshot_date
         , facility_id
		 , barrier_type_id
		 , count_of_data
		 , CASE
		 		WHEN red_count > rs.amber_end THEN 'R'
		 		WHEN amber_count >= rs.amber_start AND amber_count <> 0 THEN 'A'
		 		ELSE 'G'
		 	END rag_status
		 , red_count
		 , amber_count
		 , green_count
FROM [barrier_staging].[dbo].[vw_asset_level_data_stage_1] [data]
INNER JOIN [barrier].[dbo].[barrier_type] [bt]
ON [data].[barrier_type_id] = [bt].[id]
INNER JOIN [barrier].[dbo].[asset_rule_set] [rs]
ON [bt].[barrier_id] = [rs].[barrier_id]
AND [rs].[current_flag] = 1;
GO

CREATE VIEW [dbo].[ora_facility_level_data_stage_1] AS
SELECT COALESCE([facility].[barrier_facility_id], -1) [facility_id]
	  , COALESCE([barrier_type].[id],-1) [barrier_type_id]
	  , COALESCE([metric].[id],-1) [barrier_metric_id]
FROM [barrier_staging].[dbo].[ora_data] [data]
LEFT JOIN [barrier_staging].[dbo].[ora_facility_mapping] [facility]
ON [data].[facility] = [facility].[ora_facility_name]
LEFT JOIN [barrier].[dbo].[facility] [barrier_facility]
ON [facility].[barrier_facility_id] = [barrier_facility].[id]
LEFT JOIN [barrier].[dbo].[barrier_type] [barrier_type]
ON [barrier_type].[asset_id] = [barrier_facility].[asset_id] AND [barrier_type].[name] = 'Unassigned'
LEFT JOIN [barrier].[dbo].[barrier_metric] [metric]
ON [metric].[name] = 'ORAs in Place'
LEFT JOIN [barrier].[dbo].[barrier_element] [element]
ON [metric].[barrier_element_id] = [element].[id] AND [element].[name] = 'ORA'
GO

CREATE VIEW [dbo].[ora_facility_level_data_stage_2] AS
SELECT [facility_id]
    ,[barrier_type_id]
    ,[barrier_metric_id]
	,COUNT(*) [count_of_data]
FROM [barrier_staging].[dbo].[ora_facility_level_data_stage_1]
GROUP BY [facility_id]
    ,[barrier_type_id]
    ,[barrier_metric_id]
GO

CREATE VIEW [dbo].[ora_work_order_level_data_stage_1] AS
SELECT [id]
	  ,[facility].[barrier_facility_id] [facility_id]
      ,[type]
      ,[status]
      ,[title]
      ,[ra_number]
      ,[description]
      ,[valid_until]
      ,[extended_date]
      ,[date_raised]
      ,[date_modified]
      ,[raised_by]
      ,[location]
      ,[hrr]
      ,[work_order]
      ,[close_out_detail]
FROM [barrier_staging].[dbo].[ora_data] [data]
LEFT JOIN [barrier_staging].[dbo].[ora_facility_mapping] [facility]
ON [data].[facility] = [facility].[ora_facility_name]
GO

CREATE VIEW [dbo].[ora_work_order_level_data_stage_2] AS
SELECT [data].[id] [work_order_number]
      ,[data].[facility_id]
      ,[data].[type] [functional_location]
	  ,[metric].[barrier_element_id] [barrier_element_id]
	  ,[barrier_type].[id] [barrier_type_id]
	  ,[metric].[id] [barrier_metric_id]
	  ,'' [rag_status]
	  ,-1 [planner_group_id]
	  ,-1 [abc_indicator_id]
	  ,[data].[description] [work_order_description]
	  ,[data].[title] [order_type]
      ,[data].[status] [user_status]
	  ,'' [awaiting_deferment]
	  ,'' [deferred]
      ,[data].[ra_number] [work_centre]
      ,CAST([data].[valid_until] AS datetime2) [latest_allowable_finish_date]
      ,CONVERT(VARCHAR, [data].[date_raised], 112) [maint_activ_type]
FROM [barrier_staging].[dbo].[ora_work_order_level_data_stage_1] [data]
LEFT JOIN [barrier].[dbo].[barrier_metric] [metric]
ON [metric].[name] = 'ORAs in Place'
LEFT JOIN [barrier].[dbo].[barrier_element] [element]
ON [metric].[barrier_element_id] = [element].[id] AND [element].[name] = 'ORA'
LEFT JOIN [barrier].[dbo].[facility] [barrier_facility]
ON [data].[facility_id] = [barrier_facility].[id]
LEFT JOIN [barrier].[dbo].[barrier_type] [barrier_type]
ON [barrier_type].[asset_id] = [barrier_facility].[asset_id] AND [barrier_type].[name] = 'Unassigned'
GO