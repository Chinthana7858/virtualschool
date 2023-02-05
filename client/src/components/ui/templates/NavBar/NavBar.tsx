import React from 'react'
import "./NavBar.css";

export default function NavBar() {
  return (
    <>
    
    <span className="flex bg-slate-100 ">
          
          <span className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl xs:text-2xl basis-10/12 text-[#586B7D]">
            <h2 className="mt-5 text-center "> <span className='FONT'>Virtual School</span></h2> 
          </span>

          <span className=" basis-2/12 text-">
              <img src="./images/logo.png" alt="logo" width="100" height="100" />
          </span>
       
      </span>
  
    </>
  )
}
