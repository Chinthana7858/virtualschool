import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, {CloseButton} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import DiscussionReplyPopup from './DiscussionReplyPopup';


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
  const [open, setOpen] = useState(true); 
  const defaultClassId = '';
  const defaultsubjectId='';
  const defaultuserid='';
  const defaultid='';
  const { classId } = useParams<{ classId: string }>();
  const{subjectId}=useParams<{subjectId:string}>();
  const{userid}=useParams<{userid:string}>();
  const {discussionForumId } = useParams<{discussionForumId: string }>();;
  const [visibleAdd, setVisibleAdd] = useState(false);
  const classRoomName=<GetClassRoomNameByid classId={classId??defaultClassId}/>
  const subjectName=<GetSubjectNameBySubjectId subjectId={subjectId??defaultsubjectId}/>

//Delete discussion
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove this discussion? ');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/discussionForum/${discussionForumId}`, {
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
           fill-slate-100  mr-[82vw] h-12 top-14 bg-[#586B7D] rounded-tr-2xl `} onClick={() => setOpen(!open)}/>
      <NavBar/>
    </div>

    <div className="flex">
      
      <div className={` ${open ? "w-[15vw]" : "scale-0"} pt-[14.5vh] duration-100`} >
         <SideBarStudent/>
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
        <tr className="sm:text-xs md:text-md xl:text-base ">
          <th className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] p-[3vh]">Discussion Topic</th>
          <th className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] p-[3vh]">Date </th>
          <th className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] p-[3vh]">Created By</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  

  <tr  className="cursor-pointe sm:text-xs md:text-md xl:text-base ">
    <td className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] h-[10vh] text-center rounded-l-xl">{DiscussionForuminside?.discussionTopic}</td>
    <td className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] h-[10vh] text-center"> {DiscussionForuminside?.dateTime && new Date(DiscussionForuminside.dateTime).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}</td>

    <td className="sm:w-[0vw] md:w-[20vw] xl:w-[30vw] h-[10vh] text-center"><GetNameByuserid userid={DiscussionForuminside?.userid} /></td>
  </tr>

</tbody>
    </table>
    </div>
 
    
    <div className={`bg-cyan-100 pl-[5vw] rounded-lg mt-[2vh] min-h-[20vh] ${visibleAdd ? "blur-sm" : "blur-0"}`}>
    <p className={`p-6 `}>{DiscussionForuminside?.message}</p>
    </div>

    <div className={`flex ${visibleAdd ? "blur-sm" : "blur-0"}`}>
    <div className='p-4 basis-11/12'>
    <Button name="Add a reply" 
            buttonType={'secondary'}  
            size={'lg'} 
            padding={'4'} 
            onClick={() => { setVisibleAdd(true)}}
    />
    </div>

    <div className='p-4 basis-1/12'>
      <BackLink url={`http://localhost:3000/Discussions/${classId}/${subjectId}/${userid}`}>
      <Button name="Remove" 
            buttonType={'secondary-red'}  
            size={'lg'} 
            padding={'4'} 
            onClick={handleDelete}
            icon={AiFillDelete}
    />
    </BackLink>
    </div>
    </div>

   <div className="pt-10">
    <table className={`${visibleAdd ? "blur-sm" : "blur-0"} border-separate border-spacing-10 border border-slate-400`}>
      <thead>
        <tr className="sm:text-xs md:text-md xl:text-base ">
          <th className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] p-[3vh] text-left border border-slate-400 rounded-lg">Replied By</th>
          <th className="sm:w-[0vw] md:w-[30vw] xl:w-[38vw] p-[3vh] text-left border border-slate-400 rounded-lg">Message</th>
          <th></th>
        </tr>
      </thead>
      <tbody className='p-14'>
      {DiscussionForum?.map(discussionForums => (
  <tr key={discussionForums.id} className="cursor-pointer hover:bg-white sm:text-xs md:text-md xl:text-base">
    <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh]  text-left pl-7 rounded-lg"><div className='p-2'><GetNameByuserid userid={discussionForums?.userid} /></div><p className='p-2'>at</p><div className='p-2'>{new Date(discussionForums.dateTime).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}</div></td>
    <td className="sm:w-[0vw] md:w-[50vw] xl:w-[58vw] h-[10vh] text-left rounded-lg"><div className='p-5'>{discussionForums.message}</div></td>
  </tr>
))}

</tbody>
    </table>
    </div>


    {visibleAdd && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full h-[60%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
          <DiscussionReplyPopup classId={classId ?? defaultClassId} subjectId={subjectId ?? defaultsubjectId} userid={userid ?? defaultuserid} id={discussionForumId??defaultid} />
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
