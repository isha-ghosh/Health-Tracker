import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const MyWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5057/api/UserWorkouts/user/${user.userId}`)
        .then((response) => {
          setWorkouts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching workouts:", error);
        });
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg rounded-4 p-4 bg-light">
        <h2 className="text-center mb-4 text-primary fw-bold">My Workouts</h2>
        {workouts.length === 0 ? (
          <p className="text-center text-danger fs-5">No workouts found.</p>
        ) : (
          <Table responsive bordered hover className="shadow-sm rounded-3">
            <thead className="table-primary text-center">
              <tr>
                <th>Workout Type</th>
                <th>Duration (mins)</th>
                <th>Calories Burned</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.workOutId} className="text-center align-middle">
                  <td>
                    <span className=" text-dark px-3 py-2 ">
                      {workout.workoutType}
                    </span>
                  </td>
                  <td>{workout.durationMinutes}</td>
                  <td>
                    <span className="badge bg-success-subtle text-dark px-3 py-2 rounded-pill">
                      {workout.caloriesBurned} kcal
                    </span>
                  </td>
                  <td>{new Date(workout.workoutDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
  
};

export default MyWorkouts;
