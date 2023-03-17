
import Footer from "../../ui/templates/Footer/Footer";
import NavBar from "../../ui/templates/NavBar/NavBar";
import { useState } from "react";
import { HiBars4 } from "react-icons/hi2";
import SideBarStudent from "../../ui/templates/SideBar/SideBar-Student";
import { AccessButton,ViewButton } from "../../ui/atoms/Buttons";
import HomePageDescription from "../../ui/organisms/HomePageDescription";

const HomePageStudent = () => {
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
        <SideBarStudent/>
      </div>
   
      
    <div className={` ${open ? "w-[85vw]" : "w-[100vw]"} duration-100`}>
        <div className="flex-col xs:mt-[20%] sm:mt-[10%] md:mt[0%] lg:mt[0%] xl:mt[0%] 2xl:mt[0%]">

         <div className="  mt-[12%] ml-[5%] 2xl:flex xl:flex lg:flex md:flex sm:flex xs:flex-col">
              <div className=" basis-1/2">
                 <HomePageDescription/>
              </div>

               <div className="basis-1/2 xs:mt-7 ">
                  <div className="flex-col">
                      <div className="flex basis-1/12">
                        <div><a className="font-semibold text-left">Your Results</a></div>
                        <div className="pl-[45%]"><ViewButton/></div>
                      </div>
                      <img src="./images/YourResults.jpg"className="w-[450px] h-[300px] basis-11/12"/>
                   </div>
               </div>
          </div>

          <div className="  mt-[5%] ml-[5%] 2xl:flex xl:flex lg:flex md:flex sm:flex xs:flex-col">
          <div className="basis-1/2 xs:mt-7 ">
                  <div className="flex-col">
                      <div className="flex basis-1/12">
                        <div><a className="font-semibold text-left">Your Classroom</a></div>
                        <div className="pl-[45%]"><AccessButton/></div>
                      </div>
                      <img src="./images/YourClassroom.jpg"className="w-[450px] h-[300px] basis-11/12"/>
                   </div>
               </div>

               <div className="basis-1/2 xs:mt-7 ">
                  <div className="flex-col">
                      <div className="flex basis-1/12">
                        <div><a className="font-semibold text-left">Your Feedback</a></div>
                        <div className="pl-[45%]"><ViewButton/></div>
                      </div>
                      <img src="./images/YourFeedback.jpg"className="w-[450px] h-[270px] rounded-2xl basis-11/12 mt-4"/>
                   </div>
               </div>
          </div>
          <div className="  mt-5%] ml-[5%] 2xl:flex xl:flex lg:flex md:flex sm:flex xs:flex-col">
          <div className="basis-1/2 xs:mt-7 ">
                  <div className="flex-col">
                      <div className="flex basis-1/12">
                        <div><a className="font-semibold text-left">Your Attendance</a></div>
                        <div className="pl-[45%]"><ViewButton/></div>
                      </div>
                      <img src="./images/YourAttendance.jpg"className="w-[450px] h-[270px] rounded-2xl basis-11/12 mt-4"/>
                   </div>
               </div>

          </div>
      
          </div>
      
      <div className="w-[100%] top-[120%] pt-3">
        <Footer/>
      </div>
      </div>
      
      </div>
      
    </div>
    
  );
};
export default HomePageStudent;
