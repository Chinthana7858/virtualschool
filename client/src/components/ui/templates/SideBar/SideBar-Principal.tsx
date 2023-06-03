import { BiHome, BiLogOut, BiNotepad, BiPaperPlane, BiUser } from "react-icons/bi";
import { GiGraduateCap } from "react-icons/gi";


const SideBarPrincipal = () => {

    const Menus = [
      { title: "Home",path:"/HomePagePrincipal", icon: <BiHome/>},
      { title: "Sections",path:"/HomePagePrincipal", icon: <GiGraduateCap/>},
      { title: "Results",path:"/HomePagePrincipal", icon: <BiNotepad/> },
      { title: "Profile",path:"/HomePagePrincipal", icon: <BiUser/> },
      { title: "Contacts",path:"/HomePagePrincipal", icon: <BiPaperPlane/> },
      { title: "SignOut",path:"/HomePagePrincipal", icon:  <BiLogOut/> , gap: true },
    ];
  
    return (
    
      <div className="fixed">
        <div className={`  h-[100vh]  p-5  pt-8  bg-[#586B7D] duration-500 sticky`} >
       
         
          <div className="flex items-center gap-x-4">
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} className={` duration-500  w-14 h-14" }`}/>
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
  export default SideBarPrincipal;