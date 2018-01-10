-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------


CREATE OR REPLACE VIEW `vw_asset_level_data` AS SELECT `facility_id`
	  , `barrier_type_id`
	  , SUM(`count_of_data`) `count_of_data`
	  , (SELECT COUNT(`rag_status`)
	  			FROM `barrier`.`facility_level_data` `red`
				  WHERE `red`.`facility_id` = `main`.`facility_id` AND `rag_status`='R'
				  AND `red`.`barrier_type_id` = `main`.`barrier_type_id`) `red_count`
	  , (SELECT COUNT(`rag_status`)
	  			FROM `barrier`.`facility_level_data` `amber`
				  WHERE `amber`.`facility_id` = `main`.`facility_id` AND `rag_status`='A'
				  AND `amber`.`barrier_type_id` = `main`.`barrier_type_id`) `amber_count`
 	  , (SELECT COUNT(`rag_status`)
	  			FROM `barrier`.`facility_level_data` `green`
				  WHERE `green`.`facility_id` = `main`.`facility_id` AND `rag_status`='G'
				  AND `green`.`barrier_type_id` = `main`.`barrier_type_id`) `green_count`
FROM `barrier`.`facility_level_data` `main`
WHERE barrier_type_id != -1 AND barrier_metric_id != -1
GROUP BY
			`facility_id`
	  	 , `barrier_type_id` ;


