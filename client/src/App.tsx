
import './App.css';

import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

import HomePageAdmin from './components/pages/HomePages/HomePage-Admin';
import HomePageParent from './components/pages/HomePages/HomePage-Parent';
import HomePagePrincipal from './components/pages/HomePages/HomePage-Principal';
import HomePageStudent from './components/pages/HomePages/HomePage-Student';
import HomePageTeacher from './components/pages/HomePages/HomePage-Teacher';
import RemovedUsers from './components/pages/UserManagement/RemovedUsers';
import RemovedUser from './components/pages/UserManagement/RemovedUser';
import DiscussionForuminside from './components/pages/DiscussionForum/DiscussionForumInside';
import DiscussionForums from './components/pages/DiscussionForum/DiscussionForums';
import UserRequest from './components/pages/UserManagement/UserRequest';
import UsersRequests from './components/pages/UserManagement/UsersRequests';
import ClassRoomsAdminview from './components/pages/ClassRooms/ClassRooms';
import AddStudentsToClass from './components/pages/ClassRooms/AddStudentToClass/AddStudentsToClass';
import AddStudentToClass from './components/pages/ClassRooms/AddStudentToClass/AddStudentToClass';
import SubjectInsideAdminView from './components/pages/Subjects/SubjectInside';
import AssignTeacherInCharge1 from './components/pages/ClassRooms/AssignTeacherInCharge/AssignTeacherInCharge1';
import AcademicYearAdmin from './components/pages/Sections/AcademicYears';
import ClassRoomInsideAdminview from './components/pages/ClassRooms/ClassRoomInside';
import AssignSectionHead1 from './components/pages/Sections/AssignSectionHead.tsx/AssignSectionHead1';
import AssignSectionHead2 from './components/pages/Sections/AssignSectionHead.tsx/AssignSectionHead2';
import AssignSubjectTeacher1 from './components/pages/Subjects/AssignSubjectTeacher/AssignSubjectTeacher1';
import AssignSubjectTeacher2 from './components/pages/Subjects/AssignSubjectTeacher/AssignSubjectTeacher2';
import AssignTeacherInCharge2 from './components/pages/ClassRooms/AssignTeacherInCharge/AssignTeacherInCharge2';
import SubjectResults from './components/pages/Subjects/SubjectResults';
import ClassStudentProfile from './components/pages/ClassRooms/AddStudentToClass/ClassStudentProfile';
import UsersList from './components/pages/UserManagement/UsersList';
import UserProfilemanage from './components/pages/UserManagement/UserProfilemanage';
import ClassTimeTable from './components/pages/TimeTable/ClassTimeTable';
import Sections from './components/pages/Sections/Sections';
import AcademicYears from './components/pages/Sections/AcademicYears';
import ClassRooms from './components/pages/ClassRooms/ClassRooms';
import ClassRoomInside from './components/pages/ClassRooms/ClassRoomInside';
import SubjectInside from './components/pages/Subjects/SubjectInside';
import ClassMonthPicker from './components/pages/Attendance/ClassMonthPicker';
import MarkAttendance from './components/pages/Attendance/MarkAttendance';
import UserClassRooms from './components/pages/ClassRooms/UserClassRooms';
import SResults1 from './components/pages/StudentsResults/SResults1';
import SResults2 from './components/pages/StudentsResults/SResults2';
import TeachersSubjects from './components/pages/Subjects/TeachersSubjects';
import AttendanceStudentView from './components/pages/Attendance/AttendanceStudentView';
import TeacherInChargesClassPage from './components/pages/ClassRooms/TeacherInChargesClassPage';



function App() {
  return (
    <Router>
      <Routes>
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
        path='/Users'
        element={
          <UsersList/>
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
        path='/user/:userid'
        element={  
          <UserProfilemanage/>
        }
       />
      

      <Route
        path='/timetable/:classId'
        element={
          <ClassTimeTable/>
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
        path='/sections'
        element={
          <Sections/>
        }
       />

        <Route
        path='/classes/:sectionId/:year'
        element={
          <ClassRooms/>
        }
       />

        <Route
        path='/ClassRoom/:sectionId/:year/:classId'
        element={
          <ClassRoomInside/>
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
        path='/Subject/:classId/:userid/:subjectId'
        element={
          <SubjectInside/>
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
        path='/AcademicYears/:sectionId'
        element={
          <AcademicYears/>
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
       
       <Route
        path='/MonthPick/:classId'
        element={
          <ClassMonthPicker/>
        }
       />
        <Route
        path='/MarkAttendance/:classId/:date'
        element={
          <MarkAttendance/>
        }
       />

       <Route
        path='/MyClasses'
        element={
          <UserClassRooms/>
        }
       />

        <Route
        path='/MyClass/:classId'
        element={
          <ClassRoomInside/>
        }
       />

        <Route
        path='/SResults1'
        element={
          <SResults1/>
        }
       />

        <Route
        path='/SResults2/:classId'
        element={
          <SResults2/>
        }
       />

        <Route
        path='/teachersSubjects'
        element={
          <TeachersSubjects/>
        }
       />

       
        <Route
        path='/AttendanceStudent'
        element={
          <AttendanceStudentView/>
        }
       />

        <Route
        path='/teachersClasses'
        element={
          <TeacherInChargesClassPage/>
        }
       />

        <Route
        path='/ClassRoom/:classId'
        element={
          <ClassRoomInside/>
        }
       />
       
      </Routes>
    </Router>
  );
}

export default App;
