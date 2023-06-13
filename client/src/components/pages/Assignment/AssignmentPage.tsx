import { useEffect, useState } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, { AccessButton, CloseButton, ExtraTinyDelete, SubmitButton } from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import SubmissionPopup from './SubmissionPopup';
import ChangeDeadlinePopup from './ChangeDeadlinePopup';
import { BiCog } from 'react-icons/bi';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';
import SideBarPrincipal from '../../ui/templates/SideBar/SideBar-Principal';

interface Subject {
  subjectName: string;
}

interface Assignment {
  assignmentId: string;
  classId: string;
  subjectId: string;
  topicId: string;
  assignmentHead: string;
  assignmentBody: string;
  materialId: string;
  dueDate: string;
  docLink: string;
}

interface Submission {
  submissionId:string;
  assignmentId: string;
  studentId: string;
  submissionBody: string;
  submissionDate: string;
  grade: string;
  submissionDocLink: string;
}

  //Delete Submission
  const handleDeleteSubmission = async (submissionId: string) => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove this submission ?');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/assignmentSubmit/${submissionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('Submission deleted successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

function GetSubjectNameBySubjectId({ subjectId }: { subjectId: string }): JSX.Element | null {
  const [subject, setSubject] = useState<Subject | null>(null);
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/subjects/${subjectId}`)
      .then(res => res.json())
      .then(data => setSubject(data))
      .catch(error => console.error(error));
  }, []);

  return subject ? <span>{subject.subjectName}</span> : null;
}

interface ClassRoom {
  classRoomId: string;
}

function GetClassRoomNameByid({ classId }: { classId: string }): JSX.Element | null {
  const [classRoom, setClassRoom] = useState<ClassRoom | null>(null);
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/classrooms/${classId}/classroom`)
      .then(res => res.json())
      .then(data => setClassRoom(data))
      .catch(error => console.error(error));
  }, []);

  return classRoom ? <span>{classRoom.classRoomId}</span> : null;
}

//Get name by user id
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

