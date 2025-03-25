
create database HealthTrackerDB
go

use HealthTrackerDB
go

DROP TABLE Users;
DROP TABLE UserWorkouts


CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,  
    CreatedAt DATETIME DEFAULT GETDATE(),
    Gender NVARCHAR(10) CHECK (Gender IN ('Male', 'Female', 'Other')) NOT NULL,
    Height DECIMAL(5,2) NOT NULL,  
    Weight DECIMAL(5,2) NOT NULL  
);

INSERT INTO Users (FullName, Email, PasswordHash, Gender, Height, Weight)
VALUES 
('Rohan Kumar', 'rohan@example.com', 'hashed_password', 'Male', 1.75, 80.0),
('Priya Sharma', 'priya@example.com', 'hashed_password', 'Female', 1.60, 55.0),
('Amit Verma', 'amit@example.com', 'hashed_password', 'Male', 1.82, 85.0),
('Neha Gupta', 'neha@example.com', 'hashed_password', 'Female', 1.70, 62.0),
('Vikram Singh', 'vikram@example.com', 'hashed_password', 'Male', 1.78, 77.0);
select * from Users






CREATE TABLE UserWorkouts (
    WorkOutId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    WorkoutType NVARCHAR(20) NOT NULL CHECK (WorkoutType IN ('Cardio', 'Strengthening', 'Yoga')),
    DurationMinutes INT CHECK (DurationMinutes > 0) NOT NULL,
    CaloriesBurned INT CHECK (CaloriesBurned >= 0) NOT NULL,
    WorkoutDate DATETIME DEFAULT GETDATE() NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);
INSERT INTO UserWorkouts (UserId, WorkoutType, DurationMinutes, CaloriesBurned, WorkoutDate)
VALUES 
-- Rohan Kumar's Workouts
(1, 'Cardio', 60, 200, '2025-03-10'),
(1, 'Strengthening', 45, 250, '2025-03-11'),
(1, 'Yoga', 40, 100, '2025-03-12'),
(1, 'Cardio', 50, 220, '2025-03-13'),
(1, 'Strengthening', 55, 280, '2025-03-14'),

-- Priya Sharma's Workouts
(2, 'Yoga', 45, 120, '2025-03-10'),
(2, 'Cardio', 30, 180, '2025-03-11'),
(2, 'Strengthening', 40, 200, '2025-03-12'),
(2, 'Yoga', 50, 140, '2025-03-13'),
(2, 'Cardio', 35, 170, '2025-03-14'),

-- Amit Verma's Workouts
(3, 'Strengthening', 50, 300, '2025-03-10'),
(3, 'Cardio', 40, 220, '2025-03-11'),
(3, 'Yoga', 35, 110, '2025-03-12'),
(3, 'Strengthening', 45, 260, '2025-03-13'),
(3, 'Cardio', 50, 250, '2025-03-14'),

-- Neha Gupta's Workouts
(4, 'Yoga', 60, 150, '2025-03-10'),
(4, 'Strengthening', 50, 240, '2025-03-11'),
(4, 'Cardio', 40, 200, '2025-03-12'),
(4, 'Yoga', 45, 160, '2025-03-13'),
(4, 'Strengthening', 55, 270, '2025-03-14'),

-- Vikram Singh's Workouts
(5, 'Cardio', 50, 220, '2025-03-10'),
(5, 'Yoga', 45, 130, '2025-03-11'),
(5, 'Strengthening', 60, 320, '2025-03-12'),
(5, 'Cardio', 35, 190, '2025-03-13'),
(5, 'Yoga', 40, 120, '2025-03-14');


select * from UserWorkouts
CREATE TABLE ProgressTracking (
    ProgressId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId) ON DELETE CASCADE,
    WeightKG DECIMAL(5,2) NOT NULL,
   
    BodyFatPercentage DECIMAL(5,2) NULL,
    CheckingDate DATETIME DEFAULT GETDATE()
);

INSERT INTO ProgressTracking (UserId, WeightKG, BodyFatPercentage, CheckingDate)
VALUES 
(1, 74.5, 18.0, '2025-03-10'),
(2, 59.5, 22.5, '2025-03-09'),
(3, 80.2, 20.0, '2025-03-08'),
(4, 90.0, 25.5, '2025-03-07'),
(5, 65.3, 19.0, '2025-03-06');
select * from ProgressTracking