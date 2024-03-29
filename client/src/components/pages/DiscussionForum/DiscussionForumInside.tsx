import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, {CloseButton} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import DiscussionReplyPopup from './DiscussionReplyPopup';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';
import SideBarPrincipal from '../../ui/templates/SideBar/SideBar-Principal';


interface DiscussionForuminside {
  id:string,
  discussionTopic: string,
  classId: string,
  subjectId: string
  userid: string,
  message: string,
  motherDiscussionId: string,
  dateTime: Date
}

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
function GetNameByuserid({ userid }: { userid?: string }): JSX.Element | null{
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

interface BackLinkProps {
  url: string;
  children?: React.ReactNode;
}
const BackLink: React.FC<BackLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);

const DiscussionForuminside: React.FC = () => {
  const [DiscussionForuminside, setDiscussionForuminside] = useState<DiscussionForuminside | null>(null);
  const [DiscussionForum, setDiscussionForum] = useState<DiscussionForums[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const defaultClassId = '';
  const defaultsubjectId='';
  const defaultid='';
  const { classId } = useParams<{ classId: string }>();
  const{subjectId}=useParams<{subjectId:string}>();
  const{userid}=useParams<{userid:string}>();
  const {discussionForumId } = useParams<{discussionForumId: string }>();;
  const [visibleAdd, setVisibleAdd] = useState(false);
  const classRoomName=<GetClassRoomNameByid classId={classId??defaultClassId}/>
  const subjectName=<GetSubjectNameBySubjectId subjectId={subjectId??defaultsubjectId}/>


  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId.toString());
    }
  }, []);


  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

//Delete discussion
  const handleDelete = async (passeddiscussionForumId:string) => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove this discussion? ');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/discussionForum/${passeddiscussionForumId}`, {
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
    

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/discussionForum/${discussionForumId}`)
      .then(res => res.json())
      .then(data => setDiscussionForuminside(data))
      .catch(error => console.error(error));
  }, [discussionForumId]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/discussionForum/motherDiscussion/${discussionForumId}`); 
      const data = await result.json();
      setDiscussionForum(data);
    };

    fetchData();
  }, []);


  return (
    <div>

    <div className="fixed z-20 w-[100%]">
    <HiBars4  
          className={`absolute cursor-pointer  w-24
           fill-slate-100  mr-[82vw] h-12 xl:top-14 lg:top-12 md:top-10 sm:top-8 xs:top-6 bg-[#586B7D] rounded-tr-2xl `} onClick={() => setOpen(!open)}/>
      <NavBar/>
    </div>

    <div className="flex">
      
      <div className={` ${open ? "w-[15vw]" : "scale-0"} xl:pt-24 lg:pt-20 sm:pt-16 xs:pt-12 duration-100 z-10`} >
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
   
     
     <div className={`${open ? "w-[85vw]" : "w-[100vw]"} duration-100 flex`}>

    <div className="bg-slate-300 p-[5%] mt-[13vh] ">
        <h1 className={`text-3xl p-[2%] text-slate-700 font-medium ${visibleAdd ? "blur-sm" : "blur-0"}`}> {classRoomName}</h1>
   

        
    <h1 className={`pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl font-medium text-white rounded-xl ${visibleAdd ? "blur-sm" : "blur-0"}`}>
    {subjectName} Discussion Forum
    </h1>

    <div className="pt-3">
    <table className={`rounded-md bg-white ${visibleAdd ? "blur-sm" : "blur-0"}`}>
      <thead>
        <tr className="font-light sm:text-xs md:text-md xl:text-base ">
          <th className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] p-[3vh] text-left">Discussion Topic</th>
          <th className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] p-[3vh] text-left">Date </th>
          <th className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] p-[3vh] text-left">Created By</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  

  <tr className="cursor-pointe sm:text-xs md:text-md xl:text-base ">
    <td className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] h-[10vh] text-left rounded-l-xl p-[3vh]">{DiscussionForuminside?.discussionTopic}</td>
    <td className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] h-[10vh] text-left p-[3vh]"> {DiscussionForuminside?.dateTime && new Date(DiscussionForuminside.dateTime).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}</td>

    <td className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] h-[10vh] text-left p-[3vh]"><GetNameByuserid userid={DiscussionForuminside?.userid} /></td>
  </tr>

