import React, { useState, useEffect } from "react";
import axios from "axios";
import {  Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AddWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    workoutType: "",
    durationMinutes: "",
    caloriesBurned: "",
    workoutDate: "",
  });

  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5057/api/UserWorkouts/user/${user.userId}`)
        .then((response) => setWorkouts(response.data))
        .catch((error) => console.error("Error fetching workouts:", error));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newWorkout.workoutType || !newWorkout.durationMinutes || !newWorkout.caloriesBurned || !newWorkout.workoutDate) {
      alert("All fields are required!");
      return;
    }

    const workoutData = {
      userId: user.userId,
      ...newWorkout,
      durationMinutes: parseInt(newWorkout.durationMinutes),
      caloriesBurned: parseInt(newWorkout.caloriesBurned),
      workoutDate: new Date(newWorkout.workoutDate).toISOString(),
    };

    axios
      .post("http://localhost:5057/api/UserWorkouts", workoutData)
      .then(() => {
        alert("Workout added successfully!");
        setNewWorkout({ workoutType: "", durationMinutes: "", caloriesBurned: "", workoutDate: "" });
        setWorkouts([...workouts, workoutData]); // Update UI instantly
      })
      .catch((error) => console.error("Error adding workout:", error));
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 rounded-4 bg-light" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Add Workout</h2>
  
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Label className="fw-semibold">Workout Type</Form.Label>
            <Form.Select
              name="workoutType"
              value={newWorkout.workoutType}
              onChange={handleInputChange}
              required
              className="shadow-sm"
            >
              <option value="">Select Workout Type</option>
              <option value="Cardio">Cardio</option>
              <option value="Strengthening">Strengthening</option>
              <option value="Yoga">Yoga</option>
            </Form.Select>
          </Form.Group>
  
          <Form.Group>
            <Form.Label className="fw-semibold">Duration (mins)</Form.Label>
            <Form.Control
              type="number"
              name="durationMinutes"
              value={newWorkout.durationMinutes}
              onChange={handleInputChange}
              placeholder="Enter duration in minutes"
              className="shadow-sm"
              required
            />
          </Form.Group>
  
          <Form.Group>
            <Form.Label className="fw-semibold">Calories Burned</Form.Label>
            <Form.Control
              type="number"
              name="caloriesBurned"
              value={newWorkout.caloriesBurned}
              onChange={handleInputChange}
              placeholder="Enter calories burned"
              className="shadow-sm"
              required
            />
          </Form.Group>
  
          <Form.Group>
            <Form.Label className="fw-semibold">Workout Date</Form.Label>
            <Form.Control
              type="date"
              name="workoutDate"
              value={newWorkout.workoutDate}
              onChange={handleInputChange}
              className="shadow-sm"
              required
            />
          </Form.Group>
  
          <Button
            variant="primary"
            type="submit"
            className="mt-3 w-100 fw-bold rounded-pill shadow-sm"
          >
            Add Workout
          </Button>
        </Form>
      </div>
    </div>
  );
  
};

export default AddWorkout;
