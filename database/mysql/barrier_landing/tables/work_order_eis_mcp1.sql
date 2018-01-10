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


-- Dumping database structure for barrier_landing
CREATE DATABASE IF NOT EXISTS `barrier_landing` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `barrier_landing`;

-- Dumping structure for table barrier_landing.work_order_eis_mcp1
CREATE TABLE IF NOT EXISTS `work_order_eis_mcp1` (
  `functional_loc` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `order_type` varchar(50) DEFAULT NULL,
  `Order` varchar(50) DEFAULT NULL,
  `maint_activ_type` varchar(50) DEFAULT NULL,
  `description_4` varchar(50) DEFAULT NULL,
  `planner_group` varchar(50) DEFAULT NULL,
  `main_work_ctr` varchar(50) DEFAULT NULL,
  `user_status` varchar(50) DEFAULT NULL,
  `system_status` varchar(50) DEFAULT NULL,
  `Priority` varchar(50) DEFAULT NULL,
  `estimated_costs` varchar(50) DEFAULT NULL,
  `total_act_costs` varchar(50) DEFAULT NULL,
  `total_settlemt` varchar(50) DEFAULT NULL,
  `total_plnnd_costs` varchar(50) DEFAULT NULL,
  `tot_sum_plan` varchar(50) DEFAULT NULL,
  `total_rev_act` varchar(50) DEFAULT NULL,
  `tot_plan_rev` varchar(50) DEFAULT NULL,
  `tot_sum_actual` varchar(50) DEFAULT NULL,
  `abc_indic` varchar(50) DEFAULT NULL,
  `reference_date` varchar(50) DEFAULT NULL,
  `ref_element_pm_ps` varchar(50) DEFAULT NULL,
  `address_number` varchar(50) DEFAULT NULL,
  `reference_time` varchar(50) DEFAULT NULL,
  `changed_on` varchar(50) DEFAULT NULL,
  `changed_by` varchar(50) DEFAULT NULL,
  `available_to` varchar(50) DEFAULT NULL,
  `avail_to_time` varchar(50) DEFAULT NULL,
  `asset` varchar(50) DEFAULT NULL,
  `sub_number` varchar(50) DEFAULT NULL,
  `available_from` varchar(50) DEFAULT NULL,
  `available_from30` varchar(50) DEFAULT NULL,
  `system_condition` varchar(50) DEFAULT NULL,
  `work_center` varchar(50) DEFAULT NULL,
  `priority_type` varchar(50) DEFAULT NULL,
  `res_purc_req` varchar(50) DEFAULT NULL,
  `subnet_work_of` varchar(50) DEFAULT NULL,
  `order_category` varchar(50) DEFAULT NULL,
  `plant_wk_cntr` varchar(50) DEFAULT NULL,
  `assembly` varchar(50) DEFAULT NULL,
  `assembly_desc` varchar(50) DEFAULT NULL,
  `plant_section` varchar(50) DEFAULT NULL,
  `acctg_indicator` varchar(50) DEFAULT NULL,
  `po_date` varchar(50) DEFAULT NULL,
  `po_number` varchar(50) DEFAULT NULL,
  `company_code` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `device_data` varchar(50) DEFAULT NULL,
  `sort_field` varchar(50) DEFAULT NULL,
  `description_50` varchar(50) DEFAULT NULL,
  `equipment` varchar(50) DEFAULT NULL,
  `created_on` varchar(50) DEFAULT NULL,
  `entered_by` varchar(50) DEFAULT NULL,
  `billingform` varchar(50) DEFAULT NULL,
  `actual_release` varchar(50) DEFAULT NULL,
  `actual_finish` varchar(50) DEFAULT NULL,
  `actual_finish1` varchar(50) DEFAULT NULL,
  `basic_fin_date` varchar(50) DEFAULT NULL,
  `sched_finish` varchar(50) DEFAULT NULL,
  `basic_fin_time` varchar(50) DEFAULT NULL,
  `finish_time` varchar(50) DEFAULT NULL,
  `business_area` varchar(50) DEFAULT NULL,
  `actual_start` varchar(50) DEFAULT NULL,
  `bas_start_date` varchar(50) DEFAULT NULL,
  `sched_start` varchar(50) DEFAULT NULL,
  `actual_start1` varchar(50) DEFAULT NULL,
  `start_time` varchar(50) DEFAULT NULL,
  `sched_start_time` varchar(50) DEFAULT NULL,
  `hist_fr` varchar(50) DEFAULT NULL,
  `planning_plant` varchar(50) DEFAULT NULL,
  `costing_sheet` varchar(50) DEFAULT NULL,
  `sales_document` varchar(50) DEFAULT NULL,
  `item` varchar(50) DEFAULT NULL,
  `co_Area` varchar(50) DEFAULT NULL,
  `cost_center` varchar(50) DEFAULT NULL,
  `resp_cost_cntr` varchar(50) DEFAULT NULL,
  `customer` varchar(50) DEFAULT NULL,
  `leading_order` varchar(50) DEFAULT NULL,
  `deletion_flag` varchar(50) DEFAULT NULL,
  `long_txt_exists` varchar(50) DEFAULT NULL,
  `description_81` varchar(50) DEFAULT NULL,
  `superior_order` varchar(50) DEFAULT NULL,
  `base_unit` varchar(50) DEFAULT NULL,
  `quantity` varchar(50) DEFAULT NULL,
  `room` varchar(50) DEFAULT NULL,
  `list_name` varchar(50) DEFAULT NULL,
  `object_number` varchar(50) DEFAULT NULL,
  `paging_status` varchar(50) DEFAULT NULL,
  `pgrp_task_list` varchar(50) DEFAULT NULL,
  `order_plan_ind` varchar(50) DEFAULT NULL,
  `group_counter` varchar(50) DEFAULT NULL,
  `group` varchar(50) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `profit_center` varchar(50) DEFAULT NULL,
  `priority_95` varchar(50) DEFAULT NULL,
  `wbs_element` varchar(50) DEFAULT NULL,
  `wbs_ord_header` varchar(50) DEFAULT NULL,
  `notification` varchar(50) DEFAULT NULL,
  `region` varchar(50) DEFAULT NULL,
  `revision` varchar(50) DEFAULT NULL,
  `serial_number` varchar(50) DEFAULT NULL,
  `material` varchar(50) DEFAULT NULL,
  `service_product` varchar(50) DEFAULT NULL,
  `service_product_104` varchar(50) DEFAULT NULL,
  `division` varchar(50) DEFAULT NULL,
  `division_sales` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `maint_plant` varchar(50) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `sales_office` varchar(50) DEFAULT NULL,
  `sales_group` varchar(50) DEFAULT NULL,
  `sales_org` varchar(50) DEFAULT NULL,
  `sales_org_sales` varchar(50) DEFAULT NULL,
  `superior_act` varchar(50) DEFAULT NULL,
  `distr_channel` varchar(50) DEFAULT NULL,
  `distr_channel_sal` varchar(50) DEFAULT NULL,
  `currency` varchar(50) DEFAULT NULL,
  `maint_item` varchar(50) DEFAULT NULL,
  `maintenance_plan` varchar(50) DEFAULT NULL,
  `plant` varchar(50) DEFAULT NULL,
  `comp` varchar(50) DEFAULT NULL,
  `overhead_key` varchar(50) DEFAULT NULL,
  `earlst_allow_fin_dat` varchar(50) DEFAULT NULL,
  `earl_allow_start_dat` varchar(50) DEFAULT NULL,
  `latest_allow_fin_dat` varchar(50) DEFAULT NULL,
  `original_due_date` varchar(50) DEFAULT NULL,
  `object_list` varchar(50) DEFAULT NULL,
  `catalog_type` varchar(50) DEFAULT NULL,
  `code_group` varchar(50) DEFAULT NULL,
  `coding` varchar(50) DEFAULT NULL,
  KEY `Order` (`Order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table barrier_landing.work_order_eis_mcp1: ~12,242 rows (approximately)
/*!40000 ALTER TABLE `work_order_eis_mcp1` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_order_eis_mcp1` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;