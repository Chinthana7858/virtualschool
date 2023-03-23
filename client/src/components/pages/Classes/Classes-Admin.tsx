
import Footer from "../../ui/templates/Footer/Footer";
import NavBar from "../../ui/templates/NavBar/NavBar";
import { useState } from "react";
import { HiBars4 } from "react-icons/hi2";
import { AccessButton, AccessClassButton, AddClassButton, AttemptButton, ViewButton } from "../../ui/atoms/Buttons";
import HomePageDescription from "../../ui/organisms/HomePageDescription";
import SideBarAdmin from "../../ui/templates/SideBar/SideBar-Admin";

interface ViewLinkProps {
  url: string;
  children?: React.ReactNode;
}

const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);

const ClassesPageAdmin = () => {
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
        
    <div className="d-flex flex-column p-[15%] align-items-flex-start">
    <h2 className="p-2">All Classes</h2>
    <div className="bg-[#729efd]">
      <h5 className="p-3 text-white">Physical Science</h5>
      <div className="p-4 m-3 bg-[#accbff] rounded-4 font-semibold row">
        <div className="col-sm-10">12-A</div>
        <div className="pl-[85%] col-sm-2"><AccessClassButton/></div>
      </div>
      <div className="p-4 m-3 bg-[#accbff] rounded-4 font-semibold row">
        <div className="col-sm-10">12-B</div>
        <div className="pl-[85%] col-sm-2"><AccessClassButton/></div>
      </div>
      <div className="p-4 m-3 bg-[#accbff] rounded-4 font-semibold row">
        <div className="col-sm-10">13-A</div>
        <div className="pl-[85%] col-sm-2"><AccessClassButton/></div>
      </div>
      <div className="p-4 m-3 bg-[#accbff] rounded-4 font-semibold row">
        <div className="col-sm-10">13-B</div>
        <div className="pl-[85%] col-sm-2"><AccessClassButton/></div>
      </div>
      <div className="pl-[75%] col-sm-2 pt-3 pb-3"><AddClassButton/></div>
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
export default ClassesPageAdmin;
