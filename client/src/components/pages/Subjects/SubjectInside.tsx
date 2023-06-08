import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiBook, BiBulb, BiCameraMovie, BiCard, BiEdit, BiFolderOpen } from 'react-icons/bi';
import { FiAlignLeft, FiUserPlus } from 'react-icons/fi';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, {CloseButton, ExtraTinyDelete, ViewButton} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import AddNewTopicPopup from './Topic/AddNewTopicPopup';
import { BsChatLeftDots} from 'react-icons/bs';
import AddNewSessionPopup from './Session/AddNewSessionPopup';
import DocumentUploadPopup from './DocumentUploadPopup';
import NewAssignmentPopup from '../Assignment/NewAssignmentPopup';
import ChangeDeadlinePopup from '../Assignment/ChangeDeadlinePopup';
import { ResultsAdd } from '../../ui/atoms/Buttons';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';


interface Assignment {
   assignmentId:string;
   classId:string;
   subjectId:string;
   topicId:string;
   assignmentHead:string;
   assignmentBody:string;
   dueDate:string;
   docLink:string;
}


interface LearningMaterial {
  materialId:string;
  materialName:string;
  topicId:string;
  date:string;
  materialLink:string;
}

interface Link {
  sessionId:string;
  topicId: string;
  date:string;
  startingTime:string;
  link:string;
}
interface Topic {
  topicId:string;
  topicName:string;
  subjectId:string;
  date:Date;
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
  const [topic, setTopic] = useState<Topic[]>([]);
  const [link, setlink] = useState<Link[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [visibleAddTopic, setVisibleAddTopic] = useState(false);
  const [visibleAddSession, setVisibleAddSession] = useState(false);
  const [visibleAddDoc, setVisibleAddDoc] = useState(false);
  const [visibleAddAss, setVisibleAddAss] = useState(false);
  const { classId } = useParams<{ classId: string }>();
  const { subjectId } = useParams<{ subjectId: string }>();
  const defaultclassId='';
  const subjectName=<GetSubjectNameBySubjectId subjectId={subjectId??defaultclassId}/>
  const teacherId=GetTeacherIdBySubjectId ({ subjectId: subjectId ?? '' });
  const teacherName=<GetNameByuserid userid={teacherId}/>
  const [topicId, setTopicId] = useState(""); 
  const [assignmentId, setAssignmentId] = useState(""); 
  const [learningMaterial, setLearningMaterial] = useState<LearningMaterial[]>([]);
  const [assignment, SetAssignment] = useState<Assignment[]>([]);

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);
  
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

     
  const handleRemoveTopic = async (topicId: string) => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove this topic ? You will lose all details related to this topic');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/topic/${topicId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('Topic removed successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove this session link ?');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('Topic removed successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Delete learning material
  const handleDeleteMaterial = async (materialId: string) => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove this document ?');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/learning-materials/${materialId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('Document removed successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

