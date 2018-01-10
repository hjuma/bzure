-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

CREATE OR REPLACE VIEW `vw_facility_level_data` AS select  
        a.facility_id
		, a.barrier_type_id
		, a.barrier_metric_id
		, a.count_of_data
		, CASE
			WHEN ISNULL(d.amber_start) OR ISNULL(d.amber_end) THEN NULL
			WHEN a.count_of_data < d.amber_start THEN 'G'
			WHEN a.count_of_data > d.amber_end THEN 'R'
			ELSE 'A'
		  END `rag_status`
		, SYSDATE() `created_at`
		, SYSDATE() `updated_at`
from vw1_facility_level_data `a`
left join `barrier`.`barrier_type` `c`
on `a`.`barrier_type_id` = c.id
left join facility_rule_set `d`
on c.barrier_id = d.barrier_id and a.barrier_metric_id = d.barrier_metric_id
and `d`.`current_flag` = 1 ;

 
