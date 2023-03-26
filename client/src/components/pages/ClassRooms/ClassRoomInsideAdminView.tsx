import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiWindowAlt } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, { AccessButton,CloseButton,ViewButton } from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import AddNewSubjectPopup from '../Subjects/AddNewSubjectPopup';



interface Subject {
  subjectId:string;
  classRoomId: string;
  subjectName:string;
  teacherId:string;
}

interface User {
  userid: string;
  userRole:string;
  nameWithInitials:string;
  fullName:string;
  phoneNo: string;
  dateOfBirth:string;
  email:string;
  nic:string;
}

interface ViewLinkProps {
    url: string;
    children?: React.ReactNode;
  }


  function GetClassRoomNameByid({classId }: { classId: string }): JSX.Element | null{
    interface ClassRoom {
  
      classRoomId:string;
    
    }
    const [classRoom, setClassRoom] = useState<ClassRoom | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/vi/classrooms/${classId}/classroom`)
        .then(res => res.json())
        .then(data => setClassRoom(data))
        .catch(error => console.error(error));
    }, []);
  
    return classRoom ? <span>{classRoom.classRoomId}</span> : null;
  }

  interface BackLinkProps {
    url: string;
    children?: React.ReactNode;
  }
  const BackLink: React.FC<BackLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );


const ClassRoomInsideAdminview: React.FC = () => {
  const [subject, setSubject] = useState<Subject[]>([]);
  const [open, setOpen] = useState(true); 
  const [visibleAdd, setVisibleAdd] = useState(false);
  const defaultclassRoomId='';
  const [usersStudent, setUsersStudent] = useState<User[]>([]);
  const { classId } = useParams<{ classId: string }>();
  const { year } = useParams<{ year: string }>();
  const { sectionId } = useParams<{ sectionId: string }>();
  const teacherInChargeId = GetTeacherInChargeIdbyclassId({ classId: classId ?? '' });
  const classRoomName=<GetClassRoomNameByid classId={classId??defaultclassRoomId}/>

  const teacherInchargeName=<GetNameByuserid userid={teacherInChargeId??defaultclassRoomId}/>
  

  const handleRemoveTeacherInCharge = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to Remove the section head from this section?');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/vi/classrooms/${classId}/teacher/null`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('Section head removed successfully');
        window.location.reload(); // Reload the page
      }
    } catch (error) {
      console.error(error);
    }
  };


  const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );

  function GetTeacherInChargeIdbyclassId({classId }: { classId: string }): string | null {
    interface ClassRoom {
      teacherInChargeId: string;
    }
    const [classRoom, setClassRoom] = useState<ClassRoom | null>(null);
  
    useEffect(() => {
      fetch(`http://localhost:8080/api/vi/classrooms/${classId}/classroom`)
        .then(res => res.json())
        .then(data => setClassRoom(data))
        .catch(error => console.error(error));
    }, []);
  
    return classRoom?.teacherInChargeId || null;
  }


  
  function GetNameByuserid({ userid }: { userid: string }): JSX.Element | null{
    interface User {
  
      nameWithInitials:string;
    
    }
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/vi/users/${userid}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }, [userid]);
  
    return user ? <span>{user.nameWithInitials}</span> : null;
  }
  

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/vi/subjects/classRoomId/${classId}`); 
      const data = await result.json();
      setSubject(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/vi/users/class/${classId}`); 
      const data = await result.json();
      setUsersStudent(data);
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
   
     
     <div className={`flex `}>

    <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen ${open ? "w-[85vw]" : "w-[100vw]"}`}>
    
    <div className={`rounded-lg bg-gradient-to-r from-[#586B7D] to-slate-300 ${visibleAdd ? "blur-sm" : "blur-0"}`}>
    <div className={`pl-[30px]  p-[2vh] text-3xl font-medium text-white rounded-lg`}>
    {classRoomName}
    </div>
    <div className='flex pl-[30px]  p-[2vh]'>
      <div className='text-xl text-white basis-8/12'>Teacher in charge - {teacherInchargeName}</div>
    <div className='pr-1 basis-1/12'>
    <a href={`http://localhost:3000/AssignTIC1/${classId}`}>
        <Button name={'Assign'} 
                buttonType={'primary'} 
                size={'md'}
                padding={'3'}
                icon={FiUserPlus}/>
        </a>
      </div>
      <div className='pl-1 basis-1/12'>
     <Button name={'Remove'} 
                buttonType={'primary-red'} 
                size={'md'}
                padding={'3'}
                icon={AiFillDelete}
                onClick={handleRemoveTeacherInCharge}
                />
     </div>
      </div>
    </div>
   

    
  <div className={`p-5  ${visibleAdd? "blur-sm" : "blur-0"}`}>
    <a href={`http://localhost:3000/timetable/${classId}`}>
    <Button name={'Time table'} 
                buttonType={'secondary'} 
                size={'md'}
                padding={'4'}
                icon={BiWindowAlt}
                />
    </a>

  </div>

    <table className={` ${visibleAdd? "blur-sm" : "blur-0"}`}>
      <thead>
        <tr className="sm:text-xs md:text-md xl:text-base">
          <th className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] p-[3vh] text-left pl-16">Subject Name</th>
          <th className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] p-[3vh] text-left pl-16">Teacher</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  {subject.map(subject => (
    <tr key={subject.subjectId} className="bg-slate-400 hover:bg-white sm:text-xs md:text-md xl:text-base">
      <td className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[10vh] text-left pl-16">{subject.subjectName}</td>
      <td className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[10vh] text-left pl-16">{<GetNameByuserid userid={subject.teacherId}/>}</td>
      <td className='sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[10vh] text-center"'> <ViewLink url={`http://localhost:3000/SubjectAdmin/${classId}/uid/${subject.subjectId}`}><AccessButton/></ViewLink></td>
    </tr>
  ))}
