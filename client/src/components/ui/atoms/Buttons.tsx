import React from 'react'
import { AiFillDelete, AiOutlineRight } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";

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
        <div className='flex'><span>Access</span> <span className='px-2 pt-1'><AiOutlineRight/></span> </div>
      </button>
    </div>
  )
}
export  function AttemptButton() {
    return (
      <div>
        <button className="pt-1 pb-2 pl-5 text-sm font-semibold text-white bg-cyan-600 rounded-3xl hover:bg-cyan-800 ">
          <div className='flex'><span>Attempt</span> <span className='px-3 pt-1'><AiOutlineRight/></span> </div>
        </button>
      </div>
    )


}

export  function AcceptButton() {
  return (
    <div>
      <button className="pt-3 pb-4 pl-8 pr-2 text-sm font-semibold text-white rounded-md hover:bg-cyan-900 bg-cyan-700">
        <div className='flex'><span className="text-lg font-normal">Accept</span> <span className='px-3 pt-0'><BiCheck size="2em"/></span> </div>
      </button>
    </div>
  )


}

export  function RejectButton() {
  return (
    <div>
      <button className="pt-3 pb-4 pl-8 pr-2 text-sm font-semibold text-white bg-[#586B7D] rounded-md hover:bg-slate-700">
        <div className='flex'><span className="text-lg font-normal">Reject</span> <span className='px-3 pt-0'><AiFillDelete size="1.8em"/></span> </div>
      </button>
    </div>
  )


}


export  function RemoveUserButton() {
  return (
    <div>
      <button className="pt-3 pb-4 pl-8 pr-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
        <div className='flex'><span className="text-lg font-normal">Remove User</span> <span className='px-3 pt-0'><AiFillDelete size="1.8em"/></span> </div>
      </button>
    </div>
  )


}


