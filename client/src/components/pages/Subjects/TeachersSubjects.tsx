import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import { AccessButton} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import SideBarTeacher from '../../ui/templates/SideBar/SideBar-Teacher';

interface Subject {
  subjectId:string;
  classRoomId: string;
  subjectName:string;
  teacherId:string;
}

 //Get AcademicYear by classRoomId
 function GetAcademicYearByClassRoomId({classId }: { classId: string }): JSX.Element  | null {
  interface ClassRoom {
    academicYear:number;
  }
  const [classRoom, setClassRoom] = useState<ClassRoom | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/classrooms/${classId}/classroom`)
      .then(res => res.json())
      .then(data => setClassRoom(data))
      .catch(error => console.error(error));
  }, []);

  return classRoom? <span>{classRoom.academicYear}</span> : null;
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

const TeachersSubjects: React.FC = () => {
  const [subject, setSubject] = useState<Subject[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const { classId } = useParams<{ classId: string }>();
  
  //Get subject by teacherId
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/v1/subjects/teacher/2`); //Hardcoded
      const data = await result.json();
      setSubject(data);
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
         <SideBarTeacher/>
      </div>

     <div className={`flex `}>

    <div className={`bg-slate-300 p-[5%] mt-[7%]  min-h-screen ${open ? "w-[85vw]" : "w-[100vw]"}`}>
    
    <div className={`rounded-lg bg-gradient-to-r from-[#586B7D] to-slate-300`}>
    <div className={`pl-[30px]  p-[3vh] text-2xl font-medium text-white rounded-lg`}>
     Your subjects
    </div>
    </div>

    <table className={``}>
      <thead>
        <tr className="sm:text-xs md:text-md xl:text-base">
          <th className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] p-[3vh] text-left pl-16">Academic Year</th>
          <th className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] p-[3vh] text-left pl-16">Subject Name</th>
          <th className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] p-[3vh] text-left pl-16">Class</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  {subject.map(subject => (
    <tr key={subject.subjectId} className="bg-slate-400 hover:bg-white sm:text-xs md:text-md xl:text-base">
      <td className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[10vh] text-left pl-16"><GetAcademicYearByClassRoomId classId={subject.classRoomId}/></td>
      <td className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[10vh] text-left pl-16">{subject.subjectName}</td>
      <td className="sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[10vh] text-left pl-16"><GetClassRoomNameByid classId={subject.classRoomId}/></td>
      <td className='sm:w-[0vw] md:w-[25vw] xl:w-[35vw] h-[10vh] text-center"'> <a href={`http://localhost:3000/Subject/${subject.classRoomId}/uid/${subject.subjectId}`}><AccessButton/></a></td>
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

export default TeachersSubjects;
