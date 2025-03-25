import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Admin = () => {
   const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const show = async () => {
   // const token = JSON.parse(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    // const token = "abc";
    //alert("Token From Admin is  " + token);
    alert("User is authenticated")
    const response = await axios.get("http://localhost:5057/api/Protected", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
     setMessage(response.data.message);
   if(response.status===200)
   {
    navigate("/menu")
   }
    
  }
  return (
   
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card p-3 shadow-sm" style={{ width: "300px" }}>
        <div className="card-body text-center">
            <h5 className="card-title">Admin Authentication</h5>
            <button className="btn btn-dark btn-sm mt-3" onClick={show}>Authenticate</button>
            {message && <p className="mt-2 text-danger fw-bold">{message}</p>}
        </div>
    </div>
</div>
  );
};
export default Admin;