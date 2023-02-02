import React from 'react'


const Footer = () => {
  return (
    <body>

    <footer className=" bg-[#533E80] sm:max-w-[800px] md:max-w-[1000px] lg:max-w-[1300px] xl:max-w-[1500px] 2xl:max-w-[1700px] h-[368px] ">
       
        <div className='flex ml-[45%] pt-[110px]'>
        <div className='h-[100px] w-[100px] bg-[#0EC5D7] mr-5'></div>

        <div className="leading-5 text-left ">
            <div className="text-[20px] text-white">Innovate Solutions</div>
            <div className="text-[10px] text-white">mentord by</div>
            <div className="text-[20px] text-yellow-400">Rootcode</div>
            <div className="text-[20px] text-yellow-400">labs</div>
        </div> 
        </div>

        <div className='flex text-white ml-[40%] mt-[1%]'>
           <span className="mr-7"><p>Home</p></span>
           <span className='mr-7'><p>Service</p></span>
           <span className='mr-7'><p>Resource</p></span>
           <span className=''><p>About</p></span>
          
        </div>
        
        <div className="text-yellow-300 pt-[40px]">© Innovate Solutions 2023</div>


        <div className="flex pt-[12px] ">
        <div className='h-10 w-[40%] bg-[#423265]  rounded-tr-full '></div> 

        <div className="flex ">  
        <svg  className="ml-8 cursor-pointer 2xl:w-9 2xl:h-8 xl:w-7 xl:h-7 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-4 sm:h-4 xs:w-3 xs:h-3"  onClick={() => {
      window.location.href = 'https://www.instagram.com/';
    }}viewBox="0 0 24 24"><g data-name="Brand Logos"><path fill="white" d="M12.00039,6.86511A5.13489,5.13489,0,1,0,17.13528,12,5.13479,5.13479,0,0,0,12.00039,6.86511Zm0,8.46846A3.3336,3.3336,0,1,1,15.334,12,3.33317,3.33317,0,0,1,12.00039,15.33357Z"/><path fill="white" d="M21.93985,7.87719a7.33258,7.33258,0,0,0-.46447-2.42726,4.918,4.918,0,0,0-1.15346-1.77146A4.89358,4.89358,0,0,0,18.55129,2.525,7.32278,7.32278,0,0,0,16.124,2.06054C15.05775,2.012,14.7169,2,12.00122,2s-3.05681.01126-4.12365.06054A7.33317,7.33317,0,0,0,5.45032,2.525,4.90522,4.90522,0,0,0,3.67886,3.67847a4.88551,4.88551,0,0,0-1.1534,1.77146A7.33341,7.33341,0,0,0,2.061,7.87719C2.01171,8.94341,2.00039,9.28432,2.00039,12s.01132,3.05653.06059,4.12276a7.33352,7.33352,0,0,0,.46448,2.42731,4.888,4.888,0,0,0,1.1534,1.77146,4.9169,4.9169,0,0,0,1.77146,1.1534,7.33849,7.33849,0,0,0,2.42725.46448C8.94441,21.9879,9.28471,22,12.00039,22s3.05658-.01132,4.12281-.06059a7.33339,7.33339,0,0,0,2.42726-.46448,5.11251,5.11251,0,0,0,2.92492-2.92486,7.316,7.316,0,0,0,.46447-2.42731c.0485-1.067.05976-1.40708.05976-4.12276S21.98835,8.94341,21.93985,7.87719Zm-1.799,8.16406a5.54872,5.54872,0,0,1-.344,1.85708,3.31133,3.31133,0,0,1-1.89825,1.89741,5.52231,5.52231,0,0,1-1.85708.344c-1.05408.04844-1.37068.05815-4.04119.05815s-2.98623-.00971-4.04-.05815a5.5263,5.5263,0,0,1-1.85708-.344,3.10771,3.10771,0,0,1-1.15024-.748,3.085,3.085,0,0,1-.748-1.1494,5.52134,5.52134,0,0,1-.344-1.85708c-.0485-1.05408-.05815-1.37068-.05815-4.04119s.01049-2.98623.05815-4.0412a5.56308,5.56308,0,0,1,.344-1.857,3.1074,3.1074,0,0,1,.748-1.15024,3.08175,3.08175,0,0,1,1.15024-.748,5.52271,5.52271,0,0,1,1.85708-.344c1.05407-.04849,1.37068-.05815,4.04-.05815s2.98623.01049,4.04119.05815a5.5635,5.5635,0,0,1,1.85708.344,3.30957,3.30957,0,0,1,1.89825,1.89825,5.52254,5.52254,0,0,1,.344,1.857c.04849,1.055.05815,1.37074.05815,4.0412S20.18936,14.98628,20.14087,16.04125Z"/><path fill="white" d="M17.339,5.462h-.00044a1.19979,1.19979,0,1,0,.00044,0Z"/></g></svg>
        
        <svg  className="cursor-pointer ml-7 2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3 xs:w-2 xs:h-2" onClick={() => {
      window.location.href = 'https://www.facebook.com/';
    }}viewBox="0 0 16 16"><path fill="white" fill-rule="evenodd" d="M12 5.5H9v-2a1 1 0 0 1 1-1h1V0H9a3 3 0 0 0-3 3v2.5H4V8h2v8h3V8h2l1-2.5z" clip-rule="evenodd"/></svg>
        
        <svg  className="ml-8 cursor-pointer 2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3 xs:w-2 xs:h-2" onClick={() => {
      window.location.href = 'https://www.linkedin.com/';
    }} viewBox="0 0 16 16"><g fill="white"><path d="M0 5h3.578v11H0zM13.324 5.129c-.038-.012-.074-.025-.114-.036a2.32 2.32 0 0 0-.145-.028A3.207 3.207 0 0 0 12.423 5c-2.086 0-3.409 1.517-3.845 2.103V5H5v11h3.578v-6s2.704-3.766 3.845-1v7H16V8.577a3.568 3.568 0 0 0-2.676-3.448z"/><circle cx="1.75" cy="1.75" r="1.75"/></g></svg>
        
        <svg  className="mr-8 cursor-pointer ml-11 2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3 xs:w-2 xs:h-2" onClick={() => {
      window.location.href = 'https://www.twitter.com/';
    }} viewBox="0 0 16 16"><path fill="white" d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794 3.28 3.28 0 0 0-5.674 2.243c0 .26.022.51.076.748a9.284 9.284 0 0 1-6.761-3.431 3.285 3.285 0 0 0 1.008 4.384A3.24 3.24 0 0 1 .64 6.578v.036a3.295 3.295 0 0 0 2.628 3.223 3.274 3.274 0 0 1-.86.108 2.9 2.9 0 0 1-.621-.056 3.311 3.311 0 0 0 3.065 2.285 6.59 6.59 0 0 1-4.067 1.399c-.269 0-.527-.012-.785-.045A9.234 9.234 0 0 0 5.032 15c6.036 0 9.336-5 9.336-9.334 0-.145-.005-.285-.012-.424A6.544 6.544 0 0 0 16 3.539z"/></svg>
       
       
        </div>

        <div className='h-10 w-[40%] bg-[#423265]  rounded-tl-full'></div>
        </div>
    </footer>
  
  </body>

  )
}

export default Footer
