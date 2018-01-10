-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------


CREATE OR REPLACE VIEW `vw_performance_standard_mapping` AS SELECT  `floc` AS 'code'
		, COALESCE(`asset`.`id`, -1) AS 'asset_id'
		, COALESCE(`ps`.`id`, -1) AS `ps_id`
		, `ps_mapping`.`description`
		, SYSDATE() AS 'created_at'
		, SYSDATE() AS 'updated_at'
FROM `barrier_ods`.`vw_merged_ps_mapping` `ps_mapping`
LEFT JOIN `barrier`.`asset` `asset`
ON `ps_mapping`.`asset` = `asset`.`code`
LEFT JOIN `barrier`.`performance_standard` `ps`
ON `ps_mapping`.`performance_standard` = `ps`.`code`
AND COALESCE(`asset`.`id`, -1) = `ps`.`asset_id` ;


