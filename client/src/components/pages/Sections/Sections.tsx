import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import Button, { AccessButton,CloseButton} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import AddNewSectionPopup from './AddNewSectionPopup';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';
import SideBarPrincipal from '../../ui/templates/SideBar/SideBar-Principal';


interface Section {
  sectionId: string;
  sectionName:string;
  sectionHeadId:string;
}
interface ViewLinkProps {
  url: string;
  children?: React.ReactNode;
}
const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);

const Sections: React.FC = () => {
  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

  const [section, setSection] = useState<Section[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);

 //Get user name by UserId
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


  // Get all Sections
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/sections`); 
      const data = await result.json();
      setSection(data);
    };

    fetchData();
  }, []);

  const filterSections = () => {
    const filtered = section.filter((sec) =>
      sec.sectionName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSections(filtered);
  };
  
  useEffect(() => {
    filterSections();
  }, [searchQuery, section]);
  
  useEffect(() => {
    setFilteredSections(section); // Set initial filtered sections to all sections
  }, [section]);

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
      <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen`}>
        <h1 className={`pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[4vh] text-2xl  text-white  ${visibleAdd ? "blur-sm" : "blur-0"} rounded-lg`}>
          Sections
        </h1>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by section name..."
          className={`p-2 mt-2 border border-gray-300 rounded-md  ${visibleAdd ? "blur-sm" : "blur-0"} rounded-lg`}
        />

        <table className={`${visibleAdd ? "blur-sm" : "blur-0"}`}>
          <thead>
          <tr className="sm:text-xs md:text-md xl:text-base">
          <th className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] p-[3vh] text-left">Section Id</th>
          <th className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] py-[3vh] text-left">Section Name</th>
          <th className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] py-[3vh] text-left">Section Head</th>
          <th></th>
        </tr>
          </thead>
          <tbody>
            {filteredSections.map((section) => (
              <tr key={section.sectionId} className="bg-blue-300 border-2 border-blue-400 hover:bg-white sm:text-xs md:text-md xl:text-base">
                <td className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[15vh] text-left pl-10">{section.sectionId}</td>
                <td className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[15vh] text-left">{section.sectionName}</td>
                <td className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[15vh] text-left"><GetNameByuserid userid={section.sectionHeadId}/></td>
                <td className='sm:w-[0vw] md:w-[5vw]  xl:w-[15vw] h-[15vh] text-center"'> <ViewLink url={`http://localhost:3000/AcademicYears/${section.sectionId}`}><AccessButton/></ViewLink></td>
              </tr>
            ))}
          </tbody>
        </table>

        {usersRole ==='ADMIN' && (
     <div className={`${visibleAdd ? "blur-sm" : "blur-0"} p-4`}>
      <Button 
      name={'Add section'} 
      buttonType={"secondary"} 
      onClick={() => { setVisibleAdd(true)}} 
      size={'md'}
      padding={'4'}
      />
</div>  
      )}
      
    {visibleAdd && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full max-w-md p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
          <AddNewSectionPopup />
          </div>
        </div>
      )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Sections;
