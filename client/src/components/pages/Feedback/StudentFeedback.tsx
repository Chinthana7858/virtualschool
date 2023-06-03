import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, {AccessButton, CloseButton}  from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import AddFeedbackPopup from './AddFeedbackPopup';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';



interface Feedback {
  Id: string;
  studentId:string;
  teacherId:string;
  subjectId:string;
  classId: string;
  dateTime:string;
  body:string;
}

//Get class room name by id
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

const StudentFeedback: React.FC = () => {
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  //Get username by user id
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
  


  //Get Feedbacks
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/feedback/Student/56789`); //Hardcoded
      const data = await result.json();
      setFeedbacks(data);
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
         <SideBarStudent/>
      </div>
   
     
     <div className={`flex `}>

    <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen ${open ? "w-[85vw]" : "w-[100vw]"}`}>
    
 


<div className={`pl-[30px] bg-gradient-to-r from-[#5f9cd4] to-slate-300 p-[2vh] text-xl font-medium text-white rounded-md mt-7 ${visibleAdd? "blur-sm" : "blur-0"}`}>
      <div className="pb-5 text-2xl">Feedbacks</div>
      <div className="py-5 "><GetNameByuserid userid={'56789'} /></div> {/*Hardcoded*/}
    </div>


    <table className={` ${visibleAdd? "blur-sm" : "blur-0"}`}>
      <thead>
        <tr className="py-4">
          <th className="w-[12vw] p-[1.5vh] text-left">Date</th>
          <th className="w-[8vw] p-[1.5vh] text-left">Class</th>
          <th className="w-[8vw] p-[1.5vh] text-left">Subject</th>
          <th className="w-[8vw] p-[1.5vh] text-left">Teacher</th>
          <th className="w-[48vw] p-[1.5vh] text-left">Feedback</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()).map(feedbacks => (
            
          <tr key={feedbacks.Id} className="cursor-pointer hover:bg-white">

            <td className="w-[12vw] h-[6vh] text-center rounded-l-xl">
            {feedbacks?.dateTime && new Date(feedbacks.dateTime).toLocaleString("en-US", {
             year: "numeric",
             month: "2-digit",
             day: "2-digit",
             })}
            </td>
            <td className="w-[8vw] h-[6vh] text-left"><GetClassRoomNameByid classId={feedbacks.classId} /></td>
            <td className="w-[8vw] h-[6vh] text-left"><GetSubjectNameBySubjectId subjectId={feedbacks.subjectId} /></td>
            <td className="w-[8vw] h-[6vh] text-left"><GetNameByuserid userid={feedbacks.teacherId??''} /></td>
            <td className="w-[48vw] h-[6vh] text-left p-[3vh] rounded-r-xl">{feedbacks.body}</td>
          </tr>


        ))}
      </tbody>
    </table>
    </div>

     </div>
    
      </div>
      
 
      </div>
  
    
  );
};

export default StudentFeedback;
