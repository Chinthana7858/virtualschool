import { BiHome, BiLogOut, BiNotepad, BiPaperPlane, BiUser } from "react-icons/bi";
import { BsChatLeftDots } from "react-icons/bs";
import { FaChild } from "react-icons/fa";
const SideBarParent = () => {

    const Menus = [
      { title: "Home",path:"/HomePageParent", icon: <BiHome/>},
      { title: "Results",path:"/HomePageParent", icon: <BiNotepad/> },
      { title: "Attendance",path:"/HomePageParent", icon: <FaChild/>},
      { title: "Feedback",path:"/HomePageParent", icon: <BsChatLeftDots/>},
      { title: "Profile",path:"/HomePageParent", icon: <BiUser/> },
      { title: "Contacts",path:"/HomePageParent", icon: <BiPaperPlane/>},
      { title: "SignOut",path:"/", icon: <BiLogOut/>, gap: true },
    ];

    const handleSignOut = () => {
      const confirmation = window.confirm("Are you sure you want to sign out?");
      if (confirmation) {
      
      }
    };
  
    return (
    
      <div className="fixed">
        <div className={`  h-[100vh]  p-5  pt-8  bg-[#586B7D] duration-500 sticky`} >
       
         
          <div className="flex items-center gap-x-4">
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`}className={` duration-500  w-14 h-14" }`}/>
            <h1 className={` origin-left fontmedium text-xl duration-1000 text-white`} >
              Virtial School
            </h1>
          </div>
          <ol className="pt-6">
            {Menus.map((Menu) => (
               <a href={Menu.path}>
              <li
               
                className={`flex p-2 cursor-pointer text-white text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} hover:bg-slate-700`}
                onClick={Menu.title === "SignOut" ? handleSignOut : undefined}
              >
                <span className={` hover:bg-slate-700 text-2xl`}>
                {Menu.icon}
                </span>
                
                <span className={` hover:bg-slate-700 text-lg`}>
                  {Menu.title }
                </span>
              </li>
              </a>
            ))}
          </ol>
        </div>
       
        </div>
    );
  };
  export default SideBarParent;