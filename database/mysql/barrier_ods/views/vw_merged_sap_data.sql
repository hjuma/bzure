-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

 
CREATE OR REPLACE  VIEW `vw_merged_sap_data` AS SELECT
 			  'SCM' AS 'barrier_element'
 			, `asset_code` AS 'maintenance_plant_code'
 			, `facility_code` AS 'functional_location_code'
 			, `functional_loc` AS 'functional_location'
 			, `order` AS 'work_order_number'
 			, `description` AS 'work_order_description'
 			, `order_type` AS 'order_type'
 			, `planner_group` AS 'planner_group'
 			, `user_status` AS 'user_status'
 			, CASE WHEN (POSITION('AWDF' IN user_status) > 0) THEN 'Y' ELSE 'N' END AS 'awaiting_deferrment'
 			, CASE WHEN (POSITION('DFRD' IN user_status) > 0) THEN 'Y' ELSE 'N' END AS 'deferred'
 			, `abc_indic` AS 'abc_field'
 			, latest_allow_fin_dat AS 'latest_allowable_finish_date'
 			, `main_work_ctr` AS 'work_centre'
 			, `maint_activ_type`
FROM `barrier_ods`.`merged_work_order_eis`
WHERE `user_status` NOT LIKE '%WCOM%'
AND `system_status` <> '%TECO%'
AND `order_type` IN ('UM01', 'UM02')
AND `maint_activ_type` IN ('SFC', 'SFF', 'EXM')
UNION ALL
 SELECT
 			  'SCM' AS 'barrier_element'
 			, `asset_code` AS 'maintenance_plant_code'
 			, `facility_code` AS 'functional_location_code'
 			, `functional_loc` AS 'functional_location'
 			, `order` AS 'work_order_number'
 			, `description` AS 'work_order_description'
 			, `order_type` AS 'order_type'
 			, `planner_group` AS 'planner_group'
 			, `user_status` AS 'user_status'
 			, CASE WHEN (POSITION('AWDF' IN user_status) > 0) THEN 'Y' ELSE 'N' END AS 'awaiting_deferrment'
 			, CASE WHEN (POSITION('DFRD' IN user_status) > 0) THEN 'Y' ELSE 'N' END AS 'deferred'
 			, `abc_indic` AS 'abc_field'
 			, latest_allow_fin_dat AS 'latest_allowable_finish_date'
 			, `work_center` AS 'work_centre'
 			, `maint_activ_type`
FROM `barrier_ods`.`merged_work_order_nm01`
WHERE `user_status` NOT LIKE '%WCOM%'
AND `system_status` <> '%TECO%'
AND `order_type` IN ('UM01', 'UM02')
AND `maint_activ_type` IN ('SFC', 'SFF', 'EXM') ;
 