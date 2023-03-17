import React, { useState, useEffect } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { HiBars4 } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Button, {CloseButton} from '../../ui/atoms/Buttons';
import NavBar from '../../ui/templates/NavBar/NavBar';
import SideBarAdmin from '../../ui/templates/SideBar/SideBar-Admin';
import AddNewRowPopup from './AddNewRowPopup';
import EditRowPopup from './EditRowPopup';
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


const TimeTableAdmin: React.FC = () => {
  const [timetable, setTimetable] = useState<TimeTable[]>([]);
  const [open, setOpen] = useState(true); 
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const[id,setId]=useState("");
  const[classIds,setClassIds]=useState("");
  const[timePeriod,setTimePeriod]=useState("");
  const[mondaySubject,setMondaySubject]=useState("");
  const[ tuesdaySubject,setTuesdaySubject]=useState("");
  const[ wednesdaySubject,setWednesdaySubject]=useState("");
  const[ thursdaySubject,setThursdaySubject]=useState("");
  const[ fridaySubject,setFridaySubject]=useState("");
  const[rowNo,setRowNo]=useState(0);
  const sortedTimetable = timetable.sort((a, b) => a.rowNo - b.rowNo);
  const defaultClassId = '';
  const { classId } = useParams<{ classId: string }>();
  const classRoomName=<GetClassRoomNameByid classId={classId??defaultClassId}/>



  const handleDelete = ( rowNo: number) => {
    fetch(`http://localhost:8080/api/vi/timetables/${classId}/${rowNo}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        alert("deleted")
        window.location.reload();
        // handle success
      } else {
        // handle error
      }
     
    })
    .catch(error => {
      // handle error
    
    });
  };



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
         <SideBarAdmin/>
      </div>
   
     
     <div className={`flex  ${open ? "w-[85vw]" : "w-[100vw]"}`}>

    <div className={`bg-slate-300 p-[5%] mt-[3%]  min-h-screen`}>
        <h1 className={`text-3xl p-[2%] text-slate-700 font-medium  ${visibleAdd||visibleEdit ? "blur-sm" : "blur-0"}`}> {classRoomName}</h1>
   

        
    <h1 className={`pl-[30px] bg-gradient-to-r from-[#586B7D] to-slate-300 p-[2vh] text-xl font-medium text-white  ${visibleAdd||visibleEdit ? "blur-sm" : "blur-0"}`}>
    Time Table 
    </h1>
    <table className={` ${visibleAdd||visibleEdit ? "blur-sm" : "blur-0"}`}>
      <thead>
        <tr className="sm:text-xs md:text-md xl:text-base">
          <th className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] p-[3vh]">Row No</th>
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
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.rowNo}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.timePeriod}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.mondaySubject}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.tuesdaySubject}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.wednesdaySubject}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.thursdaySubject}</td>
      <td className="sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center">{timetable.fridaySubject}</td>
      <td className='sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center"'>
        <Button 
            name="Edit" 
            buttonType={'tab'} 
            size={'md'} 
            padding={'4'} 
            icon={AiFillEdit}
            onClick={() => { setVisibleEdit(true); setId(timetable.id);setClassIds(timetable.classId);setRowNo(timetable.rowNo);setTimePeriod(timetable.timePeriod);setMondaySubject(timetable.mondaySubject);setTuesdaySubject(timetable.tuesdaySubject);setWednesdaySubject(timetable.wednesdaySubject);setThursdaySubject(timetable.thursdaySubject);setFridaySubject(timetable.fridaySubject)}}
         />
      </td>
      <td className='sm:w-[0vw] md:w-[10vw] xl:w-[18vw] h-[10vh] text-center"'>
        <Button 
            name="Delete" 
            buttonType={'tab-red'} 
            size={'md'} 
            padding={'4'} 
            icon={AiFillDelete}
            onClick={() => handleDelete( timetable.rowNo)}
            />
      </td>
    </tr>
  ))}
</tbody> 
    </table>
    <div className={` ${visibleAdd||visibleEdit ? "blur-sm" : "blur-0"}`}>
    <Button 
            name="Add new row" 
            buttonType={'tab'} 
            size={'xl-long'} 
            padding={'4'} 
            icon={AiFillEdit}
            onClick={() => { setVisibleAdd(true)}}
            />
    </div>
    {visibleEdit && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen ">
          <div className="w-full max-w-md p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => {setVisibleEdit(false)}}><CloseButton/></button></div>
          <EditRowPopup 
          id={id} 
          classId={classIds} 
          rowNo={rowNo} 
          timePeriod={timePeriod} 
          mondaySubject={mondaySubject}
          tuesdaySubject={tuesdaySubject}
          wednesdaySubject={wednesdaySubject}
          thursdaySubject={thursdaySubject}
          fridaySubject={fridaySubject}
          />
          </div>
        </div>
      )}

    
    {visibleAdd && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-full max-w-md p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleAdd(false)}><CloseButton/></button></div>
          <AddNewRowPopup classId={classId ?? defaultClassId}  />
          </div>
        </div>
      )}
    </div>

     </div>
    
      </div>
      
      </div>
      
  
    
  );
};

export default TimeTableAdmin;
