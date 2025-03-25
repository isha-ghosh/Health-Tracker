# Health-Tracker
Technology Stack Overview
Frontend: React, Redux, Bootstrap
Backend: ASP.NET Core Web API
Database: MS SQL Server Management Studio 
Authentication: JWT Authentication

DATABASE
MS SQL Server Management Studio
We have three Tables in the HealthTrackerDB.sql
Users (UserId, FullName, Email, PasswordHash, Gender, Height, Weight)
UserWorkouts (WorkOutId, UserId, WorkoutType, DurationMinutes, CaloriesBurned, WorkoutDate)
ProgressTracking (ProgressId, UserId, WeightKG, BodyFatPercentage, CheckingDate)

BACKEND
ASP.NET Core Web API HealthTracker

Frontend 
Login & Signup: Secure authentication using JWT.
User Profile Page: Displays name, email, gender, height, and weight.
Navbar: Navigation to different features.
Workout Details: List of logged workouts.
Add Workout: Form to log new workouts.
Add Progress: Input fields for tracking progress.
Progress Tracking: Graphs and tables displaying progress data.
Logout Option: Securely logs out the user.



 
