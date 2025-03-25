// import React, { useState, useEffect } from 'react'; 

// const UserProfile = () => {
//     const [user, setUser] = useState({
//         FullName: '',
//         Email: '',
//         Gender: '',
//         Height: 0,
//         Weight: 0
//     });

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem('user'));
//         if (storedUser) setUser(storedUser);
//     }, []);

//     return (
//         <div className="container mt-5">
//             <h2 className="mb-4 text-center">My Profile</h2>

//             <div className="card p-4 shadow-lg">
//                 <div className="mb-3">
//                     <label className="form-label">Full Name</label>
//                     <input type="text" className="form-control" value={user.FullName} disabled />
//                 </div>
                
//                 <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input type="email" className="form-control" value={user.Email} disabled />
//                 </div>

//                 <div className="mb-3">
//                     <label className="form-label">Gender</label>
//                     <input type="text" className="form-control" value={user.Gender} disabled />
//                 </div>

//                 <div className="mb-3">
//                     <label className="form-label">Height (cm)</label>
//                     <input type="number" className="form-control" value={user.Height} disabled />
//                 </div>

//                 <div className="mb-3">
//                     <label className="form-label">Weight (kg)</label>
//                     <input type="number" className="form-control" value={user.Weight} disabled />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    if (!user) {
        return <h2 className="text-center">No user data found. Please log in.</h2>;
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card p-5 shadow-lg rounded-4 bg-light" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 className="mb-4 text-center text-primary fw-bold">My Profile</h2>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between border-bottom pb-3">
                <strong>Full Name:
                <span className="  text-dark px-3 py-2 ">{user.fullName}</span></strong>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-3">
                <strong>Email:
                <span className="text-dark px-3 py-2 ">{user.email}</span> </strong>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-3">
                <strong>Gender:
                <span className=" text-dark px-3 py-2 ">{user.gender}</span></strong>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-3">
                <strong>Height:
                <span className=" text-dark px-3 py-2 ">{user.height} ft</span></strong>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Weight:
                <span className=" text-dark px-3 py-2 ">{user.weight} kg</span></strong>
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default UserProfile;
