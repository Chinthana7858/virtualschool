
import Footer from "../../ui/templates/Footer/Footer";
import NavBar from "../../ui/templates/NavBar/NavBar";
import { useState } from "react";
import { HiBars4 } from "react-icons/hi2";
import SideBarStudent from "../../ui/templates/SideBar/SideBar-Student";
const UserProfile = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>

    <div className="fixed z-20 w-[100%] ">
    <HiBars4  
          className={`absolute cursor-pointer  w-24
           fill-slate-100  h-12 top-14 bg-[#586B7D] rounded-tr-2xl xs:top-8 xs:scale-75 `} onClick={() => setOpen(!open)}/>
      <NavBar/>
    </div>

    <div className="flex">
      
      <div className={` ${open ? "w-[15vw]" : "scale-0"} z-10 duration-100`} >
         <SideBarStudent/>
      </div>
   
      
    <div className={` ${open ? "w-[85vw]" : "w-[100vw]"} duration-100`}>
    <div className="text-[#ffffff] rounded-b-3xl bg-gradient-to-r from-[#577794] to-transparent h-[280px]">
        <div className=" pl-[10%]">
              <div className='  pt-[8%]'>
                <p className="pt-[65px] text-left text-5xl">
                  User Name
                </p>
              </div>
             
              <div className=' pt-[12px] w-[50%]'>
                <p className="text-left 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl xs:text-2xl">
                  User Role
                </p>
              </div>
            </div>
        </div>
    


    
    <div className="sm:max-w-[500px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1350px] 
    2xl:max-w-[1400px] bg-slate-400 mt-1 relative rounded-l-[20px] h-auto ml-[0%]">
      <h2 className="py-5 text-xl text-left ml-[10%]">
      User Information
      </h2>
    </div>
     
     <span className="flex sm:max-w-[500px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1350px] 
    2xl:max-w-[1400px]
      bg-slate-200 mt-1 relative rounded-l-[20px] h-auto ml-[0%]">
      <span className="w-8 h-auto basis-1/2 ml-[10%]">
        <div className="flex-col ">
          <div className="">
            <h6 className="p-3 text-left">First Name</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">Last Name</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">Full Name</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">User ID</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">E-mail</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">Address</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">Date of birth</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">NIC</h6>
          </div>

        </div>
      </span>
      <span className="w-8 h-auto basis-1/2">
      <div className="flex-col">
          <div>
            <h6 className="p-3 text-left">: first_name</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:last_name</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:full_name</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:user_id</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:e_mail</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:address</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:date_of_birth</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:nic</h6>
          </div>

        </div>
      </span>
     </span>
     <div className="w-[100%] top-[120%] pt-3">
        <Footer/>
      </div>
      </div>
      
      </div>
      
    </div>
    
  );
};
export default UserProfile;
