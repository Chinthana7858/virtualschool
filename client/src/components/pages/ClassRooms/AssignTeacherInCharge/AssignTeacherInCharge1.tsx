import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import { ViewButton } from '../../../ui/atoms/Buttons';
import NavBar from '../../../ui/templates/NavBar/NavBar';
import SideBarStudent from '../../../ui/templates/SideBar/SideBar-Student';




interface Users {
  userid: string;
  userRole:string;
  nameWithInitials: string;
  fullName:string;
  phoneNo:string
  dateOfBirth:string;
  email: string;
  nic:string;
  
}

interface ViewLinkProps {
  url: string;
  children?: React.ReactNode;
}

//Get classroom name by id
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


const AssignTeacherInCharge1: React.FC = () => {
  const [usersTeacher, setUsersTeacher] = useState<Users[]>([]);
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const{classId}=useParams<{classId:string}>();
  const defaultclassRoomId=';'
  const classRoomName=<GetClassRoomNameByid classId={classId??defaultclassRoomId}/>


  
  const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );

  //Get all teachers
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/v1/users/role/TEACHER/state/1'); 
      const data = await result.json();
      setUsersTeacher(data);
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
   
     
     <div className={`flex ${open ? "w-[85vw]" : "w-[100vw]"}`}>

    <div className={`bg-slate-300 p-[5%] mt-[4%] ml-[1%] w-[93vw] rounded-md min-h-screen `}>
      

    <div className="py-[3vh]"></div>
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl rounded-xl font-medium text-white'>
        Assign teacher in charge to {classRoomName}
    </h1>
    <table>
      <thead>
        <tr className="">
          <th className="w-[18vw] p-[1.5vh]">UserID</th>
          <th className="w-[18vw] p-[1.5vh]">Name</th>
          <th className="w-[18vw] p-[1.5vh]">Phone No</th>
          <th className="w-[18vw] p-[1.5vh]">Email</th>
        </tr>
      </thead>
      <tbody>
        {usersTeacher.map(user => (
            
          <tr key={user.userid} className="cursor-pointer hover:bg-white">
            <td className="w-[18vw] h-[6vh] text-center rounded-l-xl">{user.userid}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.nameWithInitials}</td>
            <td className="w-[18vw] h-[6vh] text-center">{user.phoneNo}</td>
            <td className="w-[18vw] h-[6vh] text-center ">{user.email}</td>
            <td className="w-[18vw] h-[6vh] text-center rounded-r-xl"> <ViewLink url={`http://localhost:3000/AssignTIC2/${classId}/${user.userid}`}><ViewButton/></ViewLink></td>
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

export default AssignTeacherInCharge1;
