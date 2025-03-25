import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [newProgress, setNewProgress] = useState({
    weightKG: "",
    bodyFatPercentage: "",
    checkingDate: "",
  });
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5057/api/ProgressTrackings/user/${user.userId}`)
        .then((response) => setProgressData(response.data))
        .catch((error) => console.error("Error fetching progress data:", error));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setNewProgress({ ...newProgress, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProgress.weightKG || !newProgress.bodyFatPercentage || !newProgress.checkingDate) {
      alert("All fields are required!");
      return;
    }

    const progressPayload = {
      userId: user.userId,
      weightKG: parseFloat(newProgress.weightKG),
      bodyFatPercentage: parseFloat(newProgress.bodyFatPercentage),
      checkingDate: new Date(newProgress.checkingDate).toISOString(),
    };

    axios
      .post("http://localhost:5057/api/ProgressTrackings", progressPayload)
      .then(() => {
        setMessage("Progress saved successfully!");
        setNewProgress({ weightKG: "", bodyFatPercentage: "", checkingDate: "" });
        setProgressData([...progressData, progressPayload]); // Update UI instantly
      })
      .catch((error) => {
        console.error("Error saving progress:", error);
        setMessage("Failed to save progress. Try again.");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4 text-primary">Add My Progress</h2>
  
        {message && (
          <div className="alert alert-info text-center fw-semibold">{message}</div>
        )}
  
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Weight (KG)</Form.Label>
            <Form.Control
              type="number"
              name="weightKG"
              placeholder="Enter your current weight"
              value={newProgress.weightKG}
              onChange={handleInputChange}
              required
              className="rounded-3 shadow-sm"
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Body Fat %</Form.Label>
            <Form.Control
              type="number"
              name="bodyFatPercentage"
              placeholder="Enter body fat percentage"
              value={newProgress.bodyFatPercentage}
              onChange={handleInputChange}
              required
              className="rounded-3 shadow-sm"
            />
          </Form.Group>
  
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Date</Form.Label>
            <Form.Control
              type="date"
              name="checkingDate"
              value={newProgress.checkingDate}
              onChange={handleInputChange}
              required
              className="rounded-3 shadow-sm"
            />
          </Form.Group>
  
          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg" className="rounded-3">
              Save Progress
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
  
};

export default AddProgress;

















