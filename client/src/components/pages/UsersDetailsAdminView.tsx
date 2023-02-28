import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import NavBar from '../ui/templates/NavBar/NavBar';
import { AccessButton, RemovedUsersButton, ViewButton } from '../ui/atoms/Buttons';
import SideBarAdmin from '../ui/templates/SideBar/SideBar-Admin';


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


const UserList: React.FC = () => {
  const [usersStudent, setUsersStudent] = useState<Users[]>([]);
  const [usersTeacher, setUsersTeacher] = useState<Users[]>([]);
  const [usersPrincipal, setUsersPrincipal] = useState<Users[]>([]);
  const [usersSectionHead, setUsersSectionHead] = useState<Users[]>([]);
  const [usersParent, setUsersParent] = useState<Users[]>([]);
  const [open, setOpen] = useState(true);

  
  const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/vi/users/role/STUDENT/state/1'); 
      const data = await result.json();
      setUsersStudent(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/vi/users/role/TEACHER/state/1'); 
      const data = await result.json();
      setUsersTeacher(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/vi/users/role/PRINCIPAL/state/1'); 
      const data = await result.json();
      setUsersPrincipal(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/vi/users/role/SECTION_HEAD/state/1'); 
      const data = await result.json();
      setUsersSectionHead(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/vi/users/role/PARENT/state/1'); 
      const data = await result.json();
      setUsersParent(data);
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
         <SideBarAdmin/>
      </div>
   
     
     <div className="flex">

    <div className="bg-slate-300 p-[5%] mt-[7%] ml-[5%] w-[93vw] rounded-md">
        <h1 className="text-3xl p-[2%] text-slate-700 font-medium">User details</h1>
        <div className='p-3'>
        <ViewLink url={`http://localhost:3000/RemovedUsers`}><RemovedUsersButton/></ViewLink>
        </div>
   
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
        Principals
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
        {usersPrincipal.map(user => (
          <tr key={user.userid} className="cursor-pointer hover:bg-white ">
            <td className="w-[18vw] h-[6vh] text-center rounded-l-xl">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-center ">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/UPAdminView/${user.userid}`}><ViewButton/></ViewLink></td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="py-[3vh]"></div>
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
        Section Heads
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
        {usersSectionHead.map(user => (
          <tr key={user.userid} className="cursor-pointer hover:bg-white ">
            <td className="w-[18vw] h-[6vh] text-center rounded-l-xl">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-center ">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/UPAdminView/${user.userid}`}><ViewButton/></ViewLink></td>
          </tr>
        ))}
      </tbody>
    </table>

       <div className="py-[3vh]"></div>
        <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
            Teachers
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
        {usersTeacher.map(user => (
          <tr key={user.userid} className="cursor-pointer hover:bg-white">
            <td className="w-[18vw] h-[6vh] text-center rounded-l-xl">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-center ">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-center ">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/UPAdminView/${user.userid}`}><ViewButton/></ViewLink></td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="py-[3vh]"></div>
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
        Students
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
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/UPAdminView/${user.userid}`}><ViewButton/></ViewLink></td>
          </tr>
  
        ))}
      </tbody>
    </table>

    <div className="py-[3vh]"></div>
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
        Parents
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
        {usersParent.map(user => (
          <tr key={user.userid} className="cursor-pointer hover:bg-white">
            <td className="w-[18vw] h-[6vh] text-center rounded-l-xl">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-center ">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/UPAdminView/${user.userid}`}><ViewButton/></ViewLink></td>
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

export default UserList;
