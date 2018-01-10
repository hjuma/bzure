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

-- Dumping structure for procedure barrier_ods.sp_merge_ps_mapping_nm01
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_merge_ps_mapping_nm01`(

)
BEGIN

	/* First update any rows that need to have history tracked for relevant columns */
	SET @v_start_dt = SYSDATE();
	SET @v_end_dt = SYSDATE();

	/* Create a temporary table to hold details of rows and the actions needed to deal with them */
	DROP TEMPORARY TABLE IF EXISTS `barrier_ods`.`ps_mapping_nm01_tmp`;

	CREATE TEMPORARY TABLE `barrier_ods`.`ps_mapping_nm01_tmp` AS
	SELECT `new`.*
	FROM `barrier_landing`.`ps_mapping_nm01` `new`
	WHERE 1=0;

	ALTER TABLE  `barrier_ods`.`ps_mapping_nm01_tmp`
	ADD COLUMN `action` VARCHAR(1) NOT NULL;


	INSERT INTO `barrier_ods`.`ps_mapping_nm01_tmp`
		(
				  `floc`
				, `floc_type`
				, `description`
				, `support_floc`
				, `support_floc_description`
				, `abc_indicator`
				, `criticality_justification`
				, `ps_ref1`
				, `ps_ref2`
				, `new_ps_ref_1`
				, `new_ps_ref_2`
				, `nl_sce`
			 	, `action`
			)
SELECT
				  `new`.`floc`
				, `new`.`floc_type`
				, `new`.`description`
				, `new`.`support_floc`
				, `new`.`support_floc_description`
				, `new`.`abc_indicator`
				, `new`.`criticality_justification`
				, `new`.`ps_ref1`
				, `new`.`ps_ref2`
				, `new`.`new_ps_ref_1`
				, `new`.`new_ps_ref_2`
				, `new`.`nl_sce`
				, 'C' AS 'action'
	FROM `barrier_landing`.`ps_mapping_nm01` AS `new`
	INNER JOIN  `barrier_ods`.`ps_mapping_nm01` AS `existing`
	ON `new`.`floc` = `existing`.`floc` AND `existing`.`current_flag` = 1
	WHERE `existing`.`floc` <> `new`.`floc`; -- Hack to make sure no rows get inserted for time being


	INSERT INTO `barrier_ods`.`ps_mapping_nm01_tmp`
		(
				  `floc`
				, `floc_type`
				, `description`
				, `support_floc`
				, `support_floc_description`
				, `abc_indicator`
				, `criticality_justification`
				, `ps_ref1`
				, `ps_ref2`
				, `new_ps_ref_1`
				, `new_ps_ref_2`
				, `nl_sce`
			 	, `action`
			)
SELECT 		  `new`.`floc`
				, `new`.`floc_type`
				, `new`.`description`
				, `new`.`support_floc`
				, `new`.`support_floc_description`
				, `new`.`abc_indicator`
				, `new`.`criticality_justification`
				, `new`.`ps_ref1`
				, `new`.`ps_ref2`
				, `new`.`new_ps_ref_1`
				, `new`.`new_ps_ref_2`
				, `new`.`nl_sce`
				, 'U' AS 'action'
	FROM `barrier_landing`.`ps_mapping_nm01` AS `new`
	INNER JOIN  `barrier_ods`.`ps_mapping_nm01` AS `existing`
	ON `new`.`floc` = `existing`.`floc` AND `existing`.`current_flag` = 1
	WHERE `new`.`floc` NOT IN (SELECT `floc` FROM `barrier_ods`.`ps_mapping_nm01_tmp`);

	INSERT INTO `barrier_ods`.`ps_mapping_nm01_tmp`
		(
				  `floc`
				, `floc_type`
				, `description`
				, `support_floc`
				, `support_floc_description`
				, `abc_indicator`
				, `criticality_justification`
				, `ps_ref1`
				, `ps_ref2`
				, `new_ps_ref_1`
				, `new_ps_ref_2`
				, `nl_sce`
			  	, `action`
			)
SELECT   	  `new`.`floc`
				, `new`.`floc_type`
				, `new`.`description`
				, `new`.`support_floc`
				, `new`.`support_floc_description`
				, `new`.`abc_indicator`
				, `new`.`criticality_justification`
				, `new`.`ps_ref1`
				, `new`.`ps_ref2`
				, `new`.`new_ps_ref_1`
				, `new`.`new_ps_ref_2`
				, `new`.`nl_sce`
				, 'I' AS 'action'
	FROM `barrier_landing`.`ps_mapping_nm01` AS `new`
	LEFT JOIN  `barrier_ods`.`ps_mapping_nm01` AS `existing`
	ON `new`.`floc` = `existing`.`floc` AND `existing`.`current_flag` = 1
	WHERE `existing`.`floc` IS NULL;


	/* Deal with changed rows that need to have history tracked */
	UPDATE `barrier_ods`.`ps_mapping_nm01` AS `existing`
	INNER JOIN `barrier_ods`.`ps_mapping_nm01_tmp` AS `new`
	ON `new`.`floc` = `existing`.`floc`
	SET `existing`.`end_dt` = @v_end_dt,
	    `existing`.`current_flag` = 0
	WHERE `new`.`action` = 'C'
	AND `existing`.`current_flag` = 1;

	INSERT INTO `barrier_ods`.`ps_mapping_nm01`
		(
				  `floc`
				, `floc_type`
				, `description`
				, `support_floc`
				, `support_floc_description`
				, `abc_indicator`
				, `criticality_justification`
				, `ps_ref1`
				, `ps_ref2`
				, `new_ps_ref_1`
				, `new_ps_ref_2`
				, `nl_sce`
				, `current_flag`
				, `start_dt`
				, `end_dt`
				, `source_extracted_dt`
			)
SELECT    	  `new`.`floc`
				, `new`.`floc_type`
				, `new`.`description`
				, `new`.`support_floc`
				, `new`.`support_floc_description`
				, `new`.`abc_indicator`
				, `new`.`criticality_justification`
				, `new`.`ps_ref1`
				, `new`.`ps_ref2`
				, `new`.`new_ps_ref_1`
				, `new`.`new_ps_ref_2`
				, `new`.`nl_sce`
				, 1 AS `current_flag`
				, @v_start_dt AS `start_dt`
				, NULL AS `end_dt`
				, @v_start_dt AS `source_extracted_dt`
	FROM `barrier_ods`.`ps_mapping_nm01_tmp` AS `new`
	WHERE `new`.`action` = 'C';

	/* Deal with updating existing rows where values have changed but for which we do not need to track history */
	UPDATE `barrier_ods`.`ps_mapping_nm01` AS `existing`
	INNER JOIN `barrier_ods`.`ps_mapping_nm01_tmp` AS `new`
	ON `new`.`floc` = `existing`.`floc` AND `new`.`action` = 'U'
	SET `existing`.`floc_type` = `new`.`floc_type`
	WHERE `existing`.`current_flag` = 1;


	/* Finally insert new rows */
	INSERT INTO `barrier_ods`.`ps_mapping_nm01`
		(
				  `floc`
				, `floc_type`
				, `description`
				, `support_floc`
				, `support_floc_description`
				, `abc_indicator`
				, `criticality_justification`
				, `ps_ref1`
				, `ps_ref2`
				, `new_ps_ref_1`
				, `new_ps_ref_2`
				, `nl_sce`
				, `current_flag`
				, `start_dt`
				, `end_dt`
				, `source_extracted_dt`
			)
SELECT    	  `new`.`floc`
				, `new`.`floc_type`
				, `new`.`description`
				, `new`.`support_floc`
				, `new`.`support_floc_description`
				, `new`.`abc_indicator`
				, `new`.`criticality_justification`
				, `new`.`ps_ref1`
				, `new`.`ps_ref2`
				, `new`.`new_ps_ref_1`
				, `new`.`new_ps_ref_2`
				, `new`.`nl_sce`
				, 1 AS `current_flag`
				, @v_start_dt AS `start_dt`
				, NULL AS `end_dt`
				, @v_start_dt AS `source_extracted_dt`
	FROM `barrier_ods`.`ps_mapping_nm01_tmp` AS `new`
	WHERE `new`.`action` = 'I';

	/* Remove temporary table */
	DROP TEMPORARY TABLE IF EXISTS `barrier_ods`.`ps_mapping_nm01_tmp`;

END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
