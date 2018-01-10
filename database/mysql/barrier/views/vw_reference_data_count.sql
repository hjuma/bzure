USE [barrier]
GO

CREATE OR ALTER VIEW [dbo].[vw_reference_data_count] AS (SELECT 'asset' AS table_name,COUNT(*) AS COUNT FROM asset
UNION ALL
SELECT 'facility',COUNT(*) FROM [dbo].[facility]
UNION ALL
SELECT 'barrier',COUNT(*) FROM [dbo].[barrier]
UNION ALL
SELECT 'barrier_type',COUNT(*) FROM [dbo].[barrier_type]
UNION ALL
SELECT 'barrier_element',COUNT(*) FROM [dbo].[barrier_element]
UNION ALL
SELECT 'performance_standard',COUNT(*) FROM [dbo].[performance_standard]
UNION ALL
SELECT 'performance_standard_mapping',COUNT(*) FROM [dbo].[performance_standard_mapping] )
GO