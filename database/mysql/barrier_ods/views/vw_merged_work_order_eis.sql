-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------
 
CREATE  OR REPLACE VIEW `vw_merged_work_order_eis` AS SELECT     'EIS' AS 'asset_code'
			, 'MAP1' AS 'facility_code'
			, `functional_loc`
			, `description`
			, `order_type`
			, `Order`
			, `maint_activ_type`
			, `description_4`
			, `planner_group`
			, `main_work_ctr`
			, `user_status`
			, `system_status`
			, `Priority`
			, `estimated_costs`
			, `total_act_costs`
			, `total_settlemt`
			, `total_plnnd_costs`
			, `tot_sum_plan`
			, `total_rev_act`
			, `tot_plan_rev`
			, `tot_sum_actual`
			, `abc_indic`
			, `reference_date`
			, `ref_element_pm_ps`
			, `address_number`
			, `reference_time`
			, `changed_on`
			, `changed_by`
			, `available_to`
			, `avail_to_time`
			, `asset`
			, `sub_number`
			, `available_from`
			, `available_from30`
			, `system_condition`
			, `work_center`
			, `priority_type`
			, `res_purc_req`
			, `subnet_work_of`
			, `order_category`
			, `plant_wk_cntr`
			, `assembly`
			, `assembly_desc`
			, `plant_section`
			, `acctg_indicator`
			, `po_date`
			, `po_number`
			, `company_code`
			, `city`
			, `district`
			, `country`
			, `device_data`
			, `sort_field`
			, `description_50`
			, `equipment`
			, `created_on`
			, `entered_by`
			, `billingform`
			, `actual_release`
			, `actual_finish`
			, `actual_finish1`
			, `basic_fin_date`
			, `sched_finish`
			, `basic_fin_time`
			, `finish_time`
			, `business_area`
			, `actual_start`
			, `bas_start_date`
			, `sched_start`
			, `actual_start1`
			, `start_time`
			, `sched_start_time`
			, `hist_fr`
			, `planning_plant`
			, `costing_sheet`
			, `sales_document`
			, `item`
			, `co_Area`
			, `cost_center`
			, `resp_cost_cntr`
			, `customer`
			, `leading_order`
			, `deletion_flag`
			, `long_txt_exists`
			, `description_81`
			, `superior_order`
			, `base_unit`
			, `quantity`
			, `room`
			, `list_name`
			, `object_number`
			, `paging_status`
			, `pgrp_task_list`
			, `order_plan_ind`
			, `group_counter`
			, `group`
			, `postal_code`
			, `profit_center`
			, `priority_95`
			, `wbs_element`
			, `wbs_ord_header`
			, `notification`
			, `region`
			, `revision`
			, `serial_number`
			, `material`
			, `service_product`
			, `service_product_104`
			, `division`
			, `division_sales`
			, `location`
			, `street`
			, `maint_plant`
			, `telephone`
			, `sales_office`
			, `sales_group`
			, `sales_org`
			, `sales_org_sales`
			, `superior_act`
			, `distr_channel`
			, `distr_channel_sal`
			, `currency`
			, `maint_item`
			, `maintenance_plan`
			, `plant`
			, `comp`
			, `overhead_key`
			, `earlst_allow_fin_dat`
			, `earl_allow_start_dat`
			, `latest_allow_fin_dat`
			, `original_due_date`
			, `object_list`
			, `catalog_type`
			, `code_group`
			, `coding`
FROM `barrier_ods`.`work_order_eis_map1`
WHERE `current_flag`=1
UNION ALL
SELECT     'EIS' AS 'asset_code'
			, 'MCP1' AS 'facility_code'
			, `functional_loc`
			, `description`
			, `order_type`
			, `Order`
			, `maint_activ_type`
			, `description_4`
			, `planner_group`
			, `main_work_ctr`
			, `user_status`
			, `system_status`
			, `Priority`
			, `estimated_costs`
			, `total_act_costs`
			, `total_settlemt`
			, `total_plnnd_costs`
			, `tot_sum_plan`
			, `total_rev_act`
			, `tot_plan_rev`
			, `tot_sum_actual`
			, `abc_indic`
			, `reference_date`
			, `ref_element_pm_ps`
			, `address_number`
			, `reference_time`
			, `changed_on`
			, `changed_by`
			, `available_to`
			, `avail_to_time`
			, `asset`
			, `sub_number`
			, `available_from`
			, `available_from30`
			, `system_condition`
			, `work_center`
			, `priority_type`
			, `res_purc_req`
			, `subnet_work_of`
			, `order_category`
			, `plant_wk_cntr`
			, `assembly`
			, `assembly_desc`
			, `plant_section`
			, `acctg_indicator`
			, `po_date`
			, `po_number`
			, `company_code`
			, `city`
			, `district`
			, `country`
			, `device_data`
			, `sort_field`
			, `description_50`
			, `equipment`
			, `created_on`
			, `entered_by`
			, `billingform`
			, `actual_release`
			, `actual_finish`
			, `actual_finish1`
			, `basic_fin_date`
			, `sched_finish`
			, `basic_fin_time`
			, `finish_time`
			, `business_area`
			, `actual_start`
			, `bas_start_date`
			, `sched_start`
			, `actual_start1`
			, `start_time`
			, `sched_start_time`
			, `hist_fr`
			, `planning_plant`
			, `costing_sheet`
			, `sales_document`
			, `item`
			, `co_Area`
			, `cost_center`
			, `resp_cost_cntr`
			, `customer`
			, `leading_order`
			, `deletion_flag`
			, `long_txt_exists`
			, `description_81`
			, `superior_order`
			, `base_unit`
			, `quantity`
			, `room`
			, `list_name`
			, `object_number`
			, `paging_status`
			, `pgrp_task_list`
			, `order_plan_ind`
			, `group_counter`
			, `group`
			, `postal_code`
			, `profit_center`
			, `priority_95`
			, `wbs_element`
			, `wbs_ord_header`
			, `notification`
			, `region`
			, `revision`
			, `serial_number`
			, `material`
			, `service_product`
			, `service_product_104`
			, `division`
			, `division_sales`
			, `location`
			, `street`
			, `maint_plant`
			, `telephone`
			, `sales_office`
			, `sales_group`
			, `sales_org`
			, `sales_org_sales`
			, `superior_act`
			, `distr_channel`
			, `distr_channel_sal`
			, `currency`
			, `maint_item`
			, `maintenance_plan`
			, `plant`
			, `comp`
			, `overhead_key`
			, `earlst_allow_fin_dat`
			, `earl_allow_start_dat`
			, `latest_allow_fin_dat`
			, `original_due_date`
			, `object_list`
			, `catalog_type`
			, `code_group`
			, `coding`
