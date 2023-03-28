import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiBook, BiCard } from 'react-icons/bi';
import { FiAlignLeft, FiUserPlus } from 'react-icons/fi';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, {CloseButton} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import AddNewTopicPopup from './Topic/AddNewTopicPopup';



interface Subject {
  subjectId:string;
  classRoomId: string;
  subjectName:string;
  teacherId:string;
}


interface ViewLinkProps {
    url: string;
    children?: React.ReactNode;
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


  interface BackLinkProps {
    url: string;
    children?: React.ReactNode;
  }
  const BackLink: React.FC<BackLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );

const SubjectInside: React.FC = () => {
  const [subject, setSubject] = useState<Subject[]>([]);
  const [open, setOpen] = useState(true); 
  const [visibleAdd, setVisibleAdd] = useState(false);
  const { classId } = useParams<{ classId: string }>();
  const { subjectId } = useParams<{ subjectId: string }>();
  const defaultclassId='';
  const subjectName=<GetSubjectNameBySubjectId subjectId={subjectId??defaultclassId}/>
  const teacherId=GetTeacherIdBySubjectId ({ subjectId: subjectId ?? '' });
  const teacherName=<GetNameByuserid userid={teacherId}/>


  
  const handleRemoveTeacher = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove the teacher from this subject?');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/subjects/${subjectId}/teacher/null`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }, 
      });
  
      if (response.ok) {
        alert('teacher removed successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

   
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove this subject ? You will lose all details related to this subject');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/subjects/${subjectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('Class room removed successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );

  //Get teacher id by subject id
  function GetTeacherIdBySubjectId({ subjectId }: { subjectId: string }): string {
    interface Subject {
      teacherId: string;
    }
    const [subject, setSubject] = useState<Subject | null>(null);
  
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/subjects/${subjectId}`)
        .then((res) => res.json())
        .then((data) => setSubject(data))
        .catch((error) => console.error(error));
    }, []);
  
    return subject ? subject.teacherId : "";
  }

//Get name by user id
  function GetNameByuserid({ userid }: { userid: string }): JSX.Element | null{
    interface User {
  
      nameWithInitials:string;
    
    }
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/users/${teacherId}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }, [userid]);
  
    return user ? <span>{user.nameWithInitials}</span> : null;
  }

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
   
     
     <div className={`flex ${open ? "w-[85vw]" : "w-[100vw]"} min-w-[85vw]`}>

    <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen  ${open ? "w-[85vw]" : "w-[100vw]"}`}>
   

        
    <div className={`pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-white  ${visibleAdd ? "blur-sm" : "blur-0"} rounded-lg`}>
     <div className='text-2xl'>
     {subjectName} 
     </div>
     <div className='flex'>
       <div className='pt-5 text-xl basis-8/12'>
        Teacher - {teacherName}
       </div>
       <div className='pr-1 basis-1/12'>
       <a href={`http://localhost:3000/AssignSubT1/${subjectId}`}>
        <Button name={'Assign'} 
                buttonType={'primary'} 
                size={'md'}
                padding={'3'}
                icon={FiUserPlus}/>
        </a>
       </div>
       <div className='pl-2 basis-1/12'>
       <BackLink url={`http://localhost:3000/Subject/${classId}/uid/${subjectId}`}>
       <Button name={'Remove'} 
                buttonType={'primary-red'} 
                size={'md'}
                padding={'3'}
                onClick={handleRemoveTeacher}
                icon={AiFillDelete }/>
        </BackLink>
       </div>
       <div>
    </div>

      </div>
    </div>
    
    <div className='flex'>
    <div className={`py-4 basis-2/12 ${visibleAdd ? "blur-sm" : "blur-0"}`}>
    <Button name={'Create topic'} 
                buttonType={'tab'} 
                size={'lg'}
                padding={'4'}
                onClick={() => { setVisibleAdd(true)}}
                icon={BiCard}/>

    </div>
    <div className={`py-4 ${visibleAdd ? "blur-sm" : "blur-0"} basis-2/12`}>
      <a href={`http://localhost:3000/Discussions/${classId}/${subjectId}/00`}>
      <Button name={'Discussion forum'} 
                buttonType={'tab'} 
                size={'lg'}
                padding={'4'}
                icon={FiAlignLeft}/>
      </a>
    </div>
    <div className='py-4 basis-2/12'>
    <a href={`http://localhost:3000/Results/${classId}/${subjectId}`}>
    <Button name={'Exam results'} 
                buttonType={'tab'} 
                size={'lg'}
                padding={'4'}
                icon={BiBook}/>
      </a>
    </div>
    </div>

    <div className={`p-4  ${visibleAdd? "blur-sm" : "blur-0"}`}>
       <div className=" ml-[68%]">
        <Button name={'Remove subject'} 
                buttonType={'secondary-red'} 
                size={'md'}
                padding={'3'}
                onClick={handleDelete}
                icon={AiFillDelete }/>
        </div>
    </div>

    {visibleAdd && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full h-[30%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
          <AddNewTopicPopup subjectId={subjectId ?? defaultclassId}/>
          </div>
        </div>
      )}
    

    </div>
  
    </div>

     </div>
     
    
      </div>
 
      
  
    
  );
};

export default SubjectInside;
