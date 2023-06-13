import { useEffect, useState } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import {  BiMessageSquareCheck } from 'react-icons/bi';
import Button, { CloseButton } from '../../ui/atoms/Buttons';
import SubmissionGradingPopup from './SubmissionGradingPopup';
import SideBarParent from '../../ui/templates/SideBar/SideBar-Parent';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';
import SideBarPrincipal from '../../ui/templates/SideBar/SideBar-Principal';



interface Submission {
  submissionId:string;
  assignmentId: string;
  studentId: string;
  submissionBody: string;
  submissionDate: string;
  grade: string;
  submissionDocLink: string;
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


function SubmissionPage() {
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const { submissionId } = useParams<{submissionId: string }>();
  const [submission, SetSubmission] = useState<Submission | null>(null);
  const [visibleGrading, setVisibleGrading] = useState(false);

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

      //Get submission details
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/assignmentSubmit/${submissionId}`)
        .then(res => res.json())
        .then(data => SetSubmission(data))
        .catch(error => console.error(error));
    }, [submissionId]);

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
            Submission
           </div>
       <div className='flex'>
      </div>
     </div>    

     <div className='my-10 bg-sky-200 rounded-2xl'>
      <div className='py-[40px] px-5 font-base text-lg text-slate-700 flex font-medium'>
      <div className="basis-1/3">
        <div className='pr-[49px] p-4'>Student Id</div>
        <div className='pr-[100px] p-4'>Student Name</div>
        <div className='pr-[100px] p-4'>Submission Date</div>
        <div className='pr-[100px] p-4'>Body</div>
      </div>
      <div className="basis-2/3">
      <div className="p-4">:{submission?.studentId}</div>
      <div className="p-4">:<GetNameByuserid userid={submission?.studentId??''}/></div>

      <div className="p-4">:
        <span className="pr-7">
       Date: {submission?.submissionDate ? new Date(submission.submissionDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'N/A'} 
       </span>
       <span>
       Time: {submission?.submissionDate ? new Date(submission.submissionDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'N/A'}
       </span>
      </div>

      <div className="p-4">:{submission?.submissionBody}</div>
      
      </div>
      
     </div>
     
     <div className='p-10 ml-[10vw]'>
      <a href={submission?.submissionDocLink}>
      <div className='text-xl font-semibold text-center text-blue-700 border-2 hover:text-red-800 w-[40vw] rounded-xl border-blue-500 hover:border-red-500'>
        Click here to download document!
      </div>
      </a>
      </div>
     </div>

        <span className='p-10 w-[50vw] bg-cyan-100 rounded-3xl'>
          <span className='pr-20 text-lg font-semibold text-slate-700'>
            Grade : 
            <span className='text-lg font-semibold text-red-800'>
            {submission?.grade ? `${submission.grade}/100` : 'Not graded yet'}
            </span>
            
         <span className='pl-96'>
         {usersRole ==='TEACHER'  && (
                <Button name={'Grade'} 
                buttonType={'tab-red'} 
                size={'md'}
                padding={'3'}
                onClick={() => {setVisibleGrading(true)}}
                icon={BiMessageSquareCheck}/>)}
              </span>
          </span>

         </span>

    </div>    
   </div> 
  </div>
  {visibleGrading && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full h-[30%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleGrading(false)}><CloseButton/></button></div>
          <SubmissionGradingPopup submissionId={submissionId??''}/>
          </div>
        </div>
      )}
        </div>

        
     
  );
};

export default SubmissionPage;