FROM `barrier_ods`.`work_order_eis_mcp1`
WHERE `current_flag`=1
UNION ALL
SELECT     'EIS' AS 'asset_code'
			, 'MDP1' AS 'facility_code'
			, `functional_loc`
			, `description`
			, `order_type`
			, `Order`
			, `maint_activ_type`
			, `description_4`
			, `planner_group`
			, `main_work_ctr`
			, `user_status`
			, `system_status`
			, `Priority`
			, `estimated_costs`
			, `total_act_costs`
			, `total_settlemt`
			, `total_plnnd_costs`
			, `tot_sum_plan`
			, `total_rev_act`
			, `tot_plan_rev`
			, `tot_sum_actual`
			, `abc_indic`
			, `reference_date`
			, `ref_element_pm_ps`
			, `address_number`
			, `reference_time`
			, `changed_on`
			, `changed_by`
			, `available_to`
			, `avail_to_time`
			, `asset`
			, `sub_number`
			, `available_from`
			, `available_from30`
			, `system_condition`
			, `work_center`
			, `priority_type`
			, `res_purc_req`
			, `subnet_work_of`
			, `order_category`
			, `plant_wk_cntr`
			, `assembly`
			, `assembly_desc`
			, `plant_section`
			, `acctg_indicator`
			, `po_date`
			, `po_number`
			, `company_code`
			, `city`
			, `district`
			, `country`
			, `device_data`
			, `sort_field`
			, `description_50`
			, `equipment`
			, `created_on`
			, `entered_by`
			, `billingform`
			, `actual_release`
			, `actual_finish`
			, `actual_finish1`
			, `basic_fin_date`
			, `sched_finish`
			, `basic_fin_time`
			, `finish_time`
			, `business_area`
			, `actual_start`
			, `bas_start_date`
			, `sched_start`
			, `actual_start1`
			, `start_time`
			, `sched_start_time`
			, `hist_fr`
			, `planning_plant`
			, `costing_sheet`
			, `sales_document`
			, `item`
			, `co_Area`
			, `cost_center`
			, `resp_cost_cntr`
			, `customer`
			, `leading_order`
			, `deletion_flag`
			, `long_txt_exists`
			, `description_81`
			, `superior_order`
			, `base_unit`
			, `quantity`
			, `room`
			, `list_name`
			, `object_number`
			, `paging_status`
			, `pgrp_task_list`
			, `order_plan_ind`
			, `group_counter`
			, `group`
			, `postal_code`
			, `profit_center`
			, `priority_95`
			, `wbs_element`
			, `wbs_ord_header`
			, `notification`
			, `region`
			, `revision`
			, `serial_number`
			, `material`
			, `service_product`
			, `service_product_104`
			, `division`
			, `division_sales`
			, `location`
			, `street`
			, `maint_plant`
			, `telephone`
			, `sales_office`
			, `sales_group`
			, `sales_org`
			, `sales_org_sales`
			, `superior_act`
			, `distr_channel`
			, `distr_channel_sal`
			, `currency`
			, `maint_item`
			, `maintenance_plan`
			, `plant`
			, `comp`
			, `overhead_key`
			, `earlst_allow_fin_dat`
			, `earl_allow_start_dat`
			, `latest_allow_fin_dat`
			, `original_due_date`
			, `object_list`
			, `catalog_type`
			, `code_group`
			, `coding`
FROM `barrier_ods`.`work_order_eis_mdp1`
WHERE `current_flag`=1 ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;