-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

SET @the_date = SYSDATE() - INTERVAL 39 DAY; -- AMEND THIS VALUE TO RUN FOR PREVIOUS DATE (OLD FILES)
SET @snapshot_date = SYSDATE();

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping data for table barrier.asset: ~3 rows (approximately)
/*!40000 ALTER TABLE `barrier`.`asset` DISABLE KEYS */;
INSERT INTO `barrier`.`asset` (`id`, `code`, `business_unit_id`, `name`, `created_at`, `updated_at`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(-1, 'UNK',1, 'Unknown', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(1, 'EIS',1, 'Morecambe' , '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(2, 'NM01',1, 'North Sea' , '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null);
/*!40000 ALTER TABLE `barrier`.`asset` ENABLE KEYS */;


/*!40000 ALTER TABLE `barrier`.`business_unit` DISABLE KEYS */;
INSERT INTO `barrier`.`business_unit` (`id`, `name`, `description`, `created_at`, `updated_at`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(1, 'E&P', 'E&P', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(2, 'CSL', 'CSL', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null);
/*!40000 ALTER TABLE `barrier`.`business_unit` ENABLE KEYS */;

-- Dumping data for table barrier.abc_indicator: ~13 rows (approximately)
/*!40000 ALTER TABLE `barrier`.`abc_indicator` DISABLE KEYS */;
INSERT INTO `barrier`.`abc_indicator` (`id`, `code`, `asset_id`, `description`, `created_at`, `updated_at`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(-1, 'UNK', -1, 'Unknown', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(1, 'I', 1, 'EP Safety Crit Equipment', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(2, 'J', 1, 'EP Enviro Crit Equipment', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(3, 'K', 1, 'EP Prod Crit - High', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(4, 'L', 1, 'EP Prod Crit - Med', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(5, 'M', 1, 'EP Prod Crit - Low', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(6, 'N', 1, 'EP Non Crit Equip', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(7, 'I', 2, 'EP Safety Crit Equipment', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(8, 'J', 2, 'EP Enviro Crit Equipment', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(9, 'K', 2, 'EP Prod Crit - High', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(10, 'L', 2, 'EP Prod Crit - Med', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(11, 'M', 2, 'EP Prod Crit - Low', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(12, 'N', 2, 'EP Non Crit Equip', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null);
/*!40000 ALTER TABLE `barrier`.`abc_indicator` ENABLE KEYS */;

/*!40000 ALTER TABLE `barrier`.`barrier_element` DISABLE KEYS */;
INSERT INTO `barrier`.`barrier_element` (`id`, `name`, `created_at`, `updated_at`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(1, 'SCM', '2017-09-20 13:25:44', '2017-09-20 13:25:47', 1, sysdate(), null),
	(2, 'SAFEWELLS', '2017-09-20 13:25:58', '2017-09-20 13:26:00', 1, sysdate(), null),
	(3, 'ORA', '2017-09-20 13:26:06', '2017-09-20 13:26:08', 1, sysdate(), null);
/*!40000 ALTER TABLE `barrier`.`barrier_element` ENABLE KEYS */;


/*!40000 ALTER TABLE `barrier`.`barrier_metric` DISABLE KEYS */;
INSERT INTO `barrier`.`barrier_metric` (`id`, `barrier_element_id`, `name`, `description`,`use_barriers`, `green_on_no_data`, `display_order`, `created_at`, `updated_at`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(-1, 1, 'Incorrect Assignment', 'Work orders that do not fall into any other barrier sub-set based on the business logic defined for each', true,true, 5, '2017-09-20 13:46:12', '2017-09-20 13:46:13', 1, sysdate(), null),
	(1, 1, 'Deferred Reactive', 'Deferred Reactive - Order Type = UM02, Deferred = Y, LAFD >= @run_date',true,true, 1, '2017-09-20 13:46:12', '2017-09-20 13:46:13', 1, sysdate(), null),
	(2, 1, 'Deferred Preventative', 'Deferred Preventative - Order Type = UM01, Deferred = Y, LAFD >= @run_date',true,true, 2, '2017-09-20 13:46:31', '2017-09-20 13:46:33', 1, sysdate(), null),
	(3, 1, 'Backlog Reactive', 'Backlog Reactive - Order Type = UM02, LAFD < @run_date',true,true, 3, '2017-09-20 13:46:56', '2017-09-20 13:46:58', 1, sysdate(), null),
	(4, 1, 'Backlog Preventative', 'Backlog Preventative - Order Type = UM01, LAFD < @run_date',true,true, 4, '2017-09-20 13:47:14', '2017-09-20 13:47:16', 1, sysdate(), null),
	(5, 2, 'Backlog - Safety Critical PMR', 'Backlog - Safety Critical PMR', true, false, 1, '2017-09-20 13:47:14', '2017-09-20 13:47:16', 1, sysdate(), null),
	(6, 2, 'Deferred - Safety Critical PMR', 'Deferred - Safety Critical PMR', true, false, 1, '2017-09-20 13:47:14', '2017-09-20 13:47:16', 1, sysdate(), null),
	(7, 2, 'Backlog - Safety Critical Corrective Maint.', 'Backlog - Safety Critical Corrective Maint.', true, false, 1, '2017-09-20 13:47:14', '2017-09-20 13:47:16', 1, sysdate(), null),
	(8, 2, 'Deferred - Safety Critical Corrective Maint.', 'Deferred - Safety Critical Corrective Maint.', true, false, 1, '2017-09-20 13:47:14', '2017-09-20 13:47:16', 1, sysdate(), null),
	(9, 2, 'Degraded SCEs per well (DHSV, PMV & PWV)', 'Degraded SCEs per well (DHSV, PMV & PWV)', true, false, 1, '2017-09-20 13:47:14', '2017-09-20 13:47:16', 1, sysdate(), null),
	(10, 2, 'Wells with Degraded SCEs', 'Wells with Degraded SCEs', true, false, 1, '2017-09-20 13:47:14', '2017-09-20 13:47:16', 1, sysdate(), null),
	(11, 3, 'ORAs in Place', 'Count of ORAs in place for selecetd facility',false,false, 1, '2017-09-20 13:47:14', '2017-09-20 13:47:16', 1, sysdate(), null);
/*!40000 ALTER TABLE `barrier`.`barrier_metric` ENABLE KEYS */;

-- Dumping data for table barrier.barrier: ~6 rows (approximately)
/*!40000 ALTER TABLE `barrier`.`barrier` DISABLE KEYS */;
INSERT INTO `barrier`.`barrier` (`id`, `code`, `name`, `description`, `display_order`, `created_at`, `updated_at`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(-1, 'UNK', 'Unassigned', 'Work orders that have a FLOC with no performance standard mapping', 6, '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(1, 'PREV', 'Prevent', 'Prevent', 1, '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(2, 'DET', 'Detect', 'Detect', 2, '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(3, 'CONT', 'Control', 'Control', 3, '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(4, 'MIT', 'Mitigate', 'Mitigate', 4, '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(5, 'EMR', 'Emergency Response', 'Emergency Response', 5, '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null);
/*!40000 ALTER TABLE `barrier`.`barrier` ENABLE KEYS */;

INSERT INTO `barrier`.`barrier_type` (`id`, `asset_id`, `barrier_id`, `name`, `description`, `display_order`, `created_at`, `updated_at`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(-1, -1, -1, 'Unassigned', 'Unassigned', 9, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(-2, 1, -1, 'Unassigned', 'Unassigned', 9, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(-3, 2, -1, 'Unassigned', 'Unassigned', 9, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(2, 1, 1, 'Ignition Control', 'Ignition Control', 3, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(3, 1, 5, 'Emergency Response', 'Emergency Response', 1, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(4, 1, 4, 'Protection Systems', 'Protection Systems', 1, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(5, 1, 5, 'Lifesaving', 'Lifesaving', 2, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(6, 1, 3, 'Shutdown Systems', 'Shutdown Systems', 1, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(7, 1, 1, 'Process Containment', 'Process Containment', 2, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(8, 1, 2, 'Detection Systems', 'Detection Systems', 1, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(9, 1, 1, 'Structural Integrity', 'Structural Integrity', 1, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(10, 2, 1, 'Structural Integrity', 'Structural Integrity', 1, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(11, 2, 1, 'Process Containment', 'Process Containment', 2, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(12, 2, 1, 'Ignition Control', 'Ignition Control', 3, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(13, 2, 2, 'Detection Systems', 'Detection Systems', 1, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(14, 2, 3, 'Shutdown Systems', 'Shutdown Systems', 1, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(15, 2, 4, 'Protection Systems', 'Protection Systems', 1, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(16, 2, 5, 'Emergency Response', 'Emergency Response', 1, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null),
	(17, 2, 5, 'Lifesaving', 'Lifesaving', 2, '2017-09-20 12:34:11', '2017-09-20 12:34:11', 1, sysdate(), null);

-- Dumping data for table barrier.facility: ~22 rows (approximately)
/*!40000 ALTER TABLE `barrier`.`facility` DISABLE KEYS */;
INSERT INTO `barrier`.`facility` (`id`, `code`, `asset_id`, `name`, `category`, `created_at`, `updated_at`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(-1, 'UNK', -1, 'Unknown', 'Unknown', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(1, 'BRT1', 1, 'Rivers Terminal', 'Onshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(2, 'G310', 1, 'DPPA', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(3, 'MAP1', 1, 'Accommodation Platform', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(4, 'MBTF', 1, 'Condensate Tank Farm', 'Onshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(5, 'MCP1', 1, 'Central Processing Platform', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(6, 'MDP1', 1, 'DP1', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(7, 'MDP3', 1, 'DP3', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(8, 'MDP4', 1, 'DP4', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(9, 'MDP6', 1, 'DP6', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(10, 'MDP8', 1, 'DP8', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(11, 'MNT1', 1, 'North Terminal', 'Onshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(12, 'MST1', 1, 'South Terminal', 'Onshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(13, 'CHIS', 2, 'Chiswick - Platform (unmanned)', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(14, 'F3FA', 2, 'F3FA - Platform (unmanned)', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(15, 'GROV', 2, 'Grove - Platform (unmanned)', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(16, 'GROW', 2, 'Grove West - Sub Sea Development', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(17, 'MJ6A', 2, 'MJ6A - Platform (manned)', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(18, 'MKEW', 2, 'KEW - Sub Sea Development', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(19, 'MST1', 2, 'ST1 - Platform (unmanned)', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(20, 'STAM', 2, 'Stamford - Sub Sea Development', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(21, 'WIND', 2, 'Windermere - Platform (unmanned)', 'Offshore', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null);
/*!40000 ALTER TABLE `barrier`.`facility` ENABLE KEYS */;

-- Dumping data for table barrier.performance_standard: ~43 rows (approximately)
/*!40000 ALTER TABLE `barrier`.`performance_standard` DISABLE KEYS */;
INSERT INTO `barrier`.`performance_standard` (`id`, `code`, `asset_id`, `barrier_type_id`, `description`, `created_at`, `updated_at`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(-3, 'UNK', 1, -2, 'Unknown', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(-2, 'UNK', 2, -3, 'Unknown', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(-1, 'UNK', -1, -1, 'Unknown', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(2, 'PSa020', 1, 2, 'HVAC', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(3, 'PSa030', 1, 2, 'Control of Ignition ', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(4, 'PSa031', 1, 3, 'Emergency and Escape Lighting', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(5, 'PSa040', 1, 3, 'Emergency Communications', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(6, 'PSa050', 1, 4, 'Passive Fire Protectio', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(7, 'PSa060', 1, 4, 'Active Fire Protectio', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(8, 'PSa061', 1, 3, 'Portable and Mobile Fire Fighting Equipment', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(9, 'PSa070', 1, 3, 'Escape Routes, Muster and Embarkatio', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(10, 'PSa090', 1, 5, 'TEMPSC', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(11, 'PSa100', 1, 5, 'Helicopter & Helideck Facilities', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(12, 'PSa110', 1, 5, 'Rescue Facilities ERRV', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(13, 'PSa120', 1, 5, 'Life Saving Appliances', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(14, 'PSa130', 1, 5, 'Means of Escape', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(15, 'PSb011', 1, 6, 'Emergency Shutdow', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(16, 'PSb012', 1, 6, 'Blowdown, Vent and Purge', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(17, 'PSb013', 1, 7, 'Overpressure Protectio', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(18, 'PSb020', 1, 8, 'Fire & Gas Detectio', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(19, 'PSb030', 1, 7, 'Pressure Boundary-1', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(20, 'PSb040', 1, 7, 'Pressure Boundary-2', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(21, 'PSb050', 1, 7, 'Pressure Boundary-3 ', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(22, 'PSb060', 1, 3, 'Emergency Power UPS', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(23, 'PSb070', 1, 7, 'Rotating Equipment', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(24, 'PSc010', 1, 9, 'Structures', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(25, 'PSc011', 1, 9, 'Temporary Equipment (Well Intervention Gantry)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(26, 'PSc020', 1, 9, 'Marine-Navigation Aids', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(27, 'PSc030', 1, 9, 'Heavy Lifting Equipment ', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(28, 'PSc040', 1, 3, 'Hazardous Open Drains', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(29, 'SECE12', 2, 10, 'Structural Integrity', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(30, 'SECE01', 2, 11, 'Hydrocarbon Containment', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(31, 'SECE15', 2, 11, 'Platform Crane', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(32, 'SECE03', 2, 12, 'Control of Ignition sources', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(33, 'SECE07', 2, 12, 'Heating & Ventilation', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(34, 'SECE04', 2, 13, 'Fire & Gas detection', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(35, 'SECE02', 2, 14, 'Emergency Shutdown System (ESD) & Blowdown', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(36, 'SECE05', 2, 15, 'Active Fire protection (AFP)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(37, 'SECE06', 2, 15, 'Passive Fire protection (PFP)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(38, 'SECE11', 2, 15, 'Collision Warning and Detection', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(39, 'SECE09', 2, 16, 'Alarm & Communication', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(40, 'SECE10', 2, 16, 'UPS System', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(41, 'SECE13', 2, 16, 'Temporary Refuge', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(42, 'SECE08', 2, 17, 'Escape, Rescue & Recovery, PPE & Life Saving Appliances', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(43, 'SECE14', 2, 17, 'Helideck Facilities', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null);
/*!40000 ALTER TABLE `barrier`.`performance_standard` ENABLE KEYS */;

INSERT INTO `barrier`.`performance_standard_mapping` ( `code`, `asset_id`,`ps_id`,`description`,`created_at`,`updated_at`, `current_flag`, `start_dt`, `end_dt`)
SELECT `code`, `asset_id`,`ps_id`,`description`,`created_at`,`updated_at`, 1 , sysdate(), null
FROM `barrier`.`vw_performance_standard_mapping`;

-- Dumping data for table barrier.planner_group: ~27 rows (approximately)
/*!40000 ALTER TABLE `barrier`.`planner_group` DISABLE KEYS */;
INSERT INTO `barrier`.`planner_group` (`id`, `code`, `asset_id`, `description`, `created_at`, `updated_at`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(-1, 'UNK', -1, 'Unknown', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(1, 'COA', 1, 'Construction Anomalies', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(2, 'ELE', 1, 'Electrical', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(3, 'FMA', 1, 'FM Anomalies', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(4, 'INS', 1, 'Instrument', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(5, 'MEC', 1, 'Mechanical', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(6, 'PDN', 1, 'Production', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(7, 'PPM', 1, 'Preventive Maintenance', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(8, 'QAC', 1, 'QA/QC', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(9, 'REF', 1, 'Refurbishment', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(10, 'TEL', 1, 'Telecoms', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(11, 'TRD', 1, 'Support Trades', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(12, 'AIE', 2, 'Asset Integrity En', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(13, 'CON', 2, 'Configuration Chng', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(14, 'ELE', 2, 'Electrical (Off Sh)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(15, 'ENG', 2, 'Engineering', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(16, 'FMS', 2, 'Fiscal Metering', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(17, 'INS', 2, 'Instrument (Off Sh)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(18, 'MAS', 2, 'Master Data Change', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(19, 'MEC', 2, 'Mechanical (Off Sh)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(20, 'NEL', 2, 'Electrical (On Sh)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(21, 'NIN', 2, 'Instrument (On Sh)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(22, 'NMC', 2, 'Mechanocal (On Sh)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(23, 'NPD', 2, 'Production (On Sh)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(24, 'PDN', 2, 'Production (Off Sh)', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(25, 'QAC', 2, 'QA/QC Activities', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null),
	(26, 'REF', 2, 'Refurbishment', '2017-09-19 09:09:55', '2017-09-19 09:09:55', 1, sysdate(), null);
/*!40000 ALTER TABLE `barrier`.`planner_group` ENABLE KEYS */;


/*!40000 ALTER TABLE `barrier`.`facility_rule_set` DISABLE KEYS */;
INSERT INTO `barrier`.`facility_rule_set` (`barrier_id`,`version_no`, `barrier_metric_id`, `amber_start`, `amber_end`, `updated_by`, `current_flag`, `start_dt`, `end_dt`) VALUES
	(1, 1, 1, 2, 5, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(1, 1, 2, 2, 5, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(1, 1, 3, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(1, 1, 4, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(2, 1, 1, 6, 10, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(2, 1, 2, 6, 10, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(2, 1, 3, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(2, 1, 4, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(3, 1, 1, 6, 10, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(3, 1, 2, 6, 10, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(3, 1, 3, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(3, 1, 4, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(4, 1, 1, 6, 10, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(4, 1, 2, 6, 10, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(4, 1, 3, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(4, 1, 4, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(5, 1, 1, 6, 10, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(5, 1, 2, 6, 10, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(5, 1, 3, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(5, 1, 4, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),

	(1, 1, 5, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(1, 1, 6, 30, 90, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(1, 1, 7, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(1, 1, 8, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(1, 1, 9, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(1, 1, 10, 1, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL);
/*!40000 ALTER TABLE `barrier`.`facility_rule_set` ENABLE KEYS */;

/*!40000 ALTER TABLE `barrier`.`asset_rule_set` DISABLE KEYS */;
INSERT INTO `barrier`.`asset_rule_set` (`barrier_id`, `amber_start`, `amber_end`, `version_no`, `updated_by`,`current_flag`, `start_dt`, `end_dt`) VALUES
	(1, 0, 0, 1, 'SYSTEM', 1, '2017-09-20 14:33:23', NULL),
	(2, 0, 0, 1, 'SYSTEM', 1, '2017-09-20 14:43:29', NULL),
	(3, 0, 0, 1, 'SYSTEM', 1, '2017-09-20 14:45:41', NULL),
	(4, 0, 0, 1, 'SYSTEM', 1, '2017-09-20 14:47:20', NULL),
	(5, 0, 0, 1, 'SYSTEM', 1, '2017-09-20 14:37:36', NULL);
/*!40000 ALTER TABLE `barrier`.`asset_rule_set` ENABLE KEYS */;



TRUNCATE TABLE `barrier`.`sap_work_order_data`;

INSERT INTO `barrier`.`sap_work_order_data`

SELECT  `sap`.`barrier_element`
        ,`sap`.`functional_location`
		, COALESCE(`asset`.`id`,-1) `asset_id`
		, COALESCE(`facility`.`id`,-1) `facility_id`
		, COALESCE(`ps`.`id`,-1) `performance_standard_id`
		, COALESCE(`pg`.`id`,-1) `planner_group_id`
		, COALESCE(`abc`.`id`, -1) `abc_indicator_id`
		, CASE
					WHEN `sap`.`order_type` = 'UM02'
					AND `sap`.`deferred` = 'Y'
					AND `sap`.`latest_allowable_finish_date` >= @the_date
					THEN 'Deferred Reactive'

					WHEN `sap`.`order_type` = 'UM01'
					AND `sap`.`deferred` = 'Y'
					AND `sap`.`latest_allowable_finish_date` >= @the_date
					THEN 'Deferred Preventative'

					WHEN `sap`.`order_type` = 'UM02'
					AND `sap`.`latest_allowable_finish_date` < @the_date
					THEN 'Backlog Reactive'

					WHEN `sap`.`order_type` = 'UM01'
					AND `sap`.`latest_allowable_finish_date` < @the_date
					THEN 'Backlog Preventative'

					ELSE 'Incorrect Assignment'
			  END AS 'barrier_metrics'
		,`sap`.`work_order_number`
		,`sap`.`work_order_description`
		,`sap`.`order_type`
		,`sap`.`user_status`
		,`sap`.`awaiting_deferrment`
		,`sap`.`deferred`
		,`sap`.`work_centre`
		,`sap`.`latest_allowable_finish_date`
		,`sap`.`maint_activ_type`
		, sysdate()
		, sysdate()
FROM `barrier_ods`.`vw_merged_sap_data` `sap`
LEFT JOIN `barrier`.`asset` `asset`
ON `sap`.`maintenance_plant_code` = `asset`.`code`
LEFT JOIN `barrier`.`facility` `facility`
ON `sap`.`functional_location_code` = `facility`.`code` AND `facility`.`asset_id` = `asset`.`id`
LEFT JOIN `barrier`.`performance_standard_mapping` `ps_mapping`
ON `sap`.`functional_location` = `ps_mapping`.`code`
AND `ps_mapping`.`asset_id` = `asset`.`id`
LEFT JOIN `barrier`.`performance_standard` `ps`
ON `ps_mapping`.`ps_id` = `ps`.`id` AND `ps_mapping`.`asset_id` = `ps`.`asset_id`
LEFT JOIN `barrier`.`planner_group` `pg`
ON `sap`.`planner_group` = `pg`.`code` AND `pg`.`asset_id` = `asset`.`id`
LEFT JOIN `barrier`.`abc_indicator` `abc`
ON `sap`.`abc_field` = `abc`.`code` AND `abc`.`asset_id` = `asset`.`id`;


INSERT INTO `barrier`.`facility_level_data`
			(
			  snapshot_date
			, facility_id
			, barrier_type_id
			, barrier_metric_id
			, count_of_data
			, rag_status
			, created_at
			, updated_at
			)
select    @snapshot_date
        , a.facility_id
		, a.barrier_type_id
		, a.barrier_metric_id
		, a.count_of_data
		, CASE
			WHEN ISNULL(d.amber_start) OR ISNULL(d.amber_end) THEN NULL
			WHEN a.count_of_data < d.amber_start THEN 'G'
			WHEN a.count_of_data > d.amber_end THEN 'R'
			ELSE 'A'
		  END `rag_status`
		, SYSDATE()
		, SYSDATE()
from vw_facility_level_data `a`
left join `barrier`.`barrier_type` `c`
on `a`.`barrier_type_id` = c.id
left join facility_rule_set `d`
on c.barrier_id = d.barrier_id and a.barrier_metric_id = d.barrier_metric_id
and `d`.`current_flag` = 1;

INSERT INTO `barrier`.`asset_level_data`
SELECT     @snapshot_date
         , `facility_id`
		 , `barrier_type_id`
		 , `count_of_data`
		 , CASE
		 		WHEN `red_count` > `rs`.`amber_end` THEN 'R'
		 		WHEN `amber_count` >= `rs`.`amber_start` THEN 'A'
		 		ELSE 'G'
		 	END `rag_status`
		 , red_count
		 , amber_count
		 , green_count
		 , SYSDATE()
		 , SYSDATE()
FROM `barrier`.`vw_asset_level_data` `data`
INNER JOIN `barrier`.`barrier_type` `bt`
ON `data`.`barrier_type_id` = `bt`.`id`
INNER JOIN `barrier`.`asset_rule_set` `rs`
ON `bt`.`barrier_id` = `rs`.`barrier_id`
AND `rs`.`current_flag` = 1;

INSERT INTO `barrier`.`work_order_level_data` (
          snapshot_date
 		, `barrier_element_id`
 		, `functional_location`
		, `facility_id`
		, `barrier_type_id`
		, `barrier_metric_id`
		, `rag_status`
		, `planner_group_id`
		, `abc_indicator_id`
		, `work_order_number`
		, `work_order_description`
		, `order_type`
		, `user_status`
		, `awaiting_deferment`
		, `deferred`
		, `work_centre`
		, `latest_allowable_finish_date`
		,`maint_activ_type`
		, created_at
		, updated_at

)
select  @snapshot_date
        , `metric`.`barrier_element_id`
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
		, sysdate()
		, sysdate()
from `barrier`.sap_work_order_data `data`
left join `barrier`.barrier_metric `metric`
on `data`.barrier_metrics = metric.name
left join `barrier`.performance_standard ps
on `data`.performance_standard_id = ps.id
inner join `barrier`.facility_level_data `fac`
on `data`.facility_id = fac.facility_id
and `metric`.id = fac.barrier_metric_id
and `ps`.barrier_type_id = fac.barrier_type_id;

/*!40000 ALTER TABLE `barrier`.`role` DISABLE KEYS */;
INSERT INTO `barrier`.`role` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
	(3, 'Super User', 'Super User', '2017-09-29 10:26:25', '2017-09-29 10:26:25'),
	(2, 'Data User', 'Data User', '2017-09-29 10:26:25', '2017-09-29 10:26:25'),
	(1, 'Standard User', 'Standard User',  '2017-09-29 10:26:25', '2017-09-29 10:26:25');
/*!40000 ALTER TABLE `barrier`.`role` ENABLE KEYS */;

-- Dumping data for table barrier.user: ~0 rows (approximately)
/*!40000 ALTER TABLE `barrier`.`user` DISABLE KEYS */;
INSERT INTO `barrier`.`user` (`id`, `business_unit_id`, `first_name`, `last_name`, `username`, `email`, `password`, `salt`, `last_login`, `status`, `created_at`, `updated_at`, `role_id`) VALUES
	(1, 1, 'Super', 'User', 'superuser', 'dewifelstead@btinternet.com', '5ad2f9e87c344ea8873b848f6ccc9dcab4829df5', 'f79b6d731bea8caae4a8b1b9d8970875d77cb194f99c816c244a9b7b2f2f8c05', NULL, 'active', '2017-09-29 10:26:25', '2017-09-29 10:26:25', 3),
	(2, 1, 'Data', 'User', 'datauser', 'dewifelstead@btinternet.com', 'e09c5d3b3f5c471603b0809a25bea76be6cbe197', '728ee4843c015724d71e468b32412ee39cf15543153467c38f9818a463acef0f', NULL, 'active', '2017-09-29 10:26:25', '2017-09-29 10:26:25', 2),
	(3, 1, 'Standard', 'User', 'standarduser', 'dewifelstead@btinternet.com', 'd7dd241731cfd861b2b70ed9f3cb45b77a420629', '78dc3a7dec9a8a0047dc2e0c1794c83e357a71cfeb3b12079f94bc34eabe37ea', NULL, 'active', '2017-09-29 10:26:25', '2017-09-29 10:26:25', 1);
/*!40000 ALTER TABLE `barrier`.`user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;



-- Fictional Safewell and ORA data for demo - NOT NEEDED FOR PRODUCTION

INSERT INTO `facility_level_data` (`snapshot_date`, `facility_id`, `barrier_type_id`, `barrier_metric_id`, `count_of_data`, `rag_status`, `created_at`, `updated_at`) VALUES
    ('2017-10-27 05:46:02', 17, -3, 11, 1, NULL, '2017-10-27 05:54:18', '2017-10-27 05:54:19'),
	('2017-10-23 13:07:56', 17, 11, 5, 1, 'A', '2017-10-23 13:10:59', '2017-10-23 13:11:00');

INSERT INTO `work_order_level_data` (`snapshot_date`, `work_order_number`, `functional_location`, `facility_id`, `barrier_element_id`, `barrier_type_id`, `barrier_metric_id`, `rag_status`, `planner_group_id`, `abc_indicator_id`, `work_order_description`, `order_type`, `user_status`, `awaiting_deferment`, `deferred`, `work_centre`, `latest_allowable_finish_date`, `maint_activ_type`, `created_at`, `updated_at`) VALUES
	('2017-10-23 13:07:56', '99999999', 'NM01-XXX-XXXX', 17, 2, 11, 5, 'A', -1, -1, 'Sample Safewell Drill-down', 'XXXX', 'USER STATUS', 'N', 'N', 'XX', '2017-10-24 09:51:42', 'XXX', '2017-10-24 09:51:50', '2017-10-24 09:51:51'),
	('2017-10-23 13:07:56', '99999998', 'NM01-XXX-XXXY', 17, 3, -3, 11, '', -1, -1, 'Sample ORA Drill-down', 'XXXY', 'USER STATUS', 'N', 'N', 'XX', '2017-10-24 09:51:42', 'XXY', '2017-10-24 09:51:50', '2017-10-24 09:51:51');