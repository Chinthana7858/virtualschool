
const SideBarAdmin = () => {

  const Menus = [
    { title: "Home", src: "Home" },
    { title: "Sections", src: "Classroom" },
    { title: "Results", src: "Results" },
    { title: "Requests", src: "Requests" },
    { title: "Users", src: "Users" },
    { title: "Profile", src: "Profile" },
    { title: "SignOut", src: "SignOut", gap: true },
  ];

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
          {Menus.map((Menu, index) => (
            <li
             
              className={`flex p-2 cursor-pointer text-white text-sm items-center gap-x-1 
              ${Menu.gap ? "mt-9" : "mt-2"} hover:bg-slate-700`}
            >

              <img src={`${process.env.PUBLIC_URL}/images/${Menu.src}.png`} alt="logo" width="30" height="30"/> 
              <span className={` hover:bg-slate-700 `}>
                  {Menu.title }
                </span>
            </li>
          ))}
        </ol>
      </div>
     
      </div>
  );
};
export default SideBarAdmin;