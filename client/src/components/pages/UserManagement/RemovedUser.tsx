
import Footer from "../../ui/templates/Footer/Footer";
import NavBar from "../../ui/templates/NavBar/NavBar";
import { useState } from "react";
import { HiBars4 } from "react-icons/hi2";
import React, {useEffect } from 'react';
import SideBarAdmin from "../../ui/templates/SideBar/SideBar-Admin";
import{useParams} from "react-router-dom";
import Button from "../../ui/atoms/Buttons";
import { AiFillCheckCircle, AiFillDelete } from "react-icons/ai";
import SideBarParent from "../../ui/templates/SideBar/SideBar-Parent";
import SideBarStudent from "../../ui/templates/SideBar/SideBar-Student";
import SideBarTeacher from "../../ui/templates/SideBar/SideBar-Teacher";
import SideBarPrincipal from "../../ui/templates/SideBar/SideBar-Principal";

interface User {
  userid: string;
  userRole:string;
  nameWithInitials:string;
  fullName:string;
  phoneNo: string;
  dateOfBirth:string;
  email:string;
  nic:string;
  gender:string;
  address:string;
}

interface BackLinkProps {
    url: string;
    children?: React.ReactNode;
  }

const RemovedUser:React.FC= () => {
  const initialState = JSON.parse(localStorage.getItem('sidebar') ?? 'false');
  const [open, setOpen] = useState(initialState);
  localStorage.setItem('sidebar', JSON.stringify(open));
  const [user, setUser] = useState<User | null>(null);
  const { userid } = useParams<{ userid: string }>();

  const [usersRole, setUsersRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsersRole = localStorage.getItem('role');
    if (storedUsersRole) {
      setUsersRole(storedUsersRole.toString());
    }
  }, []);
  
  const BackLink: React.FC<BackLinkProps> = ({ url, children }) => (
    <a href={url}>{children}</a>
  );

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/${userid}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  }, [userid]);

  //Delete user permenently
  const handleRemove = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this pre-user deteils permenently from the system?');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/users/${userid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('User details removed successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Restore user (change userState to 1)
  const handleRestoreUser = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to restore this user to the system?');
  
      if (!confirmed) {
        return; // user clicked cancel, so do nothing
      }
  
      const response = await fetch(`http://localhost:8080/api/v1/users/userStateTo1/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('User restored successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

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
                  {user?. nameWithInitials}
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
      <h2 className="text-xl pl-[10%]  py-5 2xl:mr-[64%] xl:mr-[500px] lg:mr-[600px] sm:mr-[400px]">
      User Information
      </h2>
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
          <div>
            <h6 className="p-3 text-left">:{user?.nic}</h6>
          </div>
         

        </div>
      </span>
     </span>
     </div>
     {usersRole ==='ADMIN' && (
     <div className="flex w-[25vw] ml-[70%] xs:ml-[25%] pt-6">
     <div className="basis-1/2">
      <BackLink url={`http://localhost:3000/RemovedUsers`}>
      <Button 
      name={'Restore'} 
      buttonType={"secondary"} 
      onClick={handleRestoreUser} 
      size={'md'}
      padding={'3'}
      icon={AiFillCheckCircle}
      />
      </BackLink>
     </div>
     <div className="basis-1/2">
     <BackLink url={`http://localhost:3000/RemovedUsers`}>
      <Button 
      name={'Delete'} 
      buttonType={"secondary-red"} 
      onClick={handleRemove} 
      size={'md'}
      padding={'3'}
      icon={AiFillDelete}
      />
      </BackLink>
    </div>
     </div>)}
     <div className="w-[100%] top-[120%] pt-7">
        <Footer/>
      </div>
      </div>
      
      </div>
      
    </div>
    
  );
};
export default RemovedUser;