   //Delete learning material
   const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove this assignment ?');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/assignment/${assignmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('Assignment removed successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  //Get topics
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/topic/subject/${subjectId}`); 
      const data = await result.json();
      setTopic(data);
    };

    fetchData();
  }, []);

         //Get Materials
         useEffect(() => {
          const fetchData = async () => {
            const result = await fetch(`http://localhost:8080/api/v1/learning-materials`); 
            const data = await result.json();
            setLearningMaterial(data);
          };
      
          fetchData();
        }, []);


        //Get Assignments
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(`http://localhost:8080/api/v1/assignment/subjects/${subjectId}`); 
        const data = await result.json();
        SetAssignment(data);
      };
  
      fetchData();
    }, []);

    //Get links
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(`http://localhost:8080/api/v1/sessions`); 
        const data = await result.json();
        setlink(data);
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
      </div>
   
     
     <div className={`flex ${open ? "w-[85vw]" : "w-[100vw]"} min-w-[85vw]`}>

     <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen  ${open ? "w-[85vw]" : "w-[100vw]"}`}>
   

        
    <div className={`pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-white rounded-lg`}>
     <div className='text-2xl'>
     {subjectName} 
     </div>
     <div className='flex'>
       <div className='pt-5 text-xl basis-8/12'>
        Teacher - {teacherName}
       </div>
       <div className='pr-1 basis-1/12'>

       {usersRole ==='ADMIN' && (
       <a href={`http://localhost:3000/AssignSubT1/${subjectId}`}>
        <Button name={'Assign'} 
                buttonType={'primary'} 
                size={'md'}
                padding={'3'}
                icon={FiUserPlus}/>
        </a>)}

       </div>
       <div className='pl-2 basis-1/12'>
       {usersRole ==='ADMIN' && (
       <BackLink url={`http://localhost:3000/Subject/${classId}/uid/${subjectId}`}>
       <Button name={'Remove'} 
                buttonType={'primary-red'} 
                size={'md'}
                padding={'3'}
                onClick={handleRemoveTeacher}
                icon={AiFillDelete }/>
        </BackLink>)}
       </div>
       <div>
    </div>

      </div>
    </div>
    
    <div className='flex pb-10'>
    {usersRole ==='TEACHER' && (
    <div className={`py-4 basis-2/12 `}>
    <Button name={'Create topic'} 
                buttonType={'tab'} 
                size={'lg'}
                padding={'4'}
                onClick={() => { setVisibleAddTopic(true)}}
                icon={BiCard}/>

    </div>)}

    <div className={`py-4  basis-2/12`}>
      <a href={`http://localhost:3000/Discussions/${classId}/${subjectId}/00`}>
      <Button name={'Discussion forum'} 
                buttonType={'tab'} 
                size={'lg'}
                padding={'4'}
                icon={FiAlignLeft}/>
      </a>
    </div>
    {usersRole !=='STUDENT' && (
    <div className='py-4 basis-2/12'>
    <a href={`http://localhost:3000/Results/${classId}/${subjectId}`}>
    <Button name={'Exam results'} 
                buttonType={'tab'} 
                size={'lg'}
                padding={'4'}
                icon={BiBook}/>
      </a>
    </div>)}

    {usersRole ==='TEACHER'||usersRole==='PRINCIPAL' && (
    <div className='py-4 basis-2/12'>
    <a href={`http://localhost:3000/teacherFeedback/${classId}/${subjectId}`}>
    <Button name={'Feedback'} 
                buttonType={'tab'} 
                size={'lg'}
                padding={'4'}
                icon={BsChatLeftDots}/>
      </a>
    </div>)}
    </div>

    <div>

    <table className={``}>
      <tbody>
        {topic.map(topic => (
          <>

          <tr key={topic.topicId} className="bg-cyan-100">
            <td className="w-[60vw] h-[6vh] text-left p-4 text-xl pb-4 font-semibold text-indigo-800">{topic.topicName}</td>
            <td className="w-[18vw] h-[6vh] text-center pb-4">{new Date(topic.date).toLocaleDateString()}</td>
          </tr>

          <tr className="">
          <td className='p-4 pl-8 text-lg font-medium text-slate-700'>Sessions</td>
          <td className="w-[18vw]"></td>
          </tr>

          <table className="ml-[7%]">
            <th>
              <td className='pr-[100px] text-slate-600'>Date</td>
            </th>
            <th>
              <td className='px-[100px] text-slate-600'>Time</td>
            </th>
            <th>
              <td className='px-[100px] text-slate-600'>Link</td>
            </th>
            <tbody className="hover:bg-cyan-200">
            {link
              .filter((link) => link.topicId === topic.topicId)
              .map((link) => (
              <tr key={link.sessionId}>
              <td className='w-[100px]'>{link.date}</td>
              <td className='w-[100px] pl-[100px]'>{link.startingTime}</td>
              <td className='w-[100px] pl-[20px]'>
              <a href={link.link} target="_blank" className="font-medium text-blue-700 ">
               Click here to join the lecture!
              </a>
              </td>
              <td className='sm:w-[0vw] md:w-[10vw] xl:w-[25vw] h-[7vh] text-center pl-[40px]'>
              {usersRole ==='TEACHER' && (
                <button onClick={() => handleDeleteSession(link.sessionId)}><ExtraTinyDelete/></button>)}
            </td>
             </tr>
             ))}
            </tbody>
          </table>
          <tr>
          <td className='p-4 pl-8 text-lg font-medium text-slate-700'>Assignments</td>
          <td className="w-[18vw]"></td>
          </tr>


          <table className="ml-[7%]">
            <th>
              <td className='pr-[0px] text-slate-600'>Deadline</td>
            </th>
            <th>
              <td className='pr-[100px] text-slate-600'>Description</td>
            </th>
            <th>
              <td className='px-[100px] text-slate-600'></td>
            </th>
           <tbody>
           {assignment
             .filter((assignment) => assignment.topicId === topic.topicId).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
             .map((assignment) => (
          
             <tr key={assignment.assignmentId} className='hover:bg-cyan-200'>
             
             <td className="sm:w-[0vw] md:w-[10vw] xl:w-[58vw] h-[5vh]  text-left "><div className="">{new Date(assignment.dueDate).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
             })}</div>
             </td>

             <td className='h-[5vh]'>
              {assignment.assignmentHead}
             </td>

             <td className='sm:w-[0vw] md:w-[10vw] xl:w-[38vw] h-[5vh] text-center"'>
               <a href={`http://localhost:3000/Assignment/${classId}/${subjectId}/${topic.topicId}/${assignment.assignmentId}`}><ViewButton/></a>
             </td>
             
             <td className='sm:w-[0vw] md:w-[10vw] xl:w-[25vw] h-[7vh] text-center"'>
             {usersRole ==='TEACHER' && (
               <button onClick={() => handleDeleteAssignment(assignment.assignmentId)}><ExtraTinyDelete/></button>)}
             </td>
            </tr>
            ))} 
           </tbody>
         </table>




          <tr className="">
          <td className='p-4 pl-8 text-lg font-medium text-slate-700'>Documents</td>
          <td className="w-[18vw]"></td>
          </tr>

          <table className="ml-[7%]">
           
           <tbody>
           {learningMaterial
             .filter((learningMaterial) => learningMaterial.topicId === topic.topicId)
             .map((learningMaterial) => (
             <tr key={learningMaterial.materialId} className='hover:bg-cyan-200'>
             
             <td className="sm:w-[0vw] md:w-[10vw] xl:w-[38vw] h-[5vh]  text-left "><div className="">{new Date(learningMaterial.date).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour12: true,
             })}</div>
             </td>

             <td className=''>
             <a href={learningMaterial.materialLink} className="font-medium text-blue-700 ml-[0vw]">
              {learningMaterial.materialName}
             </a>
             </td>

             <td className='sm:w-[0vw] md:w-[10vw] xl:w-[25vw] h-[7vh] text-center pl-[11vw]'>
             {usersRole ==='TEACHER' && (
               <button onClick={() => handleDeleteMaterial(learningMaterial.materialId)}><ExtraTinyDelete/></button>)}
             </td>
            </tr>
            ))}
           </tbody>
         </table>


          <tr className="">
          <td className='p-4 pl-8 text-lg font-medium text-slate-700'>Quizzes</td>
          <td className="w-[18vw]"></td>
          </tr>
          {usersRole !=='STUDENT' && (
          <tr key={topic.topicId} className="">
            <div className='flex w-[30vw] pb-10'>
              <div>
              <td className="h-[6vh] text-left opacity-75">
                <Button name={'Session'} 
                buttonType={'tab'} 
                size={'md'}
                padding={'3'}
                onClick={() => {
                  setTopicId(topic.topicId);
                  setVisibleAddSession(true);
                }}
                icon={BiCameraMovie}/>
              </td>
              </div>
              <div>
              <td className="h-[6vh] text-left opacity-75"> 
                <Button name={'Assignment'} 
                buttonType={'tab'} 
                size={'md'}
                padding={'3'}
                icon={BiEdit}
                onClick={() => {
                  setTopicId(topic.topicId);
                  setVisibleAddAss(true);
                }}
                />
            
              </td>
              </div>
              <div>
              <td className="h-[6vh] text-left opacity-75">
                <Button name={'Document'} 
                buttonType={'tab'} 
                size={'md'}
                padding={'3'}
                onClick={() => { setVisibleAddDoc(true); setTopicId(topic.topicId)}}
                icon={BiFolderOpen}/>
              </td>
              </div>
              <div>
              <td className="h-[6vh] text-left opacity-75">
                <Button name={'Quiz+'} 
                buttonType={'tab'} 
                size={'md'}
                padding={'3'}
                icon={BiBulb}/>
              </td>
              </div>
              <div>
              <td className="h-[6vh] text-left opacity-75">
                <Button name={'Remove'} 
                onClick={() => {handleRemoveTopic(topic.topicId)}}
                buttonType={'tab-red'} 
                size={'md'}
                padding={'3'}
                icon={AiFillDelete}/>
              </td>
              </div>
              </div>
          </tr>)}

          </>
        ))}
      </tbody>
    </table>
    </div>
  
    <div className={`p-4`}>
       <div className=" ml-[68%]">
       {usersRole ==='ADMIN' && (
        <Button name={'Remove subject'} 
                buttonType={'secondary-red'} 
                size={'md'}
                padding={'3'}
                onClick={handleDelete}
                icon={AiFillDelete }/>)}
        </div>
    </div>

    {visibleAddTopic && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full h-[30%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAddTopic(false)}><CloseButton/></button></div>
          <AddNewTopicPopup subjectId={subjectId ?? ''}/>
          </div>
        </div>
      )}
      {visibleAddSession && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full h-[40%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAddSession(false)}><CloseButton/></button></div>
          <AddNewSessionPopup topicId={topicId ?? ''}/>
          </div>
        </div>
      )}
    
    {visibleAddDoc && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full h-[40%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAddDoc(false)}><CloseButton/></button></div>
          <DocumentUploadPopup topicId={topicId ?? ''}/>
          </div>
        </div>
      )}

    {visibleAddAss && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full h-[80%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAddAss(false)}><CloseButton/></button></div>
          <NewAssignmentPopup topicId={topicId ?? ''} classId={classId??''} subjectId={subjectId??''}/>
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
