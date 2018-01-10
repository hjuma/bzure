CREATE OR REPLACE VIEW `vw_asset_level_barrier_type` AS SELECT   `facility_id`
		 , `barrier_type_id`
		 , `count_of_data`
		 , CASE
		 		WHEN `red_count` > `rs`.`amber_end` THEN 'R'
		 		WHEN `amber_count` >= `rs`.`amber_start` AND `amber_count` <> 0 THEN 'A'
		 		ELSE 'G'
		 	END `rag_status`
		 , red_count
		 , amber_count
		 , green_count
		 , SYSDATE() created_at
		 , SYSDATE() updated_at
FROM `barrier`.`vw_asset_level_data` `data`
INNER JOIN `barrier`.`barrier_type` `bt`
ON `data`.`barrier_type_id` = `bt`.`id`
INNER JOIN `barrier`.`asset_rule_set` `rs`
ON `bt`.`barrier_id` = `rs`.`barrier_id`
AND `rs`.`current_flag` = 1 ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
