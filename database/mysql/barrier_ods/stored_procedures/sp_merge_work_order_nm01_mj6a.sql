-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for barrier_ods
CREATE DATABASE IF NOT EXISTS `barrier_ods` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `barrier_ods`;

-- Dumping structure for procedure barrier_ods.sp_merge_work_order_nm01_mj6a
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_merge_work_order_nm01_mj6a`()
BEGIN

	
	/* First update any rows that need to have history tracked for relevant columns */
	SET @v_start_dt = SYSDATE();
	SET @v_end_dt = SYSDATE();

	/* Create a temporary table to hold details of rows and the actions needed to deal with them */
	DROP TEMPORARY TABLE IF EXISTS `barrier_ods`.`work_order_nm01_mj6a_tmp`;

	CREATE TEMPORARY TABLE `barrier_ods`.`work_order_nm01_mj6a_tmp` AS
	SELECT `new`.*
	FROM `barrier_landing`.`work_order_nm01_mj6a` `new`
	WHERE 1=0;

	ALTER TABLE  `barrier_ods`.`work_order_nm01_mj6a_tmp`
	ADD COLUMN `action` VARCHAR(1) NOT NULL;


/* C */

	INSERT INTO `barrier_ods`.`work_order_nm01_mj6a_tmp`
		(
          `facility_code` 
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
			,`action`
			)
    SELECT   
	 		`new`.`facility_code` 
			,`new`.`order` 
			,`new`.`functional_loc` 
			,`new`.`description`  
			,`new`.`order_type` 
			,`new`.`planner_group`  
   		,`new`.`user_status` 
   		,`new`.`abc_indic` 
			,`new`.`work_center`  
   		,`new`.`maint_activ_type` 
			,`new`.`latest_allow_fin_dat`  
			,`new`.`system_status`   
			, 'C' AS 'action'
	FROM `barrier_landing`.`work_order_nm01_mj6a` AS `new`
	INNER JOIN  `barrier_ods`.`work_order_nm01_mj6a` AS `existing`
	ON `new`.`Order` = `existing`.`order` AND `existing`.`current_flag` = 1
	WHERE `existing`.`latest_allow_fin_dat` <> `new`.`latest_allow_fin_dat` OR 
	 `existing`.`latest_allow_fin_dat` IS NULL;
	 


/*  U */

 	INSERT INTO `barrier_ods`.`work_order_nm01_mj6a_tmp`
		(
          `facility_code` 
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
			,`action`
			)
    SELECT   
	 		`new`.`facility_code` 
			,`new`.`order` 
			,`new`.`functional_loc` 
			,`new`.`description`  
			,`new`.`order_type` 
			,`new`.`planner_group`  
   		,`new`.`user_status` 
   		,`new`.`abc_indic` 
			,`new`.`work_center`  
   		,`new`.`maint_activ_type` 
			,`new`.`latest_allow_fin_dat`  
			,`new`.`system_status`   
			, 'U' AS 'action'
	FROM `barrier_landing`.`work_order_nm01_mj6a` AS `new`
	INNER JOIN  `barrier_ods`.`work_order_nm01_mj6a` AS `existing`
	ON `new`.`Order` = `existing`.`order` AND `existing`.`current_flag` = 1
	WHERE `new`.`Order` NOT IN (SELECT `Order` FROM `barrier_ods`.`work_order_nm01_mj6a_tmp`);

	INSERT INTO `barrier_ods`.`work_order_nm01_mj6a_tmp`
		(
         `facility_code` 
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
			,`action`
			)
    SELECT   
	 		 `new`.`facility_code` 
			,`new`.`order` 
			,`new`.`functional_loc` 
			,`new`.`description`  
			,`new`.`order_type` 
			,`new`.`planner_group`  
   		,`new`.`user_status` 
   		,`new`.`abc_indic` 
			,`new`.`work_center`  
   		,`new`.`maint_activ_type` 
			,`new`.`latest_allow_fin_dat`  
			,`new`.`system_status`   
			, 'I' AS 'action'
	FROM `barrier_landing`.`work_order_nm01_mj6a` AS `new`
	LEFT JOIN  `barrier_ods`.`work_order_nm01_mj6a` AS `existing`
	ON `new`.`Order` = `existing`.`order` AND `existing`.`current_flag` = 1
	WHERE `existing`.`Order` IS NULL;


	/* Deal with changed rows that need to have history tracked */
	UPDATE `barrier_ods`.`work_order_nm01_mj6a` AS `existing`
	INNER JOIN `barrier_ods`.`work_order_nm01_mj6a_tmp` AS `new`
	ON `new`.`Order` = `existing`.`Order`
	SET `existing`.`end_dt` = @v_end_dt,
	    `existing`.`current_flag` = 0
	WHERE `new`.`action` = 'C'
	AND `existing`.`current_flag` = 1;

	INSERT INTO `barrier_ods`.`work_order_nm01_mj6a`
		(
          `facility_code` 
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
         , `start_dt`
			, `end_dt`
			, `current_flag`
			, `source_extracted_dt`
			)
SELECT     	 
  	       `new`.`facility_code` 
		   ,`new`.`order` 
		   ,`new`.`functional_loc` 
		   ,`new`.`description`  
	      ,`new`.`order_type` 
		   ,`new`.`planner_group`  
 		   ,`new`.`user_status` 
  		   ,`new`.`abc_indic` 
		   ,`new`.`work_center`  
  		   ,`new`.`maint_activ_type` 
			,`new`.`latest_allow_fin_dat`  
			,`new`.`system_status`
			, @v_start_dt AS `start_dt`
			, NULL AS `end_dt`
			, 1 AS `current_flag`
			, @v_start_dt AS `source_extracted_dt`
	FROM `barrier_ods`.`work_order_nm01_mj6a_tmp` AS `new`
	WHERE `new`.`action` = 'C';

	/* Deal with updating existing rows where values have changed but for which we do not need to track history */
	UPDATE `barrier_ods`.`work_order_nm01_mj6a` AS `existing`
	INNER JOIN `barrier_ods`.`work_order_nm01_mj6a_tmp` AS `new`
	ON `new`.`Order` = `existing`.`order` AND `new`.`action` = 'U'
	SET `existing`.`latest_allow_fin_dat` = `new`.`latest_allow_fin_dat`
	WHERE `existing`.`current_flag` = 1;


	/* Finally insert new rows */
	INSERT INTO `barrier_ods`.`work_order_nm01_mj6a`
		(
          `facility_code` 
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
         , `start_dt`
			, `end_dt`
			, `current_flag`
			, `source_extracted_dt`
			)
SELECT    `new`.`facility_code` 
		   ,`new`.`order` 
		   ,`new`.`functional_loc` 
		   ,`new`.`description`  
	      ,`new`.`order_type` 
		   ,`new`.`planner_group`  
 		   ,`new`.`user_status` 
  		   ,`new`.`abc_indic` 
		   ,`new`.`work_center`  
  		   ,`new`.`maint_activ_type` 
			,`new`.`latest_allow_fin_dat`  
			,`new`.`system_status`
			, @v_start_dt AS `start_dt`
			, NULL AS `end_dt`
			, 1 AS `current_flag`
			, @v_start_dt AS `source_extracted_dt`
	FROM `barrier_ods`.`work_order_nm01_mj6a_tmp` AS `new`
	WHERE `new`.`action` = 'I';

	/* Remove temporary table */
	DROP TEMPORARY TABLE IF EXISTS `barrier_ods`.`work_order_nm01_mj6a_tmp`;

END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
