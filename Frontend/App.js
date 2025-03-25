
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/menu';
import UserLogin from './components/UserLogin/userLogin';
//import Admin from './components/Admin/admin';
import About from './components/About/about';
import SignUp from './components/Signup/signup';
import UserProfile from './components/UserProfile/userProfile';
import MyWorkouts from './components/MyWorkout/myWorkout';
import AddWorkout from './components/AddWorkout/addworkout';
import MyProgress from './components/MyProgress/myProgress';
import AddProgress from './components/AddProgress/addProgress';
//import SendReport from './components/MailReport/mailReport';
//import { useEffect, useState } from 'react';


function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path='/' element={<UserLogin/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/workouts" element={<MyWorkouts />} />
        <Route path="/add-workout" element={<AddWorkout />} />
        <Route path="/add-progress" element={<AddProgress />} />
        <Route path="/myprogress" element={<MyProgress />} />
        {/* <Route path="/workouts" element={<MyWorkouts userId={loggedInUserId} />} /> */}
        {/* <Route path='/admin' element={<Admin/>}/> */}
        <Route path='/about' element={<About/>}/>
        {/* <Route path='/sendmail' element={<SendReport/>}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
