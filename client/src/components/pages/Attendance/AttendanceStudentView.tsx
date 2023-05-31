import { useEffect, useState } from "react";
import { HiBars4 } from "react-icons/hi2";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import NavBar from "../../ui/templates/NavBar/NavBar";
import SideBarAdmin from "../../ui/templates/SideBar/SideBar-Admin";




function convertDate(inputDate: string): string {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');
  return `${year}-${paddedMonth}-${paddedDay}`;
}


function AttendanceStudentView() {
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));

  const handleMonthChange = (info: any) => {
    console.log('Month changed:', info);
  };

  
  function GetAttendance({studentId, date }: { studentId: string, date: string }): JSX.Element | null {
    interface Attendance {
       state: string;
    }
  
    const [attendance, setAttendance] = useState<Attendance | null>(null);
  
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/attendance/${date}/${studentId}`)
        .then(res => res.json())
        .then(data => setAttendance(data))
        .catch(error => console.error(error));
    }, [ studentId, date]);
  
    return attendance ? <>{attendance.state}</> : null;
  }
  

  

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
          <SideBarAdmin/>
        </div>
   
        <div className={` ${!open ? "w-[85vw]" : "w-[100vw]"} duration-100`}>
          <div className="pt-32 pl-20">
            <h2 className="text-xl font-base py-7"></h2>
            <div className="cursor-pointer">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"} // change the initial view to month view
                headerToolbar={{
                start: "today prevYear,prev", // add year navigation buttons
                center: "title",
                end: "next,nextYear",
              }}
              height={"80vh"}
              viewDidMount={handleMonthChange} // call handleMonthChange when the month changes
              dayCellContent={(arg) => (
                <div className="text-left text-md">
                  <div>{arg.dayNumberText}</div>
                  <div className="font-semibold text-red-700"><GetAttendance studentId={'56789'} date={convertDate(arg.date.toISOString())} /></div>
                </div>
              )}

             />
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default AttendanceStudentView;;


