
import { Link,useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === "/" || location.pathname === "/signup"; // Hide on login page and signup page

    const navigate=useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove user data
        navigate("/"); // Redirect to login page
    };

    if (hideNavbar) return null;
    
     return (
        <>
          <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow">
            <div className="container">
              <Link className="navbar-brand fw-bold fs-4" to="/about">
                Fitness Tracker
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
      
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-profile">
                      User Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/workouts">
                      Workout Details
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-workout">
                      Add Workout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-progress">
                      Add Progress
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/myprogress">
                      Progress Tracking
                    </Link>
                  </li>
                </ul>
                <button
                  className=" btn btn-danger ms-auto"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </>
      );
      
}

export default Menu;