</tbody>
    </table>
    </div>
 
    
    <div className={`bg-cyan-100 pl-[5vw] rounded-lg mt-[2vh] ${visibleAdd ? "blur-sm" : "blur-0"}`}>
    <p className={`p-6 `}>{DiscussionForuminside?.message}</p>
    </div>

    <div className={`flex ${visibleAdd ? "blur-sm" : "blur-0"}`}>
    <div className='p-4 basis-11/12'>
    <Button name="Reply"
            buttonType={'secondary'}  
            size={'md'} 
            padding={'3'} 
            onClick={() => { setVisibleAdd(true)}}
    />
    </div>

    <div className='p-4 basis-1/12'>
    {usersRole ==='TEACHER'||usersRole==='ADMIN' && (
      <BackLink url={`http://localhost:3000/Discussions/${classId}/${subjectId}/${userid}`}>
      <Button name="Remove" 
            buttonType={'secondary-red'}  
            size={'md'} 
            padding={'3'} 
            onClick={() => {handleDelete(discussionForumId??'')}}
            icon={AiFillDelete}
    />
    </BackLink>)}
    </div>
    </div>


    
    <div className="pt-10">
    <table className={`${visibleAdd ? "blur-sm" : "blur-0"} `}>
        <tbody className="">
        {DiscussionForum?.filter((discussionForums) => discussionForums.userid ===userId).map(discussionForums => (
         <>
          <tr className="text-xl">
            <div className='py-3 font-semibold text-blue-800'>
            <a href={`http://localhost:3000/user/${discussionForums.userid}`}> <GetNameByuserid userid={discussionForums?.userid} />(me)</a>
            </div>
          </tr>
          <tr className="text-medium">
            <div className='font-medium'>
            {new Date(discussionForums.dateTime).toLocaleString("en-US", {
             year: "numeric",
             month: "2-digit",
             day: "2-digit",
             hour: "2-digit",
             minute: "2-digit",
             second: "2-digit",
             hour12: true,
            })}
            </div>
         </tr>
         <tr className="h-[10vh]">
           <div className='p-3 bg-green-100 rounded-xl'>
           {discussionForums.message}
           </div>
           <br />
         </tr>
       </>
      ))}
    </tbody>
  </table>
</div>





   <div className="pt-10">
    <table className={`${visibleAdd ? "blur-sm" : "blur-0"} `}>
        <tbody className="">
        {DiscussionForum?.filter((discussionForums) => discussionForums.userid !==userId).map(discussionForums => (
         <>
          <tr className="text-xl">
            <div className='py-3 font-semibold text-blue-800'>
           <a href={`http://localhost:3000/user/${discussionForums.userid}`}> <GetNameByuserid userid={discussionForums?.userid} /></a>
            </div>
          </tr>
          <tr className="text-medium">
            <div className='font-medium'>
            {new Date(discussionForums.dateTime).toLocaleString("en-US", {
             year: "numeric",
             month: "2-digit",
             day: "2-digit",
             hour: "2-digit",
             minute: "2-digit",
             second: "2-digit",
             hour12: true,
            })}
            </div>
         </tr>
         <tr className="h-[10vh]">
           <div className='p-3 bg-cyan-100 rounded-xl'>
           {discussionForums.message}
           </div>
           <br />
         </tr>
       </>
      ))}
    </tbody>
  </table>
</div>


    {visibleAdd && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full h-[60%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
          <DiscussionReplyPopup classId={classId ?? defaultClassId} subjectId={subjectId ?? defaultsubjectId} id={discussionForumId??defaultid} />
          </div>
        </div>
      )}

    </div>

     </div>
    
      </div>
      
      </div>
      
  
    
  );
};

export default DiscussionForuminside;
