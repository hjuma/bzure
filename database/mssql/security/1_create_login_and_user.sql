USE [master]
GO

CREATE LOGIN [brmdl] WITH PASSWORD=N'barrier123!', DEFAULT_DATABASE=[barrier], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO


USE [barrier]
GO

CREATE USER [brmdl] FOR LOGIN [brmdl] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [brmdl]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [brmdl]
GO
ALTER ROLE [db_datareader] ADD MEMBER [brmdl]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [brmdl]
GO