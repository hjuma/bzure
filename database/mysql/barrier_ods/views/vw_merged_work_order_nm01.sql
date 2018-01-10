-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

 
CREATE  OR REPLACE VIEW `vw_merged_work_order_nm01` AS SELECT        'NM01' AS 'asset_code'
            ,`facility_code` 
				,`order` 
				,`functional_loc` 
				,`description`  
				,`order_type` 
				,`planner_group`  
  				,`user_status` 
  				,`abc_indic` 
				,`work_center`  
  				,`maint_activ_type` 
				,`latest_allow_fin_dat`  
				,`system_status`  
FROM `barrier_ods`.`work_order_nm01_chis`
WHERE `current_flag` = 1
UNION ALL
SELECT        'NM01' AS 'asset_code'
            ,`facility_code` 
				,`order` 
				,`functional_loc` 
				,`description`  
				,`order_type` 
				,`planner_group`  
  				,`user_status` 
  				,`abc_indic` 
				,`work_center`  
  				,`maint_activ_type` 
				,`latest_allow_fin_dat`  
				,`system_status`  
FROM `barrier_ods`.`work_order_nm01_f3fa`
WHERE `current_flag` = 1
UNION ALL
SELECT        'NM01' AS 'asset_code'
            ,`facility_code` 
				,`order` 
				,`functional_loc` 
				,`description`  
				,`order_type` 
				,`planner_group`  
  				,`user_status` 
  				,`abc_indic` 
				,`work_center`  
  				,`maint_activ_type` 
				,`latest_allow_fin_dat`  
				,`system_status`  
FROM `barrier_ods`.`work_order_nm01_grov`
WHERE `current_flag` = 1
UNION ALL
SELECT        'NM01' AS 'asset_code'
            ,`facility_code` 
				,`order` 
				,`functional_loc` 
				,`description`  
				,`order_type` 
				,`planner_group`  
  				,`user_status` 
  				,`abc_indic` 
				,`work_center`  
  				,`maint_activ_type` 
				,`latest_allow_fin_dat`  
				,`system_status`  
FROM `barrier_ods`.`work_order_nm01_grow`
WHERE `current_flag` = 1
UNION ALL
SELECT        'NM01' AS 'asset_code'
            ,`facility_code` 
				,`order` 
				,`functional_loc` 
				,`description`  
				,`order_type` 
				,`planner_group`  
  				,`user_status` 
  				,`abc_indic` 
				,`work_center`  
  				,`maint_activ_type` 
				,`latest_allow_fin_dat`  
				,`system_status`  
FROM `barrier_ods`.`work_order_nm01_mj6a`
WHERE `current_flag` = 1
UNION ALL
SELECT        'NM01' AS 'asset_code'
            ,`facility_code` 
				,`order` 
				,`functional_loc` 
				,`description`  
				,`order_type` 
				,`planner_group`  
  				,`user_status` 
  				,`abc_indic` 
				,`work_center`  
  				,`maint_activ_type` 
				,`latest_allow_fin_dat`  
				,`system_status`  
FROM `barrier_ods`.`work_order_nm01_mkew`
WHERE `current_flag` = 1
UNION ALL
SELECT        'NM01' AS 'asset_code'
            ,`facility_code` 
				,`order` 
				,`functional_loc` 
				,`description`  
				,`order_type` 
				,`planner_group`  
  				,`user_status` 
  				,`abc_indic` 
				,`work_center`  
  				,`maint_activ_type` 
				,`latest_allow_fin_dat`  
				,`system_status`  
FROM `barrier_ods`.`work_order_nm01_mst1`
WHERE `current_flag` = 1
UNION ALL
SELECT        'NM01' AS 'asset_code'
            ,`facility_code` 
				,`order` 
				,`functional_loc` 
				,`description`  
				,`order_type` 
				,`planner_group`  
  				,`user_status` 
  				,`abc_indic` 
				,`work_center`  
  				,`maint_activ_type` 
				,`latest_allow_fin_dat`  
				,`system_status`  
FROM `barrier_ods`.`work_order_nm01_stam`
WHERE `current_flag` = 1
UNION ALL
SELECT        'NM01' AS 'asset_code'
            ,`facility_code` 
				,`order` 
				,`functional_loc` 
				,`description`  
				,`order_type` 
				,`planner_group`  
  				,`user_status` 
  				,`abc_indic` 
				,`work_center`  
  				,`maint_activ_type` 
				,`latest_allow_fin_dat`  
				,`system_status`  
FROM `barrier_ods`.`work_order_nm01_wind`
WHERE `current_flag` = 1 ;

 
