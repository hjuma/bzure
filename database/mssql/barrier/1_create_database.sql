IF (EXISTS(SELECT TOP 1 1 FROM master..sysdatabases WHERE [name] = 'barrier'))
BEGIN
	PRINT 'Dropping database barrier';
	DROP DATABASE [barrier];
END

PRINT 'Creating database barrier';
CREATE DATABASE [barrier];
GO