import React, { useState, useEffect } from 'react';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarStudent from '../../ui/templates/SideBar/SideBar-Student';

;



interface TimeTable {
  id: string;
  classId:string;
  rowNo:number;
  timePeriod: string;
  mondaySubject:string;
  tuesdaySubject:string
  wednesdaySubject:string;
  thursdaySubject:string;
  fridaySubject: string;
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


const TimeTable: React.FC = () => {
  const [timetable, setTimetable] = useState<TimeTable[]>([]);
  const [open, setOpen] = useState(true); 
  const sortedTimetable = timetable.sort((a, b) => a.rowNo - b.rowNo);
  const defaultClassId = '';
  const { classId } = useParams<{ classId: string }>();
  const classRoomName=<GetClassRoomNameByid classId={classId??defaultClassId}/>



  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/api/vi/timetables/${classId}`); 
      const data = await result.json();
      setTimetable(data);
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
   
     
     <div className="flex">

    <div className="bg-slate-300 p-[5%] mt-[3%] min-h-screen">
        <h1 className="text-3xl p-[2%] text-slate-700 font-medium"> {classRoomName}</h1>
   

        
    <h1 className='pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl font-medium text-white'>
    Time Table 
    </h1>
    <table className="">
      <thead>
        <tr className="sm:text-xs md:text-md xl:text-base">
          <th className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] p-[3vh]">Time Period</th>
          <th className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] p-[3vh]">Monday</th>
          <th className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] p-[3vh]">Tuesday</th>
          <th className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] p-[3vh]">Wednesday</th>
          <th className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] p-[3vh]">Thursday</th>
          <th className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] p-[3vh]">Friday</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  {sortedTimetable.map(timetable => (
    <tr key={timetable.id} className="hover:bg-white sm:text-xs md:text-md xl:text-base">
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.timePeriod}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.mondaySubject}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.tuesdaySubject}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.wednesdaySubject}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.thursdaySubject}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.fridaySubject}</td>
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

export default TimeTable;
