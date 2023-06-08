import { useState, useEffect } from "react";
import { HiBars4 } from "react-icons/hi2";
import React from 'react';
import { useParams } from "react-router-dom";
import SideBarAdmin from "../../ui/templates/SideBar/SideBar-Admin";
import NavBar from "../../ui/templates/NavBar/NavBar";
import { AccessButton } from "../../ui/atoms/Buttons";
import SideBarStudent from "../../ui/templates/SideBar/SideBar-Student";
import SideBarParent from "../../ui/templates/SideBar/SideBar-Parent";
import SideBarTeacher from "../../ui/templates/SideBar/SideBar-Teacher";

interface User {
  classIds: string[];
}

//Get class room name by id
function GetClassRoomNameByid({classId }: { classId: string }): JSX.Element | null{
    interface ClassRoom {
  
      classRoomId:string;
    
    }
    const [classRoom, setClassRoom] = useState<ClassRoom | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/classrooms/${classId}/classroom`)
        .then(res => res.json())
        .then(data => setClassRoom(data))
        .catch(error => console.error(error));
    }, []);
  
    return classRoom ? <span>{classRoom.classRoomId}</span> : null;
  }

  //Get class room name by id
function GetAccYearByClassRoomId({classId }: { classId: string }): JSX.Element | null{
    interface ClassRoom {
  
        academicYear:string;
    
    }
    const [classRoom, setClassRoom] = useState<ClassRoom | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/classrooms/${classId}/classroom`)
        .then(res => res.json())
        .then(data => setClassRoom(data))
        .catch(error => console.error(error));
    }, []);
  
    return classRoom ? <span>{classRoom.academicYear}</span> : null;
  }



const UserClassRooms: React.FC = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId.toString());
    }
  }, []);

  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  const [user, setUser] = useState<User | null>(null);

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/v1/users/${userId}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }
  }, [userId]);

  return (
    <div className="min-h-[100vh] bg-slate-200">
      <div className="fixed z-20 w-[100%]">
        <HiBars4
          className={`absolute cursor-pointer w-24 fill-slate-100 mr-[82vw] h-12 top-14 bg-[#586B7D] rounded-tr-2xl`}
          onClick={() => setOpen(!open)}
        />
        <NavBar />
      </div>

      <div className="flex">
        <div className={` ${open ? "w-[15vw]" : "scale-0"} z-10 duration-100 pt-20`} >
          {usersRole ==='ADMIN' && (
          <SideBarAdmin/>)}
          {usersRole ==='TEACHER' && (
          <SideBarTeacher/>)}
          {usersRole ==='PARENT' && (
          <SideBarParent/>)}
          {usersRole ==='STUDENT' && (
          <SideBarStudent/>)}
        </div>

        <div className={` ${open ? "w-[85vw] h-[100%]" : "w-[100vw] h-[100%]"} duration-100`}>
        <div className={`ml-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 text-white mt-[10%] rounded-lg`}>
        <div className="p-[4%] text-3xl"> Your Classes {userId}</div> 
        </div>

        <table className={`ml-[30px]`}>
      <thead>
        <tr className="sm:text-xs md:text-md xl:text-base">
          <th className="sm:w-[0vw] md:w-[35vw] xl:w-[40vw] p-[3vh]">Academic Year</th>
          <th className="sm:w-[0vw] md:w-[35vw] xl:w-[40vw] p-[3vh]">Class Room</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  {user?.classIds.map(classId => (
    <tr key={classId} className="bg-blue-300 border-2 border-blue-400 hover:bg-white sm:text-xs md:text-md xl:text-base">
      <td className="sm:w-[0vw] md:w-[35vw] xl:w-[40vw] h-[10vh] text-center"><GetAccYearByClassRoomId classId={classId}/></td>
      <td className="sm:w-[0vw] md:w-[35vw] xl:w-[40vw] h-[10vh] text-center"><GetClassRoomNameByid classId={classId}/></td>
      <td className='sm:w-[0vw] md:w-[25vw] xl:w-[30vw] h-[10vh] text-center"'> <a href={`http://localhost:3000/MyClass/${classId}`}><AccessButton/></a></td>
    </tr>
  ))}
</tbody>
    
    </table>
        </div>
      </div>
    </div>
  );
};

export default UserClassRooms;