</tbody>
    
    </table>
<div className={` ${visibleAdd? "blur-sm" : "blur-0"} p-4`}> 
<Button name={'New subject'} 
                buttonType={'secondary'} 
                size={'md'}
                onClick={() => { setVisibleAdd(true)}}
                padding={'4'}
                />
</div>  

<div className={`pl-[30px] bg-gradient-to-r from-[#5f9cd4] to-slate-300 p-[2vh] text-xl font-medium text-white rounded-md mt-7 ${visibleAdd? "blur-sm" : "blur-0"}`}>
      <h1>Students</h1>
    </div>

    <div className={`p-4  ${visibleAdd? "blur-sm" : "blur-0"}`}>
    <a href={`http://localhost:3000/AddStudents/${sectionId}/${year}/${classId}`}>
    <Button name={'Add students'} 
                buttonType={'secondary'}  
                size={'md'}
                padding={'4'}
                icon={FiUserPlus}
                />
    </a>
    </div>
    <table className={` ${visibleAdd? "blur-sm" : "blur-0"}`}>
      <thead>
        <tr className="">
          <th className="  w-[18vw] p-[1.5vh]">UserID</th>
          <th className="  w-[18vw] p-[1.5vh]">Name</th>
          <th className="w-[18vw] p-[1.5vh]">Phone No</th>
          <th className=" w-[18vw] p-[1.5vh]">Email</th>
        </tr>
      </thead>
      <tbody>
        {usersStudent.map(user => (
            
          <tr key={user.userid} className="cursor-pointer hover:bg-white">
            <td className="w-[18vw] h-[6vh] text-center rounded-l-xl">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-center ">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/ClassStudent/${sectionId}/${year}/${classId}/${user.userid}`}><ViewButton/></ViewLink></td>
          </tr>

        ))}
      </tbody>
    </table>


    {visibleAdd && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full max-w-md p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
         <AddNewSubjectPopup  classId={classId ?? defaultclassRoomId}/>
          </div>
        </div>
      )}
    </div>

     </div>
    
      </div>
      
      </div>
      
  
    
  );
};

export default ClassRoomInsideAdminview;
