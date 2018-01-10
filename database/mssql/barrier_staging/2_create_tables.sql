USE [barrier_staging]
GO

CREATE TABLE [dbo].[sap_work_order_data_nm01] (
	[facility_code] [varchar](255) NULL,
    [work_order_number] [int] NULL,
    [functional_location] [varchar](255) NULL,
    [work_order_description] [varchar](255) NULL,
    [order_type] [varchar](255) NULL,
    [planner_group] [varchar](255) NULL,
    [user_status] [varchar](255) NULL,
    [abc_field] [char](255) NULL,
    [work_centre] [varchar](255) NULL,
    [maint_activ_type] [varchar](255) NULL,
    [latest_allowable_finish_date] [varchar](255) NULL,
    [system_status] [varchar](255) NULL
)
GO

CREATE TABLE [dbo].[ora_data](
	[asset] [nvarchar](50) NULL,
	[facility] [nvarchar](50) NULL,
	[id] [int] NOT NULL,
	[type] [nvarchar](80) NULL,
	[status] [nvarchar](50) NOT NULL,
	[title] [nvarchar](100) NULL,
	[ra_number] [nvarchar](50) NULL,
	[description] [nvarchar](1000) NULL,
	[valid_until] [datetime] NULL,
	[extended_date] [datetime] NULL,
	[date_raised] [datetime] NULL,
	[date_modified] [datetime] NULL,
	[raised_by] [nvarchar](50) NULL,
	[location] [nvarchar](50) NULL,
	[hrr] [int] NULL,
	[work_order] [varchar](20) NOT NULL,
	[close_out_detail] [nvarchar](1000) NULL
)
GO

CREATE TABLE [dbo].[ora_facility_mapping] (
	[ora_facility_name] NVARCHAR(50) NOT NULL,
	[barrier_facility_id] INT NOT NULL,
	PRIMARY KEY CLUSTERED (
	[ora_facility_name] ASC,
	[barrier_facility_id] ASC
))
GO

CREATE TABLE [dbo].[safewell_facility_mapping](
	[ora_facility_name] [nvarchar](50) NOT NULL,
	[barrier_facility_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED
(
	[ora_facility_name] ASC,
	[barrier_facility_id] ASC
))
GO

CREATE TABLE [dbo].[safewells_data](
	[asset] [varchar](50) NULL,
	[facility] [nvarchar](50) NULL,
	[functional_location] [nvarchar](50) NULL,
	[current_well_concern_level_text] [varchar](50) NULL,
	[well_type] [varchar](50) NULL,
	[well_status] [nvarchar](50) NULL,
	[wellhead_template] [varchar](250) NULL,
	[barrier_metric] [varchar](49) NOT NULL
)
GO