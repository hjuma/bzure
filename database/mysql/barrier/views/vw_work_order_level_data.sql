-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

 
CREATE  OR REPLACE VIEW `vw_work_order_level_data` AS select  `metric`.`barrier_element_id`
		, `data`.`functional_location`
		, `data`.`facility_id`
		, `fac`.`barrier_type_id`
		, `fac`.`barrier_metric_id`
		, `fac`.`rag_status`
		, `data`.`planner_group_id`
		, `data`.`abc_indicator_id`
		, `data`.`work_order_number`
		, `data`.`work_order_description`
		, `data`.`order_type`
		, `data`.`user_status`
		, `data`.`awaiting_deferrment`
		, `data`.`deferred`
		, `data`.`work_centre`
		, `data`.`latest_allowable_finish_date`
		, `data`.`maint_activ_type`
		, sysdate() created_at
		, sysdate() updated_at
from `barrier`.sap_work_order_data `data`
left join `barrier`.barrier_metric `metric`
on `data`.barrier_metrics = metric.name
left join `barrier`.performance_standard ps
on `data`.performance_standard_id = ps.id
inner join `barrier`.facility_level_data `fac`
on `data`.facility_id = fac.facility_id
and `metric`.id = fac.barrier_metric_id
and `ps`.barrier_type_id = fac.barrier_type_id ;
