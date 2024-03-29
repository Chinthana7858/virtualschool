import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import Button, {ViewButton } from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';
import SideBarPrincipal from '../../ui/templates/SideBar/SideBar-Principal';
import { BiSearch } from 'react-icons/bi';



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


const UsersDetails: React.FC = () => {
  const [usersStudent, setUsersStudent] = useState<Users[]>([]);
  const [usersTeacher, setUsersTeacher] = useState<Users[]>([]);
  const [usersPrincipal, setUsersPrincipal] = useState<Users[]>([]);
  const [usersParent, setUsersParent] = useState<Users[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [searchQueryStudents, setSearchQueryStudents] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Users[]>([]);
  const [searchQueryPrincipals, setSearchQueryPrincipals] = useState("");
  const [filteredPrincipals, setFilteredPrincipals] = useState<Users[]>([]);
  const [searchQueryTeachers, setSearchQueryTeachers] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState<Users[]>([]);
  const [searchQueryParents, setSearchQueryParents] = useState("");
  const [filteredParents, setFilteredParents] = useState<Users[]>([]);

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

  
  const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );


  //Get students data
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/v1/users/role/STUDENT/state/1'); 
      const data = await result.json();
      setUsersStudent(data);
    };

    fetchData();
  }, []);

  const filterStudents = () => {
    const filtered = usersStudent.filter((sec) =>
      sec.nameWithInitials.toLowerCase().includes(searchQueryStudents.toLowerCase())
    );
    setFilteredStudents(filtered);
  };
  
  useEffect(() => {
    filterStudents();
  }, [searchQueryStudents,usersStudent]);
  
  useEffect(() => {
    setFilteredStudents(usersStudent); // Set initial filtered sections to all sections
  }, [usersStudent]);


  //Get teachers data
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/v1/users/role/TEACHER/state/1'); 
      const data = await result.json();
      setUsersTeacher(data);
    };

    fetchData();
  }, []);

  const filterTeachers = () => {
    const filtered = usersTeacher.filter((sec) =>
      sec.nameWithInitials.toLowerCase().includes(searchQueryTeachers.toLowerCase())
    );
    setFilteredTeachers(filtered);
  };
  
  useEffect(() => {
    filterTeachers();
  }, [searchQueryTeachers,usersTeacher]);
  
  useEffect(() => {
    setFilteredTeachers(usersTeacher); // Set initial filtered sections to all sections
  }, [usersTeacher]);


  //Get principals details
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/v1/users/role/PRINCIPAL/state/1'); 
      const data = await result.json();
      setUsersPrincipal(data);
    };

    fetchData();
  }, []);

  const filterPrincipals = () => {
    const filtered = usersPrincipal.filter((sec) =>
      sec.nameWithInitials.toLowerCase().includes(searchQueryPrincipals.toLowerCase())
    );
    setFilteredPrincipals(filtered);
  };
  
  useEffect(() => {
    filterPrincipals();
  }, [searchQueryPrincipals,usersPrincipal]);
  
  useEffect(() => {
    setFilteredPrincipals(usersPrincipal); // Set initial filtered sections to all sections
  }, [usersPrincipal]);


  //Get patents details
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/v1/users/role/PARENT/state/1'); 
      const data = await result.json();
      setUsersParent(data);
    };

    fetchData();
  }, []);

  const filterParents = () => {
    const filtered = usersParent.filter((sec) =>
      sec.nameWithInitials.toLowerCase().includes(searchQueryParents.toLowerCase())
    );
    setFilteredParents(filtered);
  };
  
  useEffect(() => {
    filterParents();
  }, [searchQueryParents,usersParent]);
  
  useEffect(() => {
    setFilteredParents(usersParent); // Set initial filtered sections to all sections
  }, [usersParent]);


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
   
     
    <div className={`flex  ${open ? "w-[85vw]" : "w-[100vw]"}`}>
    <div className="bg-slate-300 p-[5%] mt-[7%]  w-[100vw] rounded-md">
        <h1 className="text-3xl p-[2%] text-slate-700 font-medium">User details</h1>
        <div className='p-3'>
     
        <a href={`http://localhost:3000/RemovedUsers`}>
        <Button name={'Removed users'} 
                buttonType={'secondary'} 
                size={'lg'}
                padding={'4'}/>
        </a>
        </div>
   
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
        Principals
    </h1>
    <table>
      <thead>
      <div className='px-8'><input
          type="text"
          value={searchQueryPrincipals}
          onChange={(e) => setSearchQueryPrincipals(e.target.value)}
          placeholder={`Search by name`}
          className="p-2 mt-2 border border-gray-300 rounded-lg"
        /></div>
        <tr className="">
          <th className="w-[18vw] p-[1.5vh] text-left rounded-l-xl pl-8">UserID</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Name</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Phone No</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Email</th>
       </tr>
      </thead>
      <tbody>
      {filteredPrincipals.map((user) => (
          <tr key={user.userid} className="cursor-pointer hover:bg-white ">
            <td className="w-[18vw] h-[6vh] text-left rounded-l-xl pl-8">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/user/${user.userid}`}><ViewButton/></ViewLink></td>
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
      <div className='px-8'><input
          type="text"
          value={searchQueryTeachers}
          onChange={(e) => setSearchQueryTeachers(e.target.value)}
          placeholder="Search by name"
          className="p-2 mt-2 border border-gray-300 rounded-lg"
        /></div>
      <tr className="">
          <th className="w-[18vw] p-[1.5vh] text-left rounded-l-xl pl-8">UserID</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Name</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Phone No</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Email</th>
       </tr>
      </thead>
      <tbody>
      {filteredTeachers.map((user) => (
          <tr key={user.userid} className="cursor-pointer hover:bg-white">
            <td className="w-[18vw] h-[6vh] text-left rounded-l-xl pl-8">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-left ">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/user/${user.userid}`}><ViewButton/></ViewLink></td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="py-[3vh]"></div>
    {usersRole !=='STUDENT'&&usersRole!=='PARENT' && (
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
        Students
    </h1>)}
    
    {usersRole !=='STUDENT'&&usersRole!=='PARENT' && (
    <table>
      <thead>
      <div className='px-8'><input
          type="text"
          value={searchQueryStudents}
          onChange={(e) => setSearchQueryStudents(e.target.value)}
          placeholder="Search by name"
          className="p-2 mt-2 border border-gray-300 rounded-lg"
        /></div>
      <tr className="">
          <th className="w-[18vw] p-[1.5vh] text-left rounded-l-xl pl-8">
           <div> UserID</div>
          </th>
          <th className="w-[18vw] p-[1.5vh] text-left">Name</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Phone No</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Email</th>
       </tr>
      </thead>
      <tbody>
      {filteredStudents.map((user) => (
          <tr key={user.userid} className="cursor-pointer hover:bg-white">
            <td className="w-[18vw] h-[6vh] text-left rounded-l-xl pl-8">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-left ">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/user/${user.userid}`}><ViewButton/></ViewLink></td>
          </tr>
        ))}
      </tbody>
    </table>)}
    
    <div className="py-[3vh]"></div>
    {usersRole !=='STUDENT'&& usersRole!=='PARENT' && (
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
        Parents
    </h1>)}
    {usersRole ==='TEACHER'||usersRole==='PRINCIPAL'||usersRole==='ADMIN' && (
    <table>
      <thead>
      <tr className="">
         <div className='px-8'><input
          type="text"
          value={searchQueryParents}
          onChange={(e) => setSearchQueryParents(e.target.value)}
          placeholder="Search by name"
          className="p-2 mt-2 border border-gray-300 rounded-lg"
        /></div>
          <th className="w-[18vw] p-[1.5vh] text-left rounded-l-xl pl-8">UserID</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Name</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Phone No</th>
          <th className="w-[18vw] p-[1.5vh] text-left">Email</th>
       </tr>
      </thead>
      <tbody>
      {filteredParents.map((user) => (
          <tr key={user.userid} className="cursor-pointer hover:bg-white">
            <td className="w-[18vw] h-[6vh] text-left rounded-l-xl pl-8">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-left">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-left ">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/user/${user.userid}`}><ViewButton/></ViewLink></td>
          </tr>
        ))}
      </tbody>
    </table>)}

    </div>
     
     </div>
    
      </div>
      
      </div>
      
  
    
  );
};

export default UsersDetails;
