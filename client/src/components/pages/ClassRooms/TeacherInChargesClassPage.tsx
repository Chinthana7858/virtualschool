import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import { AccessButton} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';

interface ClassRoom {
    id:string;
    classRoomId: string;
    sectionId:string;
    teacherInChargeId:string;
    academicYear:string;
  }

const TeacherInChargesClassPage: React.FC = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId.toString());
    }
  }, []);

  const [classRoom, setClassRoom] = useState<ClassRoom[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const { classId } = useParams<{ classId: string }>();
  
  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

  //Get class by teacherId
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/classrooms/teacher/${userId}`); //Hardcoded
      const data = await result.json();
      setClassRoom(data);
    };

    fetchData();
  }, [userId]);

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
      </div>

     <div className={`flex `}>

    <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen ${open ? "w-[85vw]" : "w-[100vw]"}`}>
    
    <div className={`rounded-lg bg-gradient-to-r from-[#586B7D] to-slate-300`}>
    <div className={`pl-[30px]  p-[3vh] text-2xl font-medium text-white rounded-lg`}>
     Your Classes
    </div>
    </div>

    <table className={``}>
      <thead>
        <tr className="sm:text-xs md:text-md xl:text-base">
          <th className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] p-[3vh] text-left pl-16">Academic Year</th>
          <th className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] p-[3vh] text-left pl-16">Class</th>
        </tr>
      </thead>
      <tbody>
  {classRoom.sort((a, b) => parseInt(b.academicYear) - parseInt(a.academicYear)).map(classroom => (
    <tr key={classroom.classRoomId} className="bg-slate-400 hover:bg-white sm:text-xs md:text-md xl:text-base">
      <td className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[10vh] text-left pl-16">{classroom.academicYear}</td>
      <td className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[10vh] text-left pl-16">{classroom.classRoomId}</td>
      <td className='sm:w-[0vw] md:w-[25vw] xl:w-[30vw] h-[10vh] text-center"'> <a href={`http://localhost:3000/ClassRoom/${classroom.id}`}><AccessButton/></a></td>
    </tr>
  ))}
</tbody>



    
    </table>
    </div>
   </div>
  </div> 
 </div> 
  );
};

export default TeacherInChargesClassPage;
