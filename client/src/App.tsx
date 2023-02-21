
import './App.css';
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

import HomePageAdmin from './components/pages/HomePages/HomePage-Admin';
import HomePageParent from './components/pages/HomePages/HomePage-Parent';
import HomePagePrincipal from './components/pages/HomePages/HomePage-Principal';
import HomePageStudent from './components/pages/HomePages/HomePage-Student';
import HomePage from './components/pages/HomePages/HomePage-Student';
import HomePageTeacher from './components/pages/HomePages/HomePage-Teacher';
import UserProfile from './components/pages/UserProfile';
import SideBar from './components/ui/templates/SideBar/SideBar-Student';
import UsersDetails from './components/pages/UsersDetails';
import UserRequests from './components/pages/UsersRequests';
import UserRequest from './components/pages/UserRequest';
import UserProfileAdminView from './components/pages/UserProfileAdminView';
import UsersDetailsAdminView from './components/pages/UsersDetailsAdminView';
<<<<<<< HEAD
=======
import TimeTable from './components/pages/TimeTable/TimeTable';
import TimeTableAdmin from './components/pages/TimeTable/TimeTableAdmin';
>>>>>>> chinthana



function App() {
  return (
    <Router>
      <Routes>
        <Route
        path='/:userid'
        element={
          <UserProfile/> 
        }
       />
        <Route
        path='/UsersDetails'
        element={
          <UsersDetails/>
        }
       />
          <Route
        path='/HomePageStudent'
        element={
          <HomePageStudent/>
        }
       />
        <Route
        path='/HomePageTeacher'
        element={
          <HomePageTeacher/>
        }
       />
        <Route
        path='/HomePagePrincipal'
        element={
          <HomePagePrincipal/>
        }
       />
           <Route
        path='/HomePageParent'
        element={
          <HomePageParent/>
        }
       />


        <Route
        path='/'
        element={
          
          <HomePageAdmin/>
        }
       />

      <Route
        path='/UsersRequests'
        element={
          <UserRequests/>
        }
       />

      <Route
        path='/UserRequest/:userid'
        element={
          <UserRequest/>
        }
       />

      <Route
        path='/UPAdminView/:userid'
        element={
          <UserProfileAdminView/>
        }
       />

      <Route
        path='/UDAdminView'
        element={
          <UsersDetailsAdminView/>
        }
       />
<<<<<<< HEAD
=======

      <Route
        path='/timetableAdmin/:classId'
        element={
          <TimeTableAdmin/>
        }
       />

       <Route
        path='/timetable/:classId'
        element={
          <TimeTable/>
        }
       />
       
>>>>>>> chinthana
      </Routes>
    </Router>
  );
}

export default App;