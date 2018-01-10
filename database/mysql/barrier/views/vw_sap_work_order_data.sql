-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

CREATE OR REPLACE VIEW `vw_sap_work_order_data` AS SELECT  
      `sap`.`barrier_element`
      ,`sap`.`functional_location`
		, COALESCE(`asset`.`id`,-1) `asset_id`
		, COALESCE(`facility`.`id`,-1) `facility_id`
		, COALESCE(`ps`.`id`,-1) `performance_standard_id`
		, COALESCE(`pg`.`id`,-1) `planner_group_id`
		, COALESCE(`abc`.`id`, -1) `abc_indicator_id`
		, CASE
					WHEN `sap`.`order_type` = 'UM02'
					AND `sap`.`deferred` = 'Y'
					AND `sap`.`latest_allowable_finish_date` >= sysdate()
					THEN 'Deferred Reactive'

					WHEN `sap`.`order_type` = 'UM01'
					AND `sap`.`deferred` = 'Y'
					AND `sap`.`latest_allowable_finish_date` >= sysdate()
					THEN 'Deferred Preventative'

					WHEN `sap`.`order_type` = 'UM02'
					AND `sap`.`latest_allowable_finish_date` < sysdate()
					THEN 'Backlog Reactive'

					WHEN `sap`.`order_type` = 'UM01'
					AND `sap`.`latest_allowable_finish_date` < sysdate()
					THEN 'Backlog Preventative'

					ELSE 'Incorrect Assignment'
			  END AS 'barrier_metrics'
		,`sap`.`work_order_number`
		,`sap`.`work_order_description`
		,`sap`.`order_type`
		,`sap`.`user_status`
		,`sap`.`awaiting_deferrment`
		,`sap`.`deferred`
		,`sap`.`work_centre`
		,`sap`.`latest_allowable_finish_date`
		,`sap`.`maint_activ_type`
		, sysdate() as `created_at`
		, sysdate() as `updated_at`
 FROM `barrier_ods`.`vw_merged_sap_data` `sap`
LEFT JOIN `barrier`.`asset` `asset`
ON `sap`.`maintenance_plant_code` = `asset`.`code` and asset.current_flag = 1
LEFT JOIN `barrier`.`facility` `facility`
ON `sap`.`functional_location_code` = `facility`.`code` AND `facility`.`asset_id` = `asset`.`id`  and facility.current_flag = 1
LEFT JOIN `barrier`.`performance_standard_mapping` `ps_mapping`
ON `sap`.`functional_location` = `ps_mapping`.`code` 
AND `ps_mapping`.`asset_id` = `asset`.`id` and ps_mapping.current_flag = 1
LEFT JOIN `barrier`.`performance_standard` `ps`
ON `ps_mapping`.`ps_id` = `ps`.`id` AND `ps_mapping`.`asset_id` = `ps`.`asset_id` and ps.current_flag = 1
LEFT JOIN `barrier`.`planner_group` `pg`
ON `sap`.`planner_group` = `pg`.`code` AND `pg`.`asset_id` = `asset`.`id` and pg.current_flag = 1
LEFT JOIN `barrier`.`abc_indicator` `abc`
ON `sap`.`abc_field` = `abc`.`code` AND `abc`.`asset_id` = `asset`.`id` and abc.current_flag = 1 ;


