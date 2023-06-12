import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import { ViewButton } from '../../../ui/atoms/Buttons';
import NavBar from '../../../ui/templates/NavBar/NavBar';
import SideBarStudent from '../../../ui/templates/SideBar/SideBar-Student';
import SideBarAdmin from '../../../ui/templates/SideBar/SideBar-Admin';
import SideBarParent from '../../../ui/templates/SideBar/SideBar-Parent';
import SideBarTeacher from '../../../ui/templates/SideBar/SideBar-Teacher';
import SideBarPrincipal from '../../../ui/templates/SideBar/SideBar-Principal';



interface Users {
  userid: string;
  userRole:string;
  nameWithInitials: string;
  fullName:string;
  phoneNo:string
  dateOfBirth:string;
  email: string;
  nic:string;
  
}

interface ViewLinkProps {
  url: string;
  children?: React.ReactNode;
}
  
const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);


const AddStudentsToClass: React.FC = () => {
  const [usersStudent, setUsersStudent] = useState<Users[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const{classId}=useParams<{classId:string}>();
  const{sectionId}=useParams<{sectionId:string}>();
  const{year}=useParams<{year:string}>();

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);


  //Get all students
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/v1/users/role/STUDENT/state/1'); 
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
          {usersRole ==='PRINCIPAL' && (
          <SideBarPrincipal/>)}
      </div>
   
     
     <div className={`flex ${open ? "w-[85vw]" : "w-[100vw]"}`}>

    <div className="bg-slate-300 p-[5%] mt-[4%] rounded-md min-h-screen">
      



    <div className="py-[3vh]"></div>
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
        Add Students to class
    </h1>
    <table>
      <thead>
        <tr className="">
          <th className="  w-[18vw] p-[1.5vh]">UserID</th>
          <th className="  w-[18vw] p-[1.5vh]">Name</th>
          <th className="w-[18vw] p-[1.5vh]">Phone No</th>
          <th className=" w-[18vw] p-[1.5vh]">Email</th>
        </tr>
      </thead>
      <tbody>
        {usersStudent.map(user => (
            
          <tr key={user.userid} className="cursor-pointer hover:bg-white">
            <td className="w-[18vw] h-[6vh] text-center rounded-l-xl">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-center ">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/AddStudent/${sectionId}/${year}/${classId}/${user.userid}`}><ViewButton/></ViewLink></td>
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

export default AddStudentsToClass;