function AssignmentPage() {
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [visibleAddSubmission, setVisibleAddSubmission] = useState(false);

  const { classId } = useParams<{ classId: string }>();
  const { subjectId } = useParams<{ subjectId: string }>();
  const { topicId } = useParams<{ topicId: string }>();
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [assignment, SetAssignment] = useState<Assignment | null>(null);
  const [submission, SetSubmission] = useState<Submission[]>([]);
  const [visibleChangeDeadline, setVisibleChangeDeadline] = useState(false);

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId.toString());
    }
  }, []);

     //Get Submissions
     useEffect(() => {
       const fetchData = async () => {
         const result = await fetch(`http://localhost:8080/api/v1/assignmentSubmit/assignment/${assignmentId}`); 
         const data = await result.json();
        SetSubmission(data);
      };
     fetchData();
     }, []);


    //Get assignment details
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/assignment/${assignmentId}`)
        .then(res => res.json())
        .then(data => SetAssignment(data))
        .catch(error => console.error(error));
    }, [assignmentId]);

  return (
    <div className="font-nunito">
      <div className="fixed z-20 w-[100%]">
        <HiBars4 
          className={`absolute cursor-pointer  w-24
           fill-slate-100  mr-[82vw] h-12 top-14 bg-[#586B7D] rounded-tr-2xl`}  
          onClick={() => setOpen(!open)}
        />
        <NavBar/> 
      </div>

      <div className="flex "> 
        <div className={` ${open ? "w-[15vw]" : "scale-0"} pt-[14.5vh] z-10 `}>
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
   
        <div className={`flex ${open ? "w-[85vw]" : "w-[100vw]"} min-w-[85vw]`}>
           <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen  ${open ? "w-[85vw]" : "w-[100vw]"}`}>
           <div className={`pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-white rounded-lg`}>
           <div className='text-2xl'>
            Assignment
           </div>
       <div className='flex'>
       <div className='pt-5 text-xl basis-8/12'>
       <GetClassRoomNameByid classId={classId??''}/> |  <GetSubjectNameBySubjectId subjectId={subjectId??''}/>
       </div>
      </div>
     </div>    
    <div className='my-10 bg-sky-200 rounded-2xl'>
     <div className='py-[40px] px-5 font-base text-lg text-slate-700 flex font-medium'>
      <div className="basis-1/3">
        <div className='pr-[49px] p-4'>Assignment topic</div>
        <div className='pr-[100px] p-4'>Instructions</div>
      </div>
      <div className="basis-2/3">
      <div className="p-4">:{assignment?.assignmentHead}</div>
      <div className="p-4">:{assignment?.assignmentBody}</div> 
      </div>
     </div>
     <div className='p-10 ml-[10vw]'>
     <a href={assignment?.docLink}>
      <div className='text-xl font-semibold text-center text-blue-700 border-2 hover:text-red-800 w-[40vw] rounded-xl border-blue-500 hover:border-red-500'>
        Click here to download document!
      </div>
      </a>
      </div>
      </div>
     <br />

     <div className={`p-4`}> 
     {usersRole ==='STUDENT' && (
     <Button name={'Submit'} 
                buttonType={'secondary'} 
                size={'md'}
                onClick={() => { setVisibleAddSubmission(true)}}
                padding={'4'}
                />)}
      </div>  

  <div>
  {usersRole ==='STUDENT' && (
  <div className='ml-[3%] py-[40px] text-2xl font-semibold text-green-900'>Your Submission</div>)}
  {/*Users submission*/}
  {usersRole ==='STUDENT' && (
      <table className="ml-[3%] ">
      <div className='p-5 bg-green-300 rounded-xl'>
            <tbody>
            {submission
              .filter((submission) => submission.studentId ===userId, {/*userId*/})
              .map((submission) => (
                <tr key={submission.submissionId}>
                <td className='py-3 w-[20vw]'>{submission.studentId}</td>
                <td className='py-3 w-[20vw]'><GetNameByuserid userid={submission.studentId}/></td>
                <td className='py-3 w-[20vw]'>
              <span className='text-lg font-semibold text-red-800'>
               {submission?.grade ? `${submission.grade}/100` : 'Not graded yet'}
              </span>
              </td>
                <td className='pr-6 w-[10vw]'><a href={`http://localhost:3000/Submission/${classId}/${subjectId}/${topicId}/${assignmentId}/${submission.submissionId}`}><AccessButton/></a></td>
                <td><button onClick={() => handleDeleteSubmission(submission.submissionId)}><ExtraTinyDelete/></button></td>
               </tr>
             ))}
            </tbody>
            </div>
          </table>)}
          </div>

          {usersRole !=='STUDENT'  && (
          <div className='ml-[3%] py-[20px] text-2xl font-semibold'>Submissions</div>)}
          <div className={`p-4 ml-[2%]`}> 
          {usersRole !=='STUDENT'  && (
          <Button name={'Change Deadline'} 
                buttonType={'tab'} 
                size={'md'}
                onClick={() => { setVisibleChangeDeadline(true)}}
                padding={'4'}
                icon={BiCog}
                />)}
          </div>  
          {/*All submissions*/}
          {usersRole !=='STUDENT'  && (
           <table className="ml-[3%]">
            <div className='ml-[1%] pb-[20px] text-xl font-semibold text-blue-600'>ON TIME SUBMISSIONS</div>
            <div className='p-5 bg-blue-300 rounded-xl'>
            <tbody className=''>
            {submission
              .filter((submission) => submission.assignmentId === assignmentId)
              .filter((submission) => new Date(submission.submissionDate)<new Date( assignment?.dueDate??''))
              .map((submission) => (
              <tr key={submission.submissionId}>
              
              <td className='py-3 w-[20vw]'>{submission.studentId}</td>
              <td className='py-3 w-[20vw]'><GetNameByuserid userid={submission.studentId}/></td>
              <td className='py-3 w-[20vw]'>
              <span className='text-lg font-semibold text-red-800'>
               {submission?.grade ? `${submission.grade}/100` : 'Not graded yet'}
              </span>
              </td>
              <td className='pr-6 w-[10vw]'><a href={`http://localhost:3000/Submission/${classId}/${subjectId}/${topicId}/${assignmentId}/${submission.submissionId}`}><AccessButton/></a></td>
             </tr>
             ))}
            </tbody>
            </div>

            <div className='ml-[1%] pb-[20px] text-xl font-semibold text-red-600'>LATE SUBMISSIONS</div>
            <div className='p-5 bg-red-300 rounded-xl'>
            <tbody>
            {submission
              .filter((submission) => submission.assignmentId === assignmentId)
              .filter((submission) => new Date(submission.submissionDate)>new Date( assignment?.dueDate??''))
              .map((submission) => (
              <tr key={submission.submissionId}>
              
              <td className='py-3 w-[20vw]'>{submission.studentId}</td>
              <td className='py-3 w-[20vw]'><GetNameByuserid userid={submission.studentId}/></td>
              <td className='py-3 w-[20vw]'>
              <span className='text-lg font-semibold text-red-800'>
               {submission?.grade ? `${submission.grade}/100` : 'Not graded yet'}
              </span>
              </td>
              <td className='pr-6 w-[10vw]'><a href={`http://localhost:3000/Submission/${classId}/${subjectId}/${topicId}/${assignmentId}/${submission.submissionId}`}><AccessButton/></a></td>
             </tr>
             ))}
            </tbody>
            </div>

          </table>)}

    </div>    
   </div> 
  </div>
    {visibleAddSubmission && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full h-[40%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAddSubmission(false)}><CloseButton/></button></div>
          <SubmissionPopup assignmentId={assignmentId ?? ''}/>
          </div>
        </div>
      )}
       {visibleChangeDeadline && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-[30%] h-[40%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleChangeDeadline(false)}><CloseButton/></button></div>
          <ChangeDeadlinePopup assignmentId={assignmentId??''}/>
          </div>
        </div>
      )}
        </div>

        
     
  );
};

export default AssignmentPage;
