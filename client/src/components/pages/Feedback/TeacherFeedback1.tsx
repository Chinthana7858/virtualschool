import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import {AccessButton}  from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';



interface User {
  userid: string;
  userRole:string;
  nameWithInitials:string;
  fullName:string;
  phoneNo: string;
  dateOfBirth:string;
  email:string;
  nic:string;
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

    //Get subject name by subject id
    function GetSubjectNameBySubjectId({ subjectId }: { subjectId: string }): JSX.Element | null{
        interface Section {
          subjectName:string;
        }
        const [section, setSection] = useState<Section | null>(null);
        useEffect(() => {
          fetch(`http://localhost:8080/api/v1/subjects/${subjectId}`)
            .then(res => res.json())
            .then(data => setSection(data))
            .catch(error => console.error(error));
        }, []);
      
        return section ? <span>{section.subjectName}</span> : null;
      }

const TeacherFeedback1: React.FC = () => {
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [visibleAdd, setVisibleAdd] = useState(false);
  const defaultclassRoomId='';
  const [usersStudent, setUsersStudent] = useState<User[]>([]);
  const { classId } = useParams<{ classId: string }>();
  const { subjectId } = useParams<{ subjectId: string }>();
  const { year } = useParams<{ year: string }>();
  const { sectionId } = useParams<{ sectionId: string }>();
  const classRoomName=<GetClassRoomNameByid classId={classId??defaultclassRoomId}/>

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

  //Get username by user id
  function GetNameByuserid({ userid }: { userid: string }): JSX.Element | null{
    interface User {
  
      nameWithInitials:string;
    
    }
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/users/${userid}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }, [userid]);
  
    return user ? <span>{user.nameWithInitials}</span> : null;
  }
  


  //Get students by class Id
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/users/class/${classId}`); 
      const data = await result.json();
      setUsersStudent(data);
    };

    fetchData();
  }, []);



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
    
 


<div className={`pl-[30px] bg-gradient-to-r from-[#5f9cd4] to-slate-300 p-[2vh] text-xl font-medium text-white rounded-md mt-7 ${visibleAdd? "blur-sm" : "blur-0"}`}>
      <div className="pb-5 text-2xl">Give a feedback</div>
      <span><span className="pr-5">{classRoomName}</span><span><GetSubjectNameBySubjectId subjectId={subjectId??''}/></span></span>
    </div>

    <table className={` ${visibleAdd? "blur-sm" : "blur-0"}`}>
      <thead>
        <tr className="">
          <th className="w-[18vw] p-[1.5vh] text-left">UserID</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Name</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Phone No</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Email</th>
        </tr>
      </thead>
      <tbody>
        {usersStudent.map(user => (
            
          <tr key={user.userid} className="cursor-pointer hover:bg-white">
            <td className="w-[18vw] h-[6vh] p-[1.5vh] text-left rounded-l-xl">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <a href={`http://localhost:3000/teacherFeedback/${classId}/${subjectId}/${user.userid}`}><AccessButton/></a></td>
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

export default TeacherFeedback1;
