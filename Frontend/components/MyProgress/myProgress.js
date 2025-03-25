// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const MyProgress = ({ userId }) => {
//   const [progressData, setProgressData] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user



// useEffect(() => {
//     const fetchProgressData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5057/api/ProgressTrackings/user/${user.userId}`);
//         const data = await response.json();
//         const formattedData = data.map(item => ({
//           date: new Date(item.checkingDate).toLocaleDateString(),
//           weightKG: item.weightKG,
//           bodyFatPercentage: item.bodyFatPercentage
//         }));
//         setProgressData(formattedData);
//       } catch (error) {
//         console.error("Error fetching progress data:", error);
//       }
//     };

//     fetchProgressData();
//   }, [user.userId]); // ✅ Dependency array includes user.userId

//   return (
//     <div>
//       <h2>User Progress</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="weightKG" stroke="#8884d8" name="Weight (KG)" />
//           <Line type="monotone" dataKey="bodyFatPercentage" stroke="#82ca9d" name="Body Fat (%)" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default MyProgress;









// import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from "recharts";

// const MyProgress = () => {
//   const [progressData, setProgressData] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

//   useEffect(() => {
//     const fetchProgressData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5057/api/ProgressTrackings/user/${user.userId}`);
//         const data = await response.json();

//         // Sort data by date (latest first) and format it for table & chart
//         const formattedData = data.sort((a, b) => new Date(b.checkingDate) - new Date(a.checkingDate)).map(item => ({
//           date: new Date(item.checkingDate).toLocaleDateString(),
//           weightKG: item.weightKG,
//           bodyFatPercentage: item.bodyFatPercentage
//         }));

//         setProgressData(formattedData);
//       } catch (error) {
//         console.error("Error fetching progress data:", error);
//       }
//     };

//     fetchProgressData();
//   }, [user.userId]);

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">User Progress</h2>

//       {/* Chart for Weight & Body Fat % */}
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="weightKG" stroke="#8884d8" name="Weight (KG)" />
//           <Line type="monotone" dataKey="bodyFatPercentage" stroke="#82ca9d" name="Body Fat (%)" />
//         </LineChart>
//       </ResponsiveContainer>

//       {/* Daily Progress Table */}
//       <h3 className="mt-4">Daily Progress Comparison</h3>
//       {progressData.length === 0 ? (
//         <p className="text-center text-danger">No progress records found.</p>
//       ) : (
//         <Table striped bordered hover className="mt-3">
//           <thead className="table-dark">
//             <tr>
//               <th>Date</th>
//               <th>Weight (KG)</th>
//               <th>Body Fat %</th>
//               <th>Weight Change (KG)</th>
//               <th>Body Fat Change (%)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {progressData.map((entry, index) => {
//               const prevEntry = progressData[index + 1]; // Get previous day's record
//               const weightChange = prevEntry ? (entry.weightKG - prevEntry.weightKG).toFixed(1) : "-";
//               const fatChange = prevEntry ? (entry.bodyFatPercentage - prevEntry.bodyFatPercentage).toFixed(1) : "-";

//               return (
//                 <tr key={entry.date}>
//                   <td>{entry.date}</td>
//                   <td>{entry.weightKG} KG</td>
//                   <td>{entry.bodyFatPercentage} %</td>
//                   <td className={weightChange > 0 ? "text-danger" : "text-success"}>
//                     {weightChange > 0 ? `+${weightChange}` : weightChange}
//                   </td>
//                   <td className={fatChange > 0 ? "text-danger" : "text-success"}>
//                     {fatChange > 0 ? `+${fatChange}` : fatChange}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default MyProgress;






import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MyProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5057/api/ProgressTrackings/user/${user.userId}`
        );
        console.log(response.data)
        const data = await response.json();

        const heightFeet = user.height; // Fetch height from user details
        //const heightM = heightCM / 100; // Convert height to meters
        const heightM = heightFeet * 0.3048;
        const formattedData = data.map((item) => {
            const bmi = (item.weightKG / Math.pow(heightM, 2)).toFixed(2);
          //const bmi = (item.weightKG / (heightM * heightM)).toFixed(2); // Calculate BMI
          return {
            date: new Date(item.checkingDate).toLocaleDateString(),
            weightKG: item.weightKG,
            bodyFatPercentage: item.bodyFatPercentage,
            bmi: parseFloat(bmi), // Convert to number for chart
          };
        });

        setProgressData(formattedData);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgressData();
  }, [user.userId]);
  const name = user.fullName;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4 mb-5 bg-light">
        <h2 className="text-center mb-4 text-primary fw-bold">{name}'s Progress</h2>
  
        {/* 📊 Chart with border and padding */}
        <div className="p-3 border rounded-3 bg-white mb-4 shadow-sm">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={progressData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="weightKG"
                stroke="#4a77d4"
                strokeWidth={3}
                name="Weight (KG)"
              />
              <Line
                type="monotone"
                dataKey="bodyFatPercentage"
                stroke="#2fc18c"
                strokeWidth={3}
                name="Body Fat (%)"
              />
              <Line
                type="monotone"
                dataKey="bmi"
                stroke="#ff9933"
                strokeWidth={3}
                name="BMI"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* 📅 Table Section */}
        <div className="table-responsive">
          <Table striped bordered hover className="shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>Date</th>
                <th>Weight (KG)</th>
                <th>Body Fat %</th>
                <th>BMI</th>
              </tr>
            </thead>
            <tbody>
              {progressData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-danger fw-semibold">
                    No progress records found.
                  </td>
                </tr>
              ) : (
                progressData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.weightKG}</td>
                    <td>{item.bodyFatPercentage}</td>
                    <td>{item.bmi}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
  
};

export default MyProgress;
