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

//Get section name by sectionId
function GetSectionNameBysectionId({ sectionId }: { sectionId: string }): JSX.Element | null{
    interface Section {
      sectionName:string;
    }
    const [section, setSection] = useState<Section | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/sections/${sectionId}`)
        .then(res => res.json())
        .then(data => setSection(data))
        .catch(error => console.error(error));
    }, [sectionId]);
  
    return section ? <span>{section.sectionName}</span> : null;
  }


const AssignSectionHead1: React.FC = () => {
  const [usersTeacher, setUsersTeacher] = useState<Users[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const defaultSectionId='';
  const{sectionId}=useParams<{sectionId:string}>();
  const sectionName=<GetSectionNameBysectionId sectionId={sectionId??defaultSectionId} />
  const [searchQueryTeachers, setSearchQueryTeachers] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState<Users[]>([]);

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

//Get all Teachers
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

    <div className={`bg-slate-300 p-[5%] mt-[4%] ml-[1%] w-[93vw] rounded-md min-h-screen `}>
      

    <div className="py-[3vh]"></div>
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
   {sectionName} section -  Assign section head
    </h1>
    <table>

      <thead>
      <div className='px-8'><input
          type="text"
          value={searchQueryTeachers}
          onChange={(e) => setSearchQueryTeachers(e.target.value)}
          placeholder={`Search by name`}
          className="p-2 mt-2 border border-gray-300 rounded-lg"
        /></div>
        <tr className="">
          <th className="w-[18vw] p-[1.5vh] text-left pl-8">UserID</th>
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
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/AssignSecH2/${sectionId}/${user.userid}`}><ViewButton/></ViewLink></td>
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

export default AssignSectionHead1;
