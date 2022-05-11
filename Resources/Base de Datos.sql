USE [master]
GO
/****** Object:  Database [BD_SistemaEscolar]    Script Date: 11/05/2022 08:16:12 a. m. ******/
CREATE DATABASE [BD_SistemaEscolar]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BD_SistemaEscola', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\BD_SistemaEscola.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BD_SistemaEscola_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\BD_SistemaEscola_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [BD_SistemaEscolar] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BD_SistemaEscolar].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BD_SistemaEscolar] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET ARITHABORT OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BD_SistemaEscolar] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BD_SistemaEscolar] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BD_SistemaEscolar] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BD_SistemaEscolar] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [BD_SistemaEscolar] SET  MULTI_USER 
GO
ALTER DATABASE [BD_SistemaEscolar] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BD_SistemaEscolar] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BD_SistemaEscolar] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BD_SistemaEscolar] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BD_SistemaEscolar] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BD_SistemaEscolar] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [BD_SistemaEscolar] SET QUERY_STORE = OFF
GO
USE [BD_SistemaEscolar]
GO
/****** Object:  Table [dbo].[coordinators]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[coordinators](
	[userId] [smallint] NOT NULL,
	[coordinatorId] [int] IDENTITY(10000,1) NOT NULL,
	[rfc] [varchar](13) NOT NULL,
	[hiringDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[coordinatorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[course_details]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_details](
	[studentId] [int] NOT NULL,
	[courseId] [int] NOT NULL,
	[WQ_1] [int] NULL,
	[WQ_2] [int] NULL,
	[WQ_3] [int] NULL,
	[OQ_1] [int] NULL,
	[OQ_2] [int] NULL,
	[OQ_3] [int] NULL,
	[CP_1] [int] NULL,
	[CP_2] [int] NULL,
	[CP_3] [int] NULL,
	[final_Project] [int] NULL,
	[final_Grade] [decimal](4, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[studentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[courses]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[courses](
	[crn] [int] IDENTITY(40000,1) NOT NULL,
	[courseName] [varchar](30) NOT NULL,
	[teacherId] [int] NOT NULL,
	[startingDate] [date] NOT NULL,
	[frequencyId] [smallint] NOT NULL,
	[scheduleId] [smallint] NOT NULL,
	[programId] [smallint] NOT NULL,
	[periodId] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[crn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[frequencies]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[frequencies](
	[frequencyId] [smallint] IDENTITY(1,1) NOT NULL,
	[frequency] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[frequencyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[periods]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[periods](
	[periodId] [smallint] IDENTITY(1,1) NOT NULL,
	[period] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[periodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[programs]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[programs](
	[programId] [smallint] IDENTITY(1,1) NOT NULL,
	[program] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[programId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[roleId] [smallint] IDENTITY(1,1) NOT NULL,
	[roleName] [varchar](30) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[roleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[salaries_report]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[salaries_report](
	[teacherId] [int] NOT NULL,
	[taxId] [smallint] NOT NULL,
	[emissionDate] [decimal](4, 2) NOT NULL,
	[total] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[teacherId] ASC,
	[taxId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[schedules]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[schedules](
	[scheduleId] [smallint] IDENTITY(1,1) NOT NULL,
	[startingTime] [time](0) NULL,
	[endingTime] [time](0) NULL,
 CONSTRAINT [PK__schedule__A532EDD44F5A0761] PRIMARY KEY CLUSTERED 
(
	[scheduleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[students]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[students](
	[userId] [smallint] NOT NULL,
	[studentId] [int] IDENTITY(6000,1) NOT NULL,
	[admissionDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[studentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[taxes]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[taxes](
	[taxId] [smallint] IDENTITY(1,1) NOT NULL,
	[taxValue] [decimal](4, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[taxId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[teachers]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[teachers](
	[userId] [smallint] NOT NULL,
	[teacherId] [int] IDENTITY(8000,1) NOT NULL,
	[rfc] [varchar](13) NOT NULL,
	[hiringDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[teacherId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[userId] [smallint] IDENTITY(1,1) NOT NULL,
	[roleId] [smallint] NOT NULL,
	[firstName] [varchar](30) NOT NULL,
	[fatherLastName] [varchar](30) NOT NULL,
	[motherLastName] [varchar](30) NULL,
	[email] [varchar](60) NOT NULL,
	[phoneNumber] [varchar](10) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[photoUrl] [varchar](500) NULL,
 CONSTRAINT [PK__users__CB9A1CFFEA794433] PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[screen_control]    Script Date: 11/05/2022 12:06:57 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[screen_control](
	[roleId] [smallint] NOT NULL,
	[coordinators] [bit] NOT NULL,
	[course_details] [bit] NOT NULL,
	[courses] [bit] NOT NULL,
	[frequencies] [bit] NOT NULL,
	[periods] [bit] NOT NULL,
	[permission] [bit] NOT NULL,
	[programs] [bit] NOT NULL,
	[roles] [bit] NOT NULL,
	[schedules] [bit] NOT NULL,
	[screens] [bit] NOT NULL,
	[students] [bit] NOT NULL,
	[teachers] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[roleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[permission_control]    Script Date: 11/05/2022 12:09:31 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[permission_control](
	[roleId] [smallint] NOT NULL,
	[coordinatorsC] [bit] NOT NULL,
	[coordinatorsD] [bit] NOT NULL,
	[coordinatorsU] [bit] NOT NULL,
	[course_detailsC] [bit] NOT NULL,
	[course_detailsD] [bit] NOT NULL,
	[course_detailsU] [bit] NOT NULL,
	[coursesC] [bit] NOT NULL,
	[coursesD] [bit] NOT NULL,
	[coursesU] [bit] NOT NULL,
	[frequenciesC] [bit] NOT NULL,
	[frequenciesD] [bit] NOT NULL,
	[frequenciesU] [bit] NOT NULL,
	[periodsC] [bit] NOT NULL,
	[periodsD] [bit] NOT NULL,
	[periodsU] [bit] NOT NULL,
	[permissionsU] [bit] NOT NULL,
	[programsC] [bit] NOT NULL,
	[programsD] [bit] NOT NULL,
	[programsU] [bit] NOT NULL,
	[rolesC] [bit] NOT NULL,
	[rolesD] [bit] NOT NULL,
	[schedulesC] [bit] NOT NULL,
	[schedulesD] [bit] NOT NULL,
	[schedulesU] [bit] NOT NULL,
	[screensU] [bit] NOT NULL,
	[studentsC] [bit] NOT NULL,
	[studentsD] [bit] NOT NULL,
	[studentsU] [bit] NOT NULL,
	[teachersC] [bit] NOT NULL,
	[teachersD] [bit] NOT NULL,
	[teachersU] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[roleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0)) FOR [WQ_1]
GO
ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0)) FOR [WQ_2]
GO
ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0)) FOR [WQ_3]
GO
ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0)) FOR [OQ_1]
GO
ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0)) FOR [OQ_2]
GO
ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0)) FOR [OQ_3]
GO
ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0)) FOR [CP_1]
GO
ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0)) FOR [CP_2]
GO
ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0)) FOR [CP_3]
GO
ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0)) FOR [final_Project]
GO
ALTER TABLE [dbo].[course_details] ADD  DEFAULT ((0.0)) FOR [final_Grade]
GO
ALTER TABLE [dbo].[coordinators]  WITH CHECK ADD  CONSTRAINT [FK__coordinat__userI__2B3F6F97] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[coordinators] CHECK CONSTRAINT [FK__coordinat__userI__2B3F6F97]
GO
ALTER TABLE [dbo].[course_details]  WITH CHECK ADD FOREIGN KEY([courseId])
REFERENCES [dbo].[courses] ([crn])
GO
ALTER TABLE [dbo].[course_details]  WITH CHECK ADD FOREIGN KEY([studentId])
REFERENCES [dbo].[students] ([studentId])
GO
ALTER TABLE [dbo].[courses]  WITH CHECK ADD FOREIGN KEY([frequencyId])
REFERENCES [dbo].[frequencies] ([frequencyId])
GO
ALTER TABLE [dbo].[courses]  WITH CHECK ADD FOREIGN KEY([periodId])
REFERENCES [dbo].[periods] ([periodId])
GO
ALTER TABLE [dbo].[courses]  WITH CHECK ADD FOREIGN KEY([programId])
REFERENCES [dbo].[programs] ([programId])
GO
ALTER TABLE [dbo].[courses]  WITH CHECK ADD  CONSTRAINT [FK__courses__schedul__3D5E1FD2] FOREIGN KEY([scheduleId])
REFERENCES [dbo].[schedules] ([scheduleId])
GO
ALTER TABLE [dbo].[courses] CHECK CONSTRAINT [FK__courses__schedul__3D5E1FD2]
GO
ALTER TABLE [dbo].[courses]  WITH CHECK ADD  CONSTRAINT [FK__courses__teacher__3B75D760] FOREIGN KEY([teacherId])
REFERENCES [dbo].[teachers] ([teacherId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[courses] CHECK CONSTRAINT [FK__courses__teacher__3B75D760]
GO
ALTER TABLE [dbo].[salaries_report]  WITH CHECK ADD FOREIGN KEY([taxId])
REFERENCES [dbo].[taxes] ([taxId])
GO
ALTER TABLE [dbo].[salaries_report]  WITH CHECK ADD FOREIGN KEY([teacherId])
REFERENCES [dbo].[teachers] ([teacherId])
GO
ALTER TABLE [dbo].[students]  WITH CHECK ADD  CONSTRAINT [FK__students__userId__2E1BDC42] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[students] CHECK CONSTRAINT [FK__students__userId__2E1BDC42]
GO
ALTER TABLE [dbo].[teachers]  WITH CHECK ADD  CONSTRAINT [FK__teachers__userId__30F848ED] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([userId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[teachers] CHECK CONSTRAINT [FK__teachers__userId__30F848ED]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK__users__roleId__286302EC] FOREIGN KEY([roleId])
REFERENCES [dbo].[roles] ([roleId])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK__users__roleId__286302EC]
GO
ALTER TABLE [dbo].[screen_control]  WITH CHECK ADD FOREIGN KEY([roleId])
REFERENCES [dbo].[roles] ([roleId])
GO
ALTER TABLE [dbo].[permission_control]  WITH CHECK ADD FOREIGN KEY([roleId])
REFERENCES [dbo].[roles] ([roleId])
GO

/****** Object:  StoredProcedure [dbo].[CrearTeacher]    Script Date: 11/05/2022 08:16:12 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[CrearTeacher] @email varchar(50),@rfc varchar(13),@hiringDate DATE
AS
	DECLARE @id smallint=0
	SELECT @id=userId from users WHERE email=@email

	INSERT INTO teachers(userId, rfc,hiringDate) VALUES (@id,@rfc,@hiringDate)
GO


--Código Default 
--Stored Procedure para crear estudiantes
CREATE   PROCEDURE [dbo].[CrearEstudiante] @email varchar(50),@admissionDate DATE
AS
	DECLARE @id smallint=0
	SELECT @id=userId from users WHERE email=@email

	INSERT INTO students(userId,admissionDate) VALUES (@id,@admissionDate)
GO

--Stored Procedure para crear coordinadores
CREATE   PROCEDURE [dbo].[CrearCoordinador] @email varchar(50),@rfc varchar(13),@hiringDate DATE
AS
	DECLARE @id smallint=0
	SELECT @id=userId from users WHERE email=@email

	INSERT INTO coordinators(userId, rfc, hiringDate) VALUES (@id,@rfc,@hiringDate)
GO

--Valores default
INSERT INTO roles(roleName)
VALUES ('Administrator'), ('Coordinator'), ('Teacher'), ('Student')
GO

INSERT INTO users(roleId, email, password, firstName, fatherLastName, motherLastName, phoneNumber)
VALUES (1, 'admin@hh.com', '12345', 'Administrator', 'Harmon', 'Hall', '0000000000')
GO

INSERT INTO users(roleId, email, password, firstName, fatherLastName, motherLastName, phoneNumber)
VALUES (2, 'alejandro@hh.com', '12345', 'Alejandro', 'Barroeta', 'Martínez', '2222222222')
GO

INSERT INTO users(roleId, email, password, firstName, fatherLastName, motherLastName, phoneNumber)
VALUES (3, 'eduardo@hh.com', '12345', 'Eduardo', 'Puón', 'Meraz', '2222222222')
GO

INSERT INTO users(roleId, email, password, firstName, fatherLastName, motherLastName, phoneNumber)
VALUES (4, 'edwin@hh.com', '12345', 'Edwin', 'Lozada', 'Ramos', '2222222222')
GO

EXEC CrearCoordinador 'alejandro@hh.com','BAMA030201Y63','2022-05-11'
GO
EXEC CrearTeacher 'eduardo@hh.com','PUME030201Y63','2022-05-11'
GO
EXEC CrearEstudiante'edwin@hh.com','2022-05-11'
GO

INSERT INTO screen_control VALUES(1,1,1,1,1,1,1,1,1,1,1,1,1)
INSERT INTO permission_control VALUES(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)
GO
INSERT INTO screen_control VALUES(2,0,1,1,1,1,1,1,1,1,1,1,1)
INSERT INTO permission_control VALUES(2,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)
GO
INSERT INTO screen_control VALUES(3,0,1,1,0,0,0,0,0,0,0,1,0)
INSERT INTO permission_control VALUES(3,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
GO
INSERT INTO screen_control VALUES(4,0,0,0,0,0,0,0,0,0,0,0,0)
INSERT INTO permission_control VALUES(4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
GO

USE [master]
GO
ALTER DATABASE [BD_SistemaEscolar] SET  READ_WRITE 
GO
