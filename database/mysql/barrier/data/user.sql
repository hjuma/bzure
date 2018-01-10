CREATE TABLE `user` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`business_unit_id` INT(10) NOT NULL,
	`role_id` INT(10) NOT NULL,
	`first_name` VARCHAR(35) NOT NULL,
	`last_name` VARCHAR(35) NOT NULL,
	`username` VARCHAR(35) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`salt` VARCHAR(255) NULL DEFAULT NULL,
	`last_login` DATETIME NULL DEFAULT NULL,
	`status` ENUM('active','inactive') NULL DEFAULT 'active',
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL,
	PRIMARY KEY (`id`),
	INDEX `business_unit_id` (`business_unit_id`),
	INDEX `role_id_version` (`role_id`),
	CONSTRAINT `user_ibfk_1` FOREIGN KEY (`business_unit_id`) REFERENCES `business_unit` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT `user_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=4
;

