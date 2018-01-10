-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------


CREATE OR REPLACE VIEW `vw1_facility_level_data` AS SELECT
			 facility_id
			, COALESCE(`ps`.`barrier_type_id`, -1) `barrier_type_id`
			, COALESCE(metric.id, -1) barrier_metric_id
			, COUNT(*) count_of_data
			, SYSDATE() created_at
			, SYSDATE() updated_at
FROM sap_work_order_data `data`
LEFT JOIN barrier.barrier_metric `metric`
ON `data`.`barrier_metrics` = `metric`.`name`
LEFT JOIN `barrier`.`performance_standard` `ps`
ON `data`.`performance_standard_id` = `ps`.`id`
GROUP BY facility_id
			,  COALESCE(`ps`.`barrier_type_id`, -1)
			, COALESCE(metric.id, -1) ;

