import React from 'react'
import { AiFillDelete, AiFillEdit, AiOutlineRight } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { FiCheckSquare } from "react-icons/fi";
import { HiArrowRightCircle } from 'react-icons/hi2';
import { RxCross2 } from "react-icons/rx";
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



export  function TimeTableDeleteButton() {
  return (
    <div>
      <button className="pt-3 pb-4 pl-6 pr-2 text-sm font-semibold text-white bg-[#794848] rounded-md hover:bg-[#5a3131]">
        <div className='flex'><span className="font-normal text-md">Delete</span> <span className='px-3 pt-0'><AiFillDelete size="1.5em"/></span> </div>
      </button>
    </div>
  )


}

export  function TimeTableEditButton() {
  return (
    <div>
      <button className="pt-3 pb-4 pl-10 pr-2 text-sm font-semibold text-white bg-[#407c43] rounded-md hover:bg-[#264828]">
        <div className='flex'><span className="font-normal text-md">Edit</span> <span className='px-3 pt-0'><AiFillEdit size="1.5em"/></span> </div>
      </button>
    </div>
  )


}

export  function AddNewRowButton() {
  return (
    <div>
      <button className="pt-3 pb-4 px-[25vw] text-sm font-semibold text-white bg-[#4e407c] rounded-md hover:bg-[#362648]">
        <div className='flex'><span className="font-normal text-md">Add New Row</span> <span className='px-3 pt-0'><AiFillEdit size="1.5em"/></span> </div>
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



export  function RestoreUserButton() {
  return (
    <div>
      <button className="pt-3 pb-4 pl-8 pr-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
        <div className='flex'><span className="text-lg font-normal text-left">Restore User</span> <span className='px-3 pt-0'><AiFillDelete size="1.8em"/></span> </div>
      </button>
    </div>
  )

  }

  export  function DeletePermanentlyrButton() {
    return (
      <div>
        <button className="pt-3 pb-4 pl-8 pr-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
          <div className='flex'><span className="text-lg font-normal text-left">Delete Permenently</span> <span className='px-3 pt-0'><AiFillDelete size="1.8em"/></span> </div>
        </button>
      </div>
    )
  
    }

    export  function RemovedUsersButton() {
      return (
        <div>
          <button className="pt-3 pb-4 pl-8 pr-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <div className='flex'><span className="text-lg font-normal text-left">Removed Users</span> <span className='px-3 pt-0'><HiArrowRightCircle size="1.8em"/></span> </div>
          </button>
        </div>
      )
    
      }

