
import './App.css';

import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

import HomePageAdmin from './components/pages/HomePages/HomePage-Admin';
import HomePageParent from './components/pages/HomePages/HomePage-Parent';
import HomePagePrincipal from './components/pages/HomePages/HomePage-Principal';
import HomePageStudent from './components/pages/HomePages/HomePage-Student';
import HomePageTeacher from './components/pages/HomePages/HomePage-Teacher';
import UserProfileAdminView from './components/pages/UserManagement/UserProfileAdminView';
import TimeTable from './components/pages/TimeTable/TimeTable';
import TimeTableAdmin from './components/pages/TimeTable/TimeTableAdmin';
import RemovedUsers from './components/pages/UserManagement/RemovedUsers';
import RemovedUser from './components/pages/UserManagement/RemovedUser';
import DiscussionForuminside from './components/pages/DiscussionForum/DiscussionForumInside';
import DiscussionForums from './components/pages/DiscussionForum/DiscussionForums';
import UserProfile from './components/pages/UserManagement/UserProfile';
import UsersDetails from './components/pages/UserManagement/UsersDetails';
import UserRequest from './components/pages/UserManagement/UserRequest';
import UsersDetailsAdminView from './components/pages/UserManagement/UsersDetailsAdminView';
import UsersRequests from './components/pages/UserManagement/UsersRequests';
import SectionsAdminview from './components/pages/Sections/SectionsAdminView';
import ClassRoomsAdminview from './components/pages/ClassRooms/ClassRoomsAdminView';
import AddStudentsToClass from './components/pages/ClassRooms/AddStudentToClass/AddStudentsToClass';
import AddStudentToClass from './components/pages/ClassRooms/AddStudentToClass/AddStudentToClass';
import SubjectInsideAdminView from './components/pages/Subjects/SubjectInsideAdminView';
import AssignTeacherInCharge1 from './components/pages/ClassRooms/AssignTeacherInCharge/AssignTeacherInCharge1';
import AcademicYearAdmin from './components/pages/Sections/AcademicYearsAdminView';
import ClassRoomInsideAdminview from './components/pages/ClassRooms/ClassRoomInsideAdminView';
import AssignSectionHead1 from './components/pages/Sections/AssignSectionHead.tsx/AssignSectionHead1';
import AssignSectionHead2 from './components/pages/Sections/AssignSectionHead.tsx/AssignSectionHead2';
import AssignSubjectTeacher1 from './components/pages/Subjects/AssignSubjectTeacher/AssignSubjectTeacher1';
import AssignSubjectTeacher2 from './components/pages/Subjects/AssignSubjectTeacher/AssignSubjectTeacher2';
import AssignTeacherInCharge2 from './components/pages/ClassRooms/AssignTeacherInCharge/AssignTeacherInCharge2';
import ClassStudentProfile from './components/pages/ClassRooms/AddStudentToClass/ClassStudentProfile';
import SubjectResults from './components/pages/Subjects/SubjectResults';



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
          <UsersRequests/>
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

      <Route
        path='/RemovedUsers'
        element={
          <RemovedUsers/>
        }
       />

        <Route
        path='/RemovedUser/:userid'
        element={
          <RemovedUser/>
        }
       />

       
        <Route
        path='/Discussions/:classId/:subjectId/:userid'
        element={
          <DiscussionForums/>
        }
       />

        <Route
        path='/Discussion/:classId/:subjectId/:userid/:discussionForumId'
        element={
          <DiscussionForuminside/>
        }
       />

       <Route
        path='/sectionsAdmin'
        element={
          <SectionsAdminview/>
        }
       />

        <Route
        path='/classesAmin/:sectionId/:year'
        element={
          <ClassRoomsAdminview/>
        }
       />

        <Route
        path='/ClassRoomAdmin/:sectionId/:year/:classId'
        element={
          <ClassRoomInsideAdminview/>
        }
       />
       
       <Route
        path='/AddStudents/:sectionId/:year/:classId'
        element={
          <AddStudentsToClass/>
        }
       />

        <Route
        path='/AddStudent/:sectionId/:year/:classId/:userid'
        element={
          <AddStudentToClass/>
        }
       />

        <Route
        path='/SubjectAdmin/:classId/:userid/:subjectId'
        element={
          <SubjectInsideAdminView/>
        }
       />

        <Route
        path='/AssignTIC1/:classId'
        element={
          <AssignTeacherInCharge1/>
        }
       />

        <Route
        path='/AssignTIC2/:classId/:userid'
        element={
          <AssignTeacherInCharge2/>
        }
       />

        <Route
        path='/AccYearAdmin/:sectionId'
        element={
          <AcademicYearAdmin/>
        }
       />

        <Route
        path='/AssignSecH1/:sectionId'
        element={
          <AssignSectionHead1/>
        }
       />

       
       <Route
        path='/AssignSecH2/:sectionId/:userid'
        element={
          <AssignSectionHead2/>
        }
       />

        <Route
        path='/AssignSubT1/:subjectId'
        element={
          <AssignSubjectTeacher1/>
        }
       />
       
        <Route
        path='/AssignSubT2/:subjectId/:userid'
        element={
          <AssignSubjectTeacher2/>
        }
       />
       <Route
        path='/ClassStudent/:sectionId/:year/:classId/:userid'
        element={
          <ClassStudentProfile/>
        }
       />

        <Route
        path='/Results/:classId/:subjectId'
        element={
          <SubjectResults/>
        }
       />
       
       
      </Routes>
    </Router>
  );
}

export default App;
