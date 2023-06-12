
import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, { AccessButton,CloseButton} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import AddNewAcademicYearPopup from './AddNewAcademicYearPopup';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';
import SideBarPrincipal from '../../ui/templates/SideBar/SideBar-Principal';



interface AcademicYear {
  id: string;
   year:string;
  sectionId:string;
}

interface ViewLinkProps {
    url: string;
    children?: React.ReactNode;
  }

  //Get user name by UserId
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

  //Get section headId
  function GetSectionHeadIdBysectionId({ sectionId }: { sectionId: string }): string {
    interface Section {
      sectionHeadId: string;
    }
    const [section, setSection] = useState<Section | null>(null);
  
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/sections/${sectionId}`)
        .then((res) => res.json())
        .then((data) => setSection(data))
        .catch((error) => console.error(error));
    }, [sectionId]);
  
    return section ? section.sectionHeadId : "";
  }
  interface BackLinkProps {
    url: string;
    children?: React.ReactNode;
  }
  const BackLink: React.FC<BackLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );

const AcademicYears: React.FC = () => {
  const [academicYear, setAcademicYear] = useState<AcademicYear[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [year, setYear] = useState('');
  const [visibleAdd, setVisibleAdd] = useState(false);
  const { sectionId } = useParams<{ sectionId : string }>();
  const defaultSectionId='';
  const sectionName=<GetSectionNameBysectionId sectionId={sectionId??defaultSectionId} />
  const sectionHeadId = GetSectionHeadIdBysectionId({ sectionId: sectionId ?? '' });
  const sectionHeadName=<GetNameByuserid userid={sectionHeadId??defaultSectionId}/>

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);



  //Section delete 
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove this section? You will lose all details related to this section');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/sections/${sectionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('Section removed successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };
    


  
  //Remove section head
const handleRemoveSectionHead = async () => {
  try {
    const confirmed = window.confirm('Are you sure you want to Remove the section head from this section?');

    if (!confirmed) {
      return; // user clicked cancel, so do nothing
    }

    const response = await fetch(`http://localhost:8080/api/v1/sections/${sectionId}/null`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      alert('Section head removed successfully');
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};
  //Get user name by userId
  function GetNameByuserid({ userid }: { userid: string }): JSX.Element | null{
    interface User {
  
      nameWithInitials:string;
    
    }
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/users/${sectionHeadId}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }, [userid]);
  
    return user ? <span>{user.nameWithInitials}</span> : null;
  }




  const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );

//Get academic years by sectionId
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/academic/${sectionId}`); 
      const data = await result.json();
      setAcademicYear(data);
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
   
     
     <div className={`flex `}>

    <div className={`bg-slate-300 p-[5%] mt-[7%] min-h-screen ${open ? "w-[85vw]" : "w-[100vw]"}`}>
  
      <div className={`my-5 pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-3xl  text-white mt-5 ${visibleAdd ? "blur-sm" : "blur-0"} rounded-lg`}>
      <div className='mb-5'>
      {sectionName}
      </div>

      <div className={`flex  bg-gradient-to-r from-[#586B7D] to-slate-300  text-xl  text-white  ${visibleAdd ? "blur-sm" : "blur-0"} rounded-lg`}>
     <div className="basis-8/12">
     Section head - {sectionHeadName}
     </div>
    
      <div className="p-2 basis-1/12">
      {usersRole ==='ADMIN' && (
      <a href={`http://localhost:3000/AssignSecH1/${sectionId}`}>
        <Button name={'Assign'} 
                buttonType={'primary'} 
                size={'md'}
                padding={'3'}
                icon={FiUserPlus}/>
        </a>)}
      </div>
      {usersRole ==='ADMIN' && (
      <div className='p-2 basis-1/12'>
        <Button name={'Remove'} 
                buttonType={'primary-red'} 
                size={'md'}
                padding={'3'}
                onClick={handleRemoveSectionHead}
                icon={AiFillDelete }/>
     </div>)}
    </div>
      </div>
        
    <div className={`pl-[30px] bg-gradient-to-r from-[#536d85] to-slate-300 p-[2vh] text-lg  text-white mt-8 ${visibleAdd ? "blur-sm" : "blur-0"} rounded-lg flex`}>
   <div className='basis-8/12'>Academic years</div>
   {usersRole ==='ADMIN' && (
   <div className='pl-2 basis-4/12'>
    <Button name={'Start year'} 
                buttonType={'primary'} 
                size={'md'}
                padding={'3'}
                onClick={() => { setVisibleAdd(true)}}
                icon={BiCalendar }/>
  </div>)}
    </div>


    <table className={` ${visibleAdd? "blur-sm" : "blur-0"} mt-5`}>
    <tbody>
  {academicYear.sort((a, b) => parseInt(b.year) - parseInt(a.year)).map(academicYear => (
    <tr key={academicYear.id} className="bg-blue-300 border-2 border-blue-400 hover:bg-blue-200 sm:text-xs md:text-md xl:text-base">
      <td className="sm:w-[0vw] md:w-[60vw] xl:w-[80vw] h-[10vh] text-left pl-16 text-lg">{academicYear.year}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[10vw] h-[10vh] text-center"> <ViewLink url={`http://localhost:3000/classes/${sectionId}/${academicYear.year}`}><AccessButton/></ViewLink></td>
      <td className="sm:w-[0vw] md:w-[25vw] xl:w-[25vw] h-[10vh] text-left pl-16 text-lg">{}</td>
    </tr>
  ))}
</tbody>
    </table>
    
    <div className={`p-4  ${visibleAdd? "blur-sm" : "blur-0"}`}>
       <div className=" ml-[68%]">
       {usersRole ==='ADMIN' && (
        <BackLink url={`http://localhost:3000/sections`}>
        <Button name={'Remove section'} 
                buttonType={'secondary-red'} 
                size={'md'}
                padding={'3'}
                onClick={handleDelete}
                icon={AiFillDelete }/>
        </BackLink>)}
        </div>
    </div>
    
    {visibleAdd && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full max-w-md p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
          <AddNewAcademicYearPopup sectionId={sectionId?? defaultSectionId}/>
          </div>
        </div>
      )}
    </div>

     </div>
    
      </div>
      
      </div>
      
  
    
  );
};

export default AcademicYears