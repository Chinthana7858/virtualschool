import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, { CloseButton, ViewButton } from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import AddNewDiscussionPopup from './AddNewDiscussionPopup';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';
import SideBarPrincipal from '../../ui/templates/SideBar/SideBar-Principal';


interface ViewLinkProps {
  url: string;
  children?: React.ReactNode;
}

const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);


interface DiscussionForums {
  id:string,
  discussionTopic: string,
  classId: string,
  subjectId: string
  userid: string,
  message: string,
  motherDiscussionId: string,
  dateTime: Date
}

//Get users name by userid
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



//Get classRoom name by classRoomId
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

//Get subject name by subjectId
function GetSubjectNameBySubjectId({ subjectId }: { subjectId: string }): JSX.Element | null{
  interface Subject {
    subjectName:string;
  }
  const [subject, setSubject] = useState<Subject | null>(null);
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/subjects/${subjectId}`)
      .then(res => res.json())
      .then(data => setSubject(data))
      .catch(error => console.error(error));
  }, []);

  return subject ? <span>{subject.subjectName}</span> : null;
}



const DiscussionForums: React.FC = () => {
  const [DiscussionForum, setDiscussionForum] = useState<DiscussionForums[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open)); 
  const defaultClassId = '';
  const defaultsubjectId='';
  const defaultuserid='';
  const { classId } = useParams<{ classId: string }>();
  const{subjectId}=useParams<{subjectId:string}>();
  const{userid}=useParams<{userid:string}>();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const classRoomName=<GetClassRoomNameByid classId={classId??defaultClassId}/>
  const subjectName=<GetSubjectNameBySubjectId subjectId={subjectId??defaultsubjectId}/>

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/discussionForum/${classId}/${subjectId}/0`); 
      const data = await result.json();
      setDiscussionForum(data);
    };

    fetchData();
  }, []);



  return (
    <div>
  
      <div className="fixed z-20 w-full">
        <HiBars4
          className={`absolute cursor-pointer w-24 fill-slate-100 mr-[86%] h-12 xl:top-14 lg:top-12 sm:top-10 xs:top-8 bg-[#586B7D] rounded-tr-2xl xl:scale-100 lg:scale-90 md:scale-75 sm:scale-75 xs:scale-75`}
          onClick={() => setOpen(!open)}
        />
        <NavBar />
      </div>
  
      <div className="flex">
  
        <div className={` ${open ? "w-[15vw]" : "scale-0"} xl:pt-[14.5vh] lg:pt-[14.5vh] md:pt-[14vh] sm:pt-[13vh] xs:pt-[12vh] z-10 duration-100`}>
          {usersRole === 'ADMIN' && (
            <SideBarAdmin />
          )}
          {usersRole === 'TEACHER' && (
            <SideBarTeacher />
          )}
          {usersRole === 'PARENT' && (
            <SideBarParent />
          )}
          {usersRole === 'STUDENT' && (
            <SideBarStudent />
          )}
          {usersRole === 'PRINCIPAL' && (
            <SideBarPrincipal />
          )}
        </div>
   
     
     <div className={`flex ${open ? "w-[85vw]" : "w-[100vw]"}`}>

    <div className={`bg-slate-300 p-[5%] mt-[13vh] min-h-screen`}>
        <h1 className={`text-3xl p-[2%] text-slate-700 font-medium ${visibleAdd ? "blur-sm" : "blur-0"}`}> {classRoomName}</h1>
   

        
    <h1 className={`pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[3vh] text-xl font-medium text-white rounded-lg ${visibleAdd ? "blur-sm" : "blur-0"}`}>
    {subjectName} Discussion Forum
    </h1>

    
    <div className={`${visibleAdd ? "blur-sm" : "blur-0"} py-3`}>
    <Button name="Add new discussion topic" 
            buttonType={'secondary'} 
            size={'xl'} 
            padding={'4'} 
            onClick={() => { setVisibleAdd(true)}}
    />
    </div>

   

    <table className={`${visibleAdd ? "blur-sm" : "blur-0"}`}>
      <thead>
        <tr className="sm:text-xs md:text-md xl:text-base ">
          <th className="sm:w-[0vw] md:w-[20vw] xl:w-[28vw] p-[3vh] text-left">Discussion Topic</th>
          <th className="sm:w-[0vw] md:w-[20vw] xl:w-[28vw] p-[3vh]">Date </th>
          <th className="sm:w-[0vw] md:w-[20vw] xl:w-[28vw] p-[3vh]">Created By</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  {DiscussionForum.map(discussionForums => (
    
    <tr key={discussionForums.id} className="bg-white cursor-pointer hover:bg-cyan-50 sm:text-xs md:text-md xl:text-base">
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[20vw] h-[10vh] text-left pl-8">{discussionForums.discussionTopic}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[20vw] h-[10vh] text-center"> {discussionForums?.dateTime && new Date(discussionForums.dateTime).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[20vw] h-[10vh] text-center"> <GetNameByuserid userid={discussionForums.userid} /></td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[20vw] h-[10vh] text-center"><ViewLink url={`http://localhost:3000/Discussion/${classId}/${subjectId}/${userid}/${discussionForums.id}`}><ViewButton/></ViewLink></td>
    </tr>
  
    
  ))}
</tbody>
    </table>

    {visibleAdd && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full h-[60%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
          <AddNewDiscussionPopup classId={classId ?? defaultClassId} subjectId={subjectId ?? defaultsubjectId} userid={userid ?? defaultuserid}  />
          </div>
        </div>
      )}

    </div>

     </div>
    
      </div>
      
      </div>
      
  
    
  );
};

export default DiscussionForums;
