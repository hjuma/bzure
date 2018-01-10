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


-- Dumping database structure for barrier_ods
CREATE DATABASE IF NOT EXISTS `barrier_ods` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `barrier_ods`;

-- Dumping structure for table barrier_ods.merged_work_order_nm01
CREATE TABLE IF NOT EXISTS `merged_work_order_nm01` (
  `BarrierSk` int(11) NOT NULL AUTO_INCREMENT,
  `asset_code` varchar(10) NOT NULL,
  `facility_code` varchar(4) NOT NULL,
  `order` int(8) DEFAULT NULL,
  `functional_loc` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `order_type` varchar(50) DEFAULT NULL,
  `planner_group` varchar(50) DEFAULT NULL,
  `user_status` varchar(50) DEFAULT NULL,
  `abc_indic` char(1) DEFAULT NULL,
  `work_center` varchar(50) DEFAULT NULL,
  `maint_activ_type` varchar(50) DEFAULT NULL,
  `latest_allow_fin_dat` date DEFAULT NULL,
  `system_status` varchar(50) DEFAULT NULL,
  `current_flag` bit(1) NOT NULL,
  `start_dt` datetime NOT NULL,
  `end_dt` datetime DEFAULT NULL,
  `source_extracted_dt` datetime NOT NULL,
  PRIMARY KEY (`BarrierSk`),
  KEY `order_grov` (`order`,`current_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table barrier_ods.merged_work_order_nm01: ~0 rows (approximately)
/*!40000 ALTER TABLE `merged_work_order_nm01` DISABLE KEYS */;
/*!40000 ALTER TABLE `merged_work_order_nm01` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
