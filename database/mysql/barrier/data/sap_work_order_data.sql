CREATE TABLE `sap_work_order_data` (
	`barrier_element` VARCHAR(3) NOT NULL,
	`functional_location` VARCHAR(50) NULL DEFAULT NULL,
	`asset_id` INT(10) NOT NULL,
	`facility_id` INT(10) NOT NULL,
	`performance_standard_id` INT(10) NOT NULL,
	`planner_group_id` INT(10) NOT NULL,
	`abc_indicator_id` INT(10) NOT NULL,
	`barrier_metrics` VARCHAR(21) NOT NULL,
	`work_order_number` VARCHAR(50) NOT NULL,
	`work_order_description` VARCHAR(50) NOT NULL,
	`order_type` VARCHAR(50) NOT NULL,
	`user_status` VARCHAR(50) NOT NULL,
	`awaiting_deferrment` VARCHAR(1) NOT NULL,
	`deferred` VARCHAR(1) NOT NULL,
	`work_centre` VARCHAR(50) NOT NULL,
	`latest_allowable_finish_date` DATETIME NULL DEFAULT NULL,
	`maint_activ_type` VARCHAR(50) NULL DEFAULT NULL,
	`snapshot_date` DATETIME NOT NULL,
	`snapshot_pid` VARCHAR(20) NULL DEFAULT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL,
	PRIMARY KEY (`asset_id`, `facility_id`, `work_order_number`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

