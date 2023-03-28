import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, { AccessButton, CloseButton} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import AddNewClassPopup from './AddNewClassPopup';



interface ClassRoom {
  id:string;
  classRoomId: string;
  sectionId:string;
  teacherInChargeId:string;
}

interface ViewLinkProps {
    url: string;
    children?: React.ReactNode;
  }


  //Get name by userId
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

  //Get section name by SectionId
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

  interface BackLinkProps {
    url: string;
    children?: React.ReactNode;
  }
  const BackLink: React.FC<BackLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );


const ClassRooms: React.FC = () => {
  const [classRoom, setClassRoom] = useState<ClassRoom[]>([]);
  const [open, setOpen] = useState(true); 
  const [visibleAdd, setVisibleAdd] = useState(false);
  const { sectionId } = useParams<{ sectionId: string }>();
  const { year } = useParams<{ year: string }>();
  const defaultSectionId='';
  const defaultyear='';
  const sectionName=<GetSectionNameBysectionId sectionId={sectionId??defaultSectionId} />

  const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );


  //Delete academic year
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove this academic year? You will lose all details related to this year');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/academic/${year}/${sectionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('Academic year removed successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };
    


//Get class room and academic year 
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/classrooms/sectionId/${sectionId}/Academic/${year}`); 
      const data = await result.json();
      setClassRoom(data);
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
   
     
     <div className={`flex`}>

    <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen ${open ? "w-[85vw]" : "w-[100vw]"}`}>
   

        
    <div className={`pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300   text-white  ${visibleAdd ? "blur-sm" : "blur-0"} py-6 rounded-lg`}>
   <div className='pb-3 text-3xl'>{sectionName} section</div> 
   <div> Academic year - {year} </div>
    </div>

   
<div className={` ${visibleAdd? "blur-sm" : "blur-0"} p-4`}>
        <Button name={'Add classroom'} 
                buttonType={'secondary'}
                onClick={() => { setVisibleAdd(true)}} 
                size={'md'}
                padding={'3'}/>
</div> 


    <table className={` ${visibleAdd? "blur-sm" : "blur-0"}`}>
      <thead>
        <tr className="sm:text-xs md:text-md xl:text-base">
          <th className="sm:w-[0vw] md:w-[35vw] xl:w-[40vw] p-[3vh]">Class Room</th>
          <th className="sm:w-[0vw] md:w-[35vw] xl:w-[40vw] p-[3vh]">Teacher In Charge</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  {classRoom.map(classRoom => (
    <tr key={classRoom.id} className="bg-blue-300 border-2 border-blue-400 hover:bg-white sm:text-xs md:text-md xl:text-base">
      <td className="sm:w-[0vw] md:w-[35vw] xl:w-[40vw] h-[10vh] text-center">{classRoom.classRoomId}</td>
      <td className="sm:w-[0vw] md:w-[35vw] xl:w-[40vw] h-[10vh] text-center"><GetNameByuserid userid={classRoom.teacherInChargeId}/></td>
      <td className='sm:w-[0vw] md:w-[25vw] xl:w-[30vw] h-[10vh] text-center"'> <ViewLink url={`http://localhost:3000/ClassRoom/${sectionId}/${year}/${classRoom.id}`}><AccessButton/></ViewLink></td>
    </tr>
  ))}
</tbody>
    
    </table>
<div className=''>
<div className={`p-4  ${visibleAdd? "blur-sm" : "blur-0"}`}>
<div className=" ml-[73%]">
<BackLink url={`http://localhost:3000/AcademicYears/${sectionId}`}>
        <Button name={'Remove year'} 
                buttonType={'secondary-red'} 
                size={'md'}
                padding={'3'}
                onClick={handleDelete}
                icon={AiFillDelete }/>
        </BackLink>
</div>

</div>
</div>  
    {visibleAdd && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full max-w-md p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
         <AddNewClassPopup  sectionId={sectionId ?? defaultSectionId} academicYear={year??defaultyear}/>
          </div>
        </div>
      )}
    </div>

     </div>
    
      </div>
      
      </div>
      
  
    
  );
};

export default ClassRooms;
