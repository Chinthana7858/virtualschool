
import Footer from "../../ui/templates/Footer/Footer";
import NavBar from "../../ui/templates/NavBar/NavBar";
import { useState } from "react";
import { HiBars4 } from "react-icons/hi2";
import { AccessAssignmentButton, AccessAttendanceButton, AccessButton, AccessFeedbacksButton, AccessLearningMaterialButton, AccessResultsButton, AccessStudentFormsButton, AccessStudentSessionButton, AttemptButton, ViewButton } from "../../ui/atoms/Buttons";
import HomePageDescription from "../../ui/organisms/HomePageDescription";
import SideBarAdmin from "../../ui/templates/SideBar/SideBar-Admin";

interface ViewLinkProps {
  url: string;
  children?: React.ReactNode;
}

const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);

const SubjectPageAdmin = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>

    <div className="fixed z-20 w-[100%]">
    <HiBars4 
          className={`absolute cursor-pointer  w-24
           fill-slate-100  mr-[82vw] h-12 top-14 bg-[#586B7D] rounded-tr-2xl`} onClick={() => setOpen(!open)}/>
    <NavBar/>
    </div>

    <div className="flex "> 
      <div className={` ${open ? "w-[15vw]" : "scale-0"} pt-[14.5vh] z-10 `} >
        <SideBarAdmin/>
      </div>
   
      
    <div className={` ${open ? "w-[85vw]" : "w-[100vw]"} duration-100`}>
        
    <div className="d-flex flex-column p-[13%] align-items-flex-start">
    
    <div>
      <div className="row gx-10 p-2 ">
        <div className="col-2 ">
          <div className="p-2 border bg-[#ced4da] align-middle rounded-4 "><center><h1 className="align-middle">13-A</h1></center>
            </div></div>
        <div className="col-10 border bg-[#ced4da] align-middle rounded-4">
        <div className="row">
          <div className="col-1">
          <i className="bi bi-calculator-fill" style={{fontSize:"3rem"}}></i>
            </div>
            <div className="col-8 pt-3  font-bold" style={{fontSize:"1.5rem"}}>Combined Mathematics</div>
            </div> 
        
        </div>
      </div>
      
      <div className="p-3 m-3 bg-[#dbedff] rounded-4 font-semibold row">
        <div className="col-sm-1"><i className="bi bi-ui-checks" style={{fontSize:"3rem"}}></i></div>
        <div className="col-sm-9 font-bold pt-3"> Students Forms </div>
        <div className="pl-[85%] col-sm-2 pt-3"><AccessStudentFormsButton/></div>
      </div>
      <div className="p-3 m-3 bg-[#dbedff] rounded-4 font-semibold row">
        <div className="col-sm-1"><i className="bi bi-link-45deg" style={{fontSize:"3rem"}}></i></div>
        <div className="col-sm-9 font-bold pt-3"> Session Links </div>
        <div className="pl-[85%] col-sm-2 pt-3"><AccessStudentSessionButton/></div>
      </div>
      <div className="p-3 m-3 bg-[#dbedff] rounded-4 font-semibold row">
        <div className="col-sm-1"><i className="bi bi-pen-fill" style={{fontSize:"3rem"}}></i></div>
        <div className="col-sm-9 font-bold pt-3"> Assignments </div>
        <div className="pl-[85%] col-sm-2 pt-3"><AccessAssignmentButton/></div>
      </div>
      <div className="p-3 m-3 bg-[#dbedff] rounded-4 font-semibold row">
        <div className="col-sm-1"><i className="bi bi-book-half" style={{fontSize:"3rem"}}></i></div>
        <div className="col-sm-9 font-bold pt-3"> Learning Materials </div>
        <div className="pl-[85%] col-sm-2 pt-3"><AccessLearningMaterialButton/></div>
      </div>
      <div className="p-3 m-3 bg-[#dbedff] rounded-4 font-semibold row">
        <div className="col-sm-1"><i className="bi bi-list-columns" style={{fontSize:"3rem"}}></i></div>
        <div className="col-sm-9 font-bold pt-3"> Results </div>
        <div className="pl-[85%] col-sm-2 pt-3"><AccessResultsButton/></div>
      </div>
      <div className="p-3 m-3 bg-[#dbedff] rounded-4 font-semibold row">
        <div className="col-sm-1"><i className="bi bi-chat-square-text-fill" style={{fontSize:"3rem"}}></i></div>
        <div className="col-sm-9 font-bold pt-3"> Feedbacks </div>
        <div className="pl-[85%] col-sm-2 pt-3"><AccessFeedbacksButton/></div>
      </div>
      <div className="p-3 m-3 bg-[#dbedff] rounded-4 font-semibold row">
        <div className="col-sm-1"><i className="bi bi-person-check-fill" style={{fontSize:"3rem"}}></i></div>
        <div className="col-sm-9 font-bold pt-3"> Attendance </div>
        <div className="pl-[85%] col-sm-2 pt-3"><AccessAttendanceButton/></div>
      </div>
           
    </div>
    
    </div>
      <div className="align-self-end w-[100%] top-[120%] ">
        <Footer/>
      </div>
      </div>
      
      </div>
      
    </div>
    
  );
};
export default SubjectPageAdmin;
