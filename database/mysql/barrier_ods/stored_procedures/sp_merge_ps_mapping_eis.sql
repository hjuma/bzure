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

-- Dumping structure for procedure barrier_ods.sp_merge_ps_mapping_eis
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_merge_ps_mapping_eis`(

)
BEGIN

	/* First update any rows that need to have history tracked for relevant columns */
	SET @v_start_dt = SYSDATE();
	SET @v_end_dt = SYSDATE();

	/* Create a temporary table to hold details of rows and the actions needed to deal with them */
	DROP TEMPORARY TABLE IF EXISTS `barrier_ods`.`ps_mapping_eis_tmp`;

	CREATE TEMPORARY TABLE `barrier_ods`.`ps_mapping_eis_tmp` AS
	SELECT `new`.*
	FROM `barrier_landing`.`ps_mapping_eis` `new`
	WHERE 1=0;

	ALTER TABLE  `barrier_ods`.`ps_mapping_eis_tmp`
	ADD COLUMN `action` VARCHAR(1) NOT NULL;


	INSERT INTO `barrier_ods`.`ps_mapping_eis_tmp`
		(
				 `floc`
                ,`description`
                ,`system_status`
                ,`user_status`
                ,`support_floc`
                ,`ps_ref_1`
                ,`ps_ref_2`
                ,`ps_ref_3`
                ,`ps_mapping_barrier_1`
                ,`ps_mapping_barrier_2`
                ,`ps_mapping_barrier_3`
			 	, `action`
			)
SELECT
                  `new`.`floc`
                , `new`.`description`
                , `new`.`system_status`
                , `new`.`user_status`
                , `new`.`support_floc`
                , `new`.`ps_ref_1`
                , `new`.`ps_ref_2`
                , `new`.`ps_ref_3`
                , `new`.`ps_mapping_barrier_1`
                , `new`.`ps_mapping_barrier_2`
                , `new`.`ps_mapping_barrier_3`
				, 'C' AS 'action'
	FROM `barrier_landing`.`ps_mapping_eis` AS `new`
	INNER JOIN  `barrier_ods`.`ps_mapping_eis` AS `existing`
	ON `new`.`floc` = `existing`.`floc` AND `existing`.`current_flag` = 1
	WHERE `existing`.`floc` <> `new`.`floc`; -- Hack to make sure no rows get inserted for time being


	INSERT INTO `barrier_ods`.`ps_mapping_eis_tmp`
		(
			     `floc`
                ,`description`
                ,`system_status`
                ,`user_status`
                ,`support_floc`
                ,`ps_ref_1`
                ,`ps_ref_2`
                ,`ps_ref_3`
                ,`ps_mapping_barrier_1`
                ,`ps_mapping_barrier_2`
                ,`ps_mapping_barrier_3`
			 	, `action`
			)
SELECT 		   `new`.`floc`
             , `new`.`description`
             , `new`.`system_status`
             , `new`.`user_status`
             , `new`.`support_floc`
             , `new`.`ps_ref_1`
             , `new`.`ps_ref_2`
             , `new`.`ps_ref_3`
             , `new`.`ps_mapping_barrier_1`
             , `new`.`ps_mapping_barrier_2`
             , `new`.`ps_mapping_barrier_3`
		     , 'U' AS 'action'
	FROM `barrier_landing`.`ps_mapping_eis` AS `new`
	INNER JOIN  `barrier_ods`.`ps_mapping_eis` AS `existing`
	ON `new`.`floc` = `existing`.`floc` AND `existing`.`current_flag` = 1
	WHERE `new`.`floc` NOT IN (SELECT `floc` FROM `barrier_ods`.`ps_mapping_eis_tmp`);

	INSERT INTO `barrier_ods`.`ps_mapping_eis_tmp`
		(
                `floc`
                ,`description`
                ,`system_status`
                ,`user_status`
                ,`support_floc`
                ,`ps_ref_1`
                ,`ps_ref_2`
                ,`ps_ref_3`
                ,`ps_mapping_barrier_1`
                ,`ps_mapping_barrier_2`
                ,`ps_mapping_barrier_3`
			  	, `action`
			)
SELECT   	   `new`.`floc`
          , `new`.`description`
          , `new`.`system_status`
          , `new`.`user_status`
          , `new`.`support_floc`
          , `new`.`ps_ref_1`
          , `new`.`ps_ref_2`
          , `new`.`ps_ref_3`
          , `new`.`ps_mapping_barrier_1`
          , `new`.`ps_mapping_barrier_2`
          , `new`.`ps_mapping_barrier_3`
            , 'I' AS 'action'
	FROM `barrier_landing`.`ps_mapping_eis` AS `new`
	LEFT JOIN  `barrier_ods`.`ps_mapping_eis` AS `existing`
	ON `new`.`floc` = `existing`.`floc` AND `existing`.`current_flag` = 1
	WHERE `existing`.`floc` IS NULL;


	/* Deal with changed rows that need to have history tracked */
	UPDATE `barrier_ods`.`ps_mapping_eis` AS `existing`
	INNER JOIN `barrier_ods`.`ps_mapping_eis_tmp` AS `new`
	ON `new`.`floc` = `existing`.`floc`
	SET `existing`.`end_dt` = @v_end_dt,
	    `existing`.`current_flag` = 0
	WHERE `new`.`action` = 'C'
	AND `existing`.`current_flag` = 1;

	INSERT INTO `barrier_ods`.`ps_mapping_eis`
		(
                `floc`
                 ,`description`
                 ,`system_status`
                 ,`user_status`
                 ,`support_floc`
                 ,`ps_ref_1`
                 ,`ps_ref_2`
                 ,`ps_ref_3`
                 ,`ps_mapping_barrier_1`
                 ,`ps_mapping_barrier_2`
                 ,`ps_mapping_barrier_3`
				, `current_flag`
				, `start_dt`
				, `end_dt`
				, `source_extracted_dt`
			)
SELECT      	   `new`.`floc`
                    , `new`.`description`
                    , `new`.`system_status`
                    , `new`.`user_status`
                    , `new`.`support_floc`
                    , `new`.`ps_ref_1`
                    , `new`.`ps_ref_2`
                    , `new`.`ps_ref_3`
                    , `new`.`ps_mapping_barrier_1`
                    , `new`.`ps_mapping_barrier_2`
                    , `new`.`ps_mapping_barrier_3`
				, 1 AS `current_flag`
				, @v_start_dt AS `start_dt`
				, NULL AS `end_dt`
				, @v_start_dt AS `source_extracted_dt`
	FROM `barrier_ods`.`ps_mapping_eis_tmp` AS `new`
	WHERE `new`.`action` = 'C';

	/* Deal with updating existing rows where values have changed but for which we do not need to track history */
	UPDATE `barrier_ods`.`ps_mapping_eis` AS `existing`
	INNER JOIN `barrier_ods`.`ps_mapping_eis_tmp` AS `new`
	ON `new`.`floc` = `existing`.`floc` AND `new`.`action` = 'U'
	SET `existing`.`description` = `new`.`description`
	WHERE `existing`.`current_flag` = 1;


	/* Finally insert new rows */
	INSERT INTO `barrier_ods`.`ps_mapping_eis`
		(
                 `floc`
                , `description`
                , `system_status`
                , `user_status`
                , `support_floc`
                , `ps_ref_1`
                , `ps_ref_2`
                , `ps_ref_3`
                , `ps_mapping_barrier_1`
                , `ps_mapping_barrier_2`
                , `ps_mapping_barrier_3`
				, `current_flag`
				, `start_dt`
				, `end_dt`
				, `source_extracted_dt`
			)
SELECT    	   	   `new`.`floc`
                       , `new`.`description`
                       , `new`.`system_status`
                       , `new`.`user_status`
                       , `new`.`support_floc`
                       , `new`.`ps_ref_1`
                       , `new`.`ps_ref_2`
                       , `new`.`ps_ref_3`
                       , `new`.`ps_mapping_barrier_1`
                       , `new`.`ps_mapping_barrier_2`
                       , `new`.`ps_mapping_barrier_3`
				, 1 AS `current_flag`
				, @v_start_dt AS `start_dt`
				, NULL AS `end_dt`
				, @v_start_dt AS `source_extracted_dt`
	FROM `barrier_ods`.`ps_mapping_eis_tmp` AS `new`
	WHERE `new`.`action` = 'I';

	/* Remove temporary table */
	DROP TEMPORARY TABLE IF EXISTS `barrier_ods`.`ps_mapping_eis_tmp`;

END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
