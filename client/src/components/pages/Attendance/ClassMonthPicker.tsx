import { useEffect, useState } from "react";
import { HiBars4 } from "react-icons/hi2";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import NavBar from "../../ui/templates/NavBar/NavBar";
import SideBarAdmin from "../../ui/templates/SideBar/SideBar-Admin";
import { useParams } from "react-router-dom";
import SideBarParent from "../../ui/templates/SideBar/SideBar-Parent";
import SideBarStudent from "../../ui/templates/SideBar/SideBar-Student";
import SideBarTeacher from "../../ui/templates/SideBar/SideBar-Teacher";
import SideBarPrincipal from "../../ui/templates/SideBar/SideBar-Principal";

function Calendar() {
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

  const { classId } = useParams<{ classId: string }>();

  const handleDateClick = (date: Date) => {
    const nextDay = new Date(date.getTime() + (24 * 60 * 60 * 1000)); // set next day using getTime() and add one day's milliseconds
    setSelectedDate(nextDay);
    window.location.href = `http://localhost:3000/MarkAttendance/${classId}/${nextDay.toISOString()}`;
  };
  
  
  const handleMonthChange = (info: any) => {
    console.log('Month changed:', info);
  };

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
   
        <div className={` ${!open ? "w-[85vw]" : "w-[100vw]"} duration-100`}>
          <div className="pt-32 pl-20">
            <h2 className="text-xl font-base py-7">Pick the date to mark the attendance</h2>
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
              dateClick={(info) => handleDateClick(info.date)}
              viewDidMount={handleMonthChange} // call handleMonthChange when the month changes
             />
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default Calendar;
