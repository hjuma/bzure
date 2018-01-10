IF (EXISTS(SELECT TOP 1 1 FROM master..sysdatabases WHERE [name] = 'barrier_staging'))
BEGIN
	PRINT 'Dropping database barrier_staging';
	DROP DATABASE [barrier_staging];
END

PRINT 'Creating database barrier_staging';
CREATE DATABASE [barrier_staging];
GO