import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import Button, { CloseButton, SubmitButton } from '../../ui/atoms/Buttons';
import MarkAttendancePopup from './MarkAttendancePopup';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';
import SideBarPrincipal from '../../ui/templates/SideBar/SideBar-Principal';

interface Users {
  userid: string;
  userRole: string;
  nameWithInitials: string;
  fullName: string;
  phoneNo: string;
  dateOfBirth: string;
  email: string;
  nic: string;
}


function GetAttendance({ classId,studentId, date }: {  classId: string, studentId: string, date: string }): JSX.Element | null {
  interface Attendance {
     state: string;
  }

  const [attendance, setAttendance] = useState<Attendance | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/attendance/${classId}/${studentId}/${date}`)
      .then(res => res.json())
      .then(data => setAttendance(data))
      .catch(error => console.error(error));
  }, [ classId, studentId, date]);

  return attendance ? <>{attendance.state}</> : null;
}




//Get class room name by id
function GetClassRoomNameByid({ classId }: { classId: string }): JSX.Element | null {
  interface ClassRoom {
    classRoomId: string;
  }
  const [classRoom, setClassRoom] = useState<ClassRoom | null>(null);
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/classrooms/${classId}/classroom`)
      .then((res) => res.json())
      .then((data) => setClassRoom(data))
      .catch((error) => console.error(error));
  }, [classId]); // add classId as a dependency

  return classRoom ? <span>{classRoom.classRoomId}</span> : null;
}



function MarkAttendance() {
  const [usersStudent, setUsersStudent] = useState<Users[]>([]);
  const { classId } = useParams<{ classId: string }>();
  const { date } = useParams<{ date: string }>();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [studentId, setstudentId] = useState('');
  const defaultclassRoomId = '';
  const classRoomName = <GetClassRoomNameByid classId={classId ?? defaultclassRoomId} />;

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);


  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  
  function convertDate(inputDate: string): string {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate()-1;
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
    return `${year}-${paddedMonth}-${paddedDay}`;
  }
  
  const fomattedDate=convertDate(date??'')

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/users/class/${classId}`);
      const data = await result.json();
      setUsersStudent(data);
    };

    fetchData();
  }, [classId]); // add classId as a dependency


function StringToJSX(props: { str: string }) {
  const jsxElement = React.createElement('div', { className: 'my-class' }, props.str);
  return jsxElement;
}


  return (
    <div>
      <div className="fixed z-20 w-[100%]">
       <HiBars4  
          className={`absolute cursor-pointer  w-24
           fill-slate-100  mr-[82vw] h-12 top-14 bg-[#586B7D] rounded-tr-2xl `} onClick={() => setOpen(!open)}/>
       <NavBar/>
      </div>

    <div className="flex">
        <div className={` ${open ? "w-[15vw]" : "scale-0"} pt-[14.5vh] z-10 duration-100`} >
          {usersRole ==='ADMIN' && (
          <SideBarAdmin/>)}
          {usersRole ==='TEACHER' && (
          <SideBarTeacher/>)}
          {usersRole ==='PARENT' && (
          <SideBarParent/>)}
          {usersRole ==='STUDENT' && (
          <SideBarStudent/>)}
          {usersRole ==='PRINCIPAL' && (
          <SideBarPrincipal/>)}
        </div>
   
     
    <div className={`flex ${open ? "w-[85vw]" : "w-[100vw]"} min-w-[85vw]`}>
    <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen  ${open ? "w-[85vw]" : "w-[100vw]"}`}>  
    <div className={`pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-white rounded-lg`}>
     <div className=''>
     <div className="text-4xl">Mark attendance-{classRoomName}</div>
      <div className="py-4 text-2xl">{fomattedDate}</div> 
     </div>
      </div>
      
    <table className='border-2 border-blue-600 mt-[5vh]'>
      <thead>
        <tr className="border-2 border-blue-600">
          <th className="w-[15vw] p-[1.5vh] text-left pl-8">UserID</th>
          <th className="w-[15vw] p-[1.5vh] text-left">Name</th>
          <th className="w-[15vw] p-[1.5vh] text-left">Full Name</th>
          <th className="w-[15vw]  text-left">Attendance</th>
        </tr>
      </thead> 
      <tbody>
  {usersStudent.map(user => {
    let attendanceResult = <GetAttendance classId={classId ?? ''} studentId={user.userid} date={fomattedDate} />;
    return (
      <tr key={user.userid} className={`cursor-pointer hover:bg-slate-200`} onClick={() => { setVisibleAdd(true); setstudentId(user.userid) }}>
        <td className="w-[15vw] h-[5vh] text-left  pl-8">{user.userid}</td>
        <td className="w-[15vw] h-[5vh] text-left">{user.nameWithInitials}</td>
        <td className="w-[15vw] h-[5vh] text-left">{user.fullName}</td>
        <td className="w-[15vw] h-[5vh] text-left">{attendanceResult}
        </td>
      </tr>
      
    );
  })}
</tbody>

     </table>
     {visibleAdd && (
             <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
             <div className="max-w-2xl p-4 rounded-lg bg-blue-50">
             <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
             <MarkAttendancePopup classId={classId ?? ''} studentId={studentId ?? ''} date={convertDate(date ?? '')}  />
          </div>
        </div>
      )}

    </div>
    
   </div>
   
  </div>
  
 </div>
 
 );
};
export default MarkAttendance;
