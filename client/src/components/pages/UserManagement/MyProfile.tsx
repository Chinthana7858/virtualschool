
import Footer from "../../ui/templates/Footer/Footer";
import NavBar from "../../ui/templates/NavBar/NavBar";
import { useState } from "react";
import { HiBars4 } from "react-icons/hi2";
import React, {useEffect } from 'react';
import SideBarAdmin from "../../ui/templates/SideBar/SideBar-Admin";
import SideBarParent from "../../ui/templates/SideBar/SideBar-Parent";
import SideBarStudent from "../../ui/templates/SideBar/SideBar-Student";
import SideBarTeacher from "../../ui/templates/SideBar/SideBar-Teacher";
import SideBarPrincipal from "../../ui/templates/SideBar/SideBar-Principal";
import { CloseButton} from "../../ui/atoms/Buttons";
import UpdateUserDetailsPopup from "./UpdateUserDetailsPopup";
import { AiFillSetting } from "react-icons/ai";

interface User {
  userid: string;
  userState:string;
  userRole:string;
  nameWithInitials:string;
  fullName:string;
  phoneNo: string;
  dateOfBirth:string;
  email:string;
  nic:string;
  gender:string;
  address:string;
  passWord:string;
  studentId:string
  classIds: string[];
}


const MyProfile:React.FC= () => {
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [user, setUser] = useState<User | null>(null);
  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);
  const [visibleUpdateDetails, setVisibleUpdateDetails] = useState(false);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);

  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId.toString());
    }
  }, []);

  //Get user details
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  }, [userId]);


  return (
    <div>

    <div className="fixed z-20 w-[100%]">
    <HiBars4  
          className={`absolute cursor-pointer  w-24
           fill-slate-100  mr-[82vw] h-12 top-14 bg-[#586B7D] rounded-tr-2xl`} onClick={() => setOpen(!open)}/>
      <NavBar/>
    </div>

    <div className="flex">
      
      <div className={` ${open ? "w-[15vw]" : "scale-0"}  z-10 duration-100 mt-[7%]`} >
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
   
      
    <div className={` ${open ? "w-[85vw]" : "w-[100vw]"} duration-100`}>
      <div className="pl-4">
    <div className="text-[#ffffff] rounded-b-3xl bg-gradient-to-r from-[#577794] to-transparent h-[280px]">
        <div className=" pl-[10%]">
              <div className='  pt-[7%] w-[50%]'>
                <p className="pt-[65px] text-left 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-5xl sm:text-5xl xs:text-4xl">
               <span className='text-blue-50'> {user?.gender === 'MALE' ? 'Mr' : 'Ms'}</span> . 
                  {user?.nameWithInitials}
                </p>
              </div>
             
              <div className=' pt-[12px] w-[50%]'>
                <p className="text-left 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl xs:text-2xl">
                  {user?.userRole}
                </p>
              </div>
            </div>
        </div>
  

    
    <div className="sm:max-w-[400px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1250px] 
    2xl:max-w-[1300px] bg-slate-400 mt-1 relative rounded-l-[20px] h-auto ">
      <div className=" pl-[10%] py-5 2xl:mr-[64%] xl:mr-[500px] lg:mr-[600px] sm:mr-[400px] flex ">
      <div className="text-2xl font-semibold text-slate-700 ">Your Information  </div>
      <div>
      <button
      className="pl-10"
      onClick={() => setVisibleUpdateDetails(true)}>
        <AiFillSetting size={28} color="#2A3652" />
      </button>
      </div>
      </div>
    </div>
     
     <span className="flex sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1250px] 2xl:max-w-[1300px]
      bg-slate-200 mt-1 relative rounded-l-[20px] h-auto ">
      <span className="w-8 h-auto basis-7/12 ml-[10%]">
        <div className="flex-col ">
          <div className="">
            <h6 className="p-3 text-left">User ID</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">Full Name</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">Phone No</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">Email</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">Address</h6>
          </div>
          <div>
            <h6 className="p-3 text-left ">Date Of Birth</h6>
          </div>
          {user?.userRole !=='STUDENT' && (
          <div>
            <h6 className="p-3 text-left ">NIC</h6>
          </div>)}

        </div>
      </span>
      <span className="w-8 h-auto basis-5/12">
      <div className="flex-col">
          <div>
            <h6 className="p-3 text-left">:{user?.userid}</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:{user?.fullName}</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:{user?.phoneNo}</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:{user?.email}</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:{user?.address}</h6>
          </div>
          <div>
            <h6 className="p-3 text-left">:{user?.dateOfBirth}</h6>
          </div>
          {user?.userRole !=='STUDENT' && (
          <div>
            <h6 className="p-3 text-left">:{user?.nic}</h6>
          </div>)}

        </div>
      </span>
     </span>    
     <br />



     </div>
     <div className="w-[100%] top-[120%] pt-7">
        <Footer/>
      </div>
      </div>
      {visibleUpdateDetails && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-[40vw] h-[50%] max-w-2xl p-4 rounded-lg bg-blue-50">
          <div className='pl-[95%]'><button onClick={() => setVisibleUpdateDetails(false)}><CloseButton/></button></div>
          <UpdateUserDetailsPopup
           userid={user?.userid ?? ''}
           userRole={user?.userRole ?? ''}
           nameWithInitials={user?.nameWithInitials ?? ''}
           fullName={user?.fullName ?? ''}
           phoneNo={user?.phoneNo ?? ''}
           dateOfBirth={user?.dateOfBirth ?? ''}
           email={user?.email ?? ''}
           nic={user?.nic ?? ''}
           gender={user?.gender ?? ''}
           address={user?.address ?? ''}
           passWord={user?.passWord ?? ''}
           userState={user?.userState ?? ''}
           studentId={user?.studentId ?? ''}
           classIds={user?.classIds ?? []}
           />

          </div>
        </div>
      )} 
      </div>
      
    </div>
    
  );
};
export default MyProfile;
