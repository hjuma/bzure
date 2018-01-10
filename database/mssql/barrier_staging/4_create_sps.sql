USE [barrier_staging]
GO

CREATE PROCEDURE [dbo].[sp_populate_facility_level_data]
	@snapshot_date DATETIME2
AS
BEGIN

	IF (EXISTS(SELECT TOP 1 1 FROM [barrier].[dbo].[facility_level_data]
			WHERE CONVERT(VARCHAR, snapshot_date,112) = CONVERT(VARCHAR,@snapshot_date, 112)))
	BEGIN
		DELETE FROM [barrier].[dbo].[facility_level_data]
		WHERE CONVERT(VARCHAR, snapshot_date,112) = CONVERT(VARCHAR,@snapshot_date, 112)
	END

	INSERT INTO [barrier].[dbo].[facility_level_data]
           (
			[snapshot_date]
           ,[facility_id]
           ,[barrier_type_id]
           ,[barrier_metric_id]
           ,[count_of_data]
           ,[rag_status]
           ,[created_at]
           ,[updated_at]
		   )
	SELECT @snapshot_date
		  ,[facility_id]
		  ,[barrier_type_id]
		  ,[barrier_metric_id]
          ,[count_of_data]
          ,[rag_status]
		  ,@snapshot_date
		  ,@snapshot_date
	FROM [barrier_staging].[dbo].[vw_facility_level_data_stage_2]
	UNION ALL
	SELECT @snapshot_date
		  ,[facility_id]
		  ,[barrier_type_id]
		  ,[barrier_metric_id]
          ,[count_of_data]
          ,NULL
		  ,@snapshot_date
		  ,@snapshot_date
	FROM [barrier_staging].[dbo].[ora_facility_level_data_stage_2]

END
GO

CREATE PROCEDURE [dbo].[sp_populate_asset_level_data]
	@snapshot_date DATETIME2
AS
BEGIN

	IF (EXISTS(SELECT TOP 1 1 FROM [barrier].[dbo].[asset_level_data]
			WHERE CONVERT(VARCHAR, snapshot_date,112) = CONVERT(VARCHAR,@snapshot_date, 112)))
	BEGIN
		DELETE FROM [barrier].[dbo].[asset_level_data]
		WHERE CONVERT(VARCHAR, snapshot_date,112) = CONVERT(VARCHAR,@snapshot_date, 112)
	END

	INSERT INTO [barrier].[dbo].[asset_level_data]
           ([snapshot_date]
           ,[facility_id]
           ,[barrier_type_id]
           ,[count_of_data]
           ,[rag_status]
           ,[red_count]
           ,[amber_count]
           ,[green_count]
           ,[created_at]
           ,[updated_at])
	SELECT @snapshot_date
		  ,[facility_id]
		  ,[barrier_type_id]
		  ,[count_of_data]
		  ,[rag_status]
		  ,[red_count]
		  ,[amber_count]
		  ,[green_count]
		  ,GETDATE()
		  ,GETDATE()
	  FROM [barrier_staging].[dbo].[vw_asset_level_data_stage_2]
	  WHERE [snapshot_date] = @snapshot_date
END

GO

CREATE PROCEDURE [dbo].[sp_populate_work_order_level_data]
	@snapshot_date DATETIME2
AS
BEGIN

	IF (EXISTS(SELECT TOP 1 1 FROM [barrier].[dbo].[work_order_level_data]
			WHERE CONVERT(VARCHAR, snapshot_date,112) = CONVERT(VARCHAR,@snapshot_date, 112)))
	BEGIN
		DELETE FROM [barrier].[dbo].[work_order_level_data]
		WHERE CONVERT(VARCHAR, snapshot_date,112) = CONVERT(VARCHAR,@snapshot_date, 112)
	END


	INSERT INTO [barrier].[dbo].[work_order_level_data]
			   ([snapshot_date]
			   ,[work_order_number]
			   ,[facility_id]
			   ,[functional_location]
			   ,[barrier_element_id]
			   ,[barrier_type_id]
			   ,[barrier_metric_id]
			   ,[rag_status]
			   ,[planner_group_id]
			   ,[abc_indicator_id]
			   ,[work_order_description]
			   ,[order_type]
			   ,[user_status]
			   ,[awaiting_deferment]
			   ,[deferred]
			   ,[work_centre]
			   ,[latest_allowable_finish_date]
			   ,[maint_activ_type]
			   ,[created_at]
			   ,[updated_at])
	SELECT @snapshot_date
    		  ,[data].[work_order_number]
    		  ,[data].[facility_id]
    		  ,[data].[functional_location]
    		  ,[metric].[barrier_element_id]
    		  ,[fac].[barrier_type_id]
    		  ,[fac].[barrier_metric_id]
    		  ,[fac].[rag_status]
    		  ,[data].[planner_group_id]
              ,[data].[abc_indicator_id]
    		  ,[data].[work_order_description]
    		  ,[data].[order_type]
    		  ,[data].[user_status]
    		  ,[data].[awaiting_deferrment]
    		  ,[data].[deferred]
    		  ,[data].[work_centre]
    		  ,[data].[latest_allowable_finish_date]
    		  ,[data].[maint_activ_type]
    		  ,GETDATE()
    		  ,GETDATE()
    	FROM [barrier_staging].[dbo].[vw_sap_work_order_data_stage_2] [data]
    	LEFT JOIN [barrier].[dbo].[barrier_metric] [metric]
    	ON [data].[barrier_metric_id] = [metric].[id]
    	LEFT JOIN [barrier].[dbo].[performance_standard] [ps]
    	ON [data].[performance_standard_id] = [ps].[id]
    	INNER JOIN [barrier].[dbo].[facility_level_data] [fac]
    	ON [data].[facility_id] = [fac].[facility_id] AND [fac].[snapshot_date] = @snapshot_date
    	AND [metric].[id] = [fac].[barrier_metric_id]
    	AND [ps].[barrier_type_id] = [fac].[barrier_type_id]
    	UNION ALL
    	SELECT @snapshot_date,
    		[work_order_number]
          ,[facility_id]
          ,[functional_location]
          ,[barrier_element_id]
          ,[barrier_type_id]
          ,[barrier_metric_id]
          ,[rag_status]
          ,[planner_group_id]
          ,[abc_indicator_id]
          ,[work_order_description]
          ,[order_type]
          ,[user_status]
          ,[awaiting_deferment]
          ,[deferred]
          ,[work_centre]
          ,[latest_allowable_finish_date]
          ,[maint_activ_type]
    	  ,@snapshot_date
    	  ,@snapshot_date
      FROM [dbo].[ora_work_order_level_data_stage_2]
END
GO