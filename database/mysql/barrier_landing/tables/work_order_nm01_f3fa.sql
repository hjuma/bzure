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

-- Dumping structure for table barrier_landing.work_order_nm01_f3fa
CREATE TABLE IF NOT EXISTS `work_order_nm01_f3fa` (
  `facility_code` varchar(4) NOT NULL DEFAULT 'F3FA',
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
  `system_status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table barrier_landing.work_order_nm01_f3fa: ~1,679 rows (approximately)
/*!40000 ALTER TABLE `work_order_nm01_f3fa` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_order_nm01_f3fa` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
