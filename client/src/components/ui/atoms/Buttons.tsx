import React from 'react'
import { AiFillDelete, AiOutlineRight } from "react-icons/ai";
import { FiCheckSquare} from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { CgArrowUpR } from "react-icons/cg";
import { BsFillPencilFill } from "react-icons/bs";
import { IconType } from 'react-icons';



export  function ViewButton() {
  return (
    <div>
      <button className="pt-1 pb-2 pl-5 text-sm font-semibold text-white bg-[#586B7D] rounded-3xl hover:bg-slate-700 ">
        <div className='flex'><span>View</span> <span className='px-4 pt-1'><AiOutlineRight/></span> </div>
      </button>
    </div>
  )
}

export  function AccessButton() {
  return (
    <div>
      <button className="pt-1 pb-2 pl-5 text-sm font-semibold text-white bg-cyan-600 rounded-3xl hover:bg-cyan-800 ">
        <div className='flex'><span>Access</span> <span className='px-3 pt-1'><AiOutlineRight/></span> </div>
      </button>
    </div>
  )
}

export  function SubmitButton() {
  return (
    <div>
      <button className="pt-2 pb-3 px-4  text-sm font-semibold text-white bg-[#4e407c] rounded-md hover:bg-[#362648]">
        <div className='flex'><span className="font-normal text-md">Submit</span> <span className='px-3 pt-0'><FiCheckSquare size="1.5em"/></span> </div>
      </button>
    </div>
  )


}

export  function CloseButton() {
  return (
    <div>
      <button className=" p-1 text-sm font-semibold text-white bg-[#ce3a3a] rounded-sm hover:bg-[#bb2944]">
        <div className='flex'><span className="font-normal text-md"></span> <span className=''><RxCross2 size="1em"/></span> </div>
      </button>
    </div>
  )


}

export  function ResultsAdd() {
  return (
      <div>
          <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-600">
          <div className="text-black hover:text-[#f5f0f0]"><BsFillPencilFill size="1em"/></div>
         </button>
     </div>
  )
}

export  function ExtraTinyDelete() {
  return (
      <div>
          <button className="p-2 bg-red-400 rounded-lg hover:bg-red-600">
          <div className="text-red-900 hover:text-[#f5f0f0]"><AiFillDelete size="1em"/></div>
         </button>
     </div>
  )
}

interface ButtonProps {
  name: any;
  type?: any;
  buttonType: string;
  onClick?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl-long';
  padding?: string;
  other?: any;
  icon?: IconType;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  name,
  type = 'button',
  buttonType,
  onClick,
  size = 'md',
  padding = '3',
  icon: Icon = CgArrowUpR,
}) => {
  let width;
  let buttonProperty;

  if (size === 'xs') {
    width = 'w-16';
  } else if (size === 'sm') {
    width = 'w-24';
  } else if (size === 'md') {
    width = 'w-38';
  } else if (size === 'lg') {
    width = 'w-52';
  } else if (size === 'xl') {
    width = 'w-72';
  } else if (size === 'xl-long') {
    width = 'w-[75%]';
  }

  if (buttonType === 'primary') {
    buttonProperty =
      'bg-cyan-700 text-white rounded-xl hover:bg-cyan-800 text-sm';
  }
  else if (buttonType === 'primary-red') {
        buttonProperty =
          'bg-red-700 text-white rounded-xl hover:bg-red-800 text-sm';
  } else if (buttonType === 'secondary') {
    buttonProperty =
      'bg-blue-700 hover:bg-blue-800 border rounded-lg text-white text-base';
  } else if (buttonType === 'secondary-red') {
    buttonProperty =
    'bg-red-700 hover:bg-red-800 border rounded-lg text-white text-base';
  }else if (buttonType === 'tab') {
    buttonProperty =
    'bg-sky-700 hover:bg-sky-900 text-white text-sm border rounded';
  }else if (buttonType === 'tab-red') {
    buttonProperty =
    'bg-red-700 hover:bg-red-900 text-white text-sm border rounded';
  }
  

  return (
    <button
      name={name}
      type={type}
      onClick={onClick}
      className={` ${buttonProperty} ${width} px-${padding} py-${padding}`}
    >
     <span className='flex'><span className='pl-3'> {name} </span><span className='px-3'><Icon size="1.5em"/></span></span>
    </button>
  );
};

export default Button;
