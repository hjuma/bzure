-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------
 
CREATE OR REPLACE  VIEW `vw_merged_ps_mapping` AS SELECT
    'EIS' AS 'asset'
  , `floc`
  , `description`
  , CASE WHEN LTRIM(RTRIM(`ps_ref_1`))  = ''
    THEN 'UNK'
      ELSE  COALESCE(`ps_ref_1`, 'UNK')
  END AS 'performance_standard'
FROM `barrier_ods`.`ps_mapping_eis`
WHERE `current_flag` = 1
UNION ALL
SELECT
    'NM01' AS 'asset'
  , `floc`
  , `description`
   , CASE WHEN LTRIM(RTRIM(`new_ps_ref_1`))  = ''
    THEN 'UNK'
      ELSE  COALESCE(`new_ps_ref_1`, 'UNK')
  END AS 'performance_standard'
FROM `barrier_ods`.`ps_mapping_nm01`
WHERE `current_flag` = 1 ;

 