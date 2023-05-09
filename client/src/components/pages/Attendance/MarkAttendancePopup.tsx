import React, { ChangeEvent, useEffect, useState } from 'react';
import { SubmitButton } from '../../ui/atoms/Buttons';



function MarkAttendancePopup(props: { classId: string, studentId:string ,date:String}) {

  // Define state to hold the input field values
  const [AttendanceformValues, setAttendanceFormValues] = useState({
    classId:props.classId,
    studentId: props.studentId,
    date: props.date,
    state:''
  });
  
  //Get users name by userid
function GetNameByuserid({ userid }: { userid: string }): JSX.Element | null{
    interface User {
  
      nameWithInitials:string;
    
    }
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/users/${userid}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }, [userid]);
  
    return user ? <span>{user.nameWithInitials}</span> : null;
  }
  

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send the form data to the backend using an HTTP request
    const response = await fetch(`http://localhost:8080/api/v1/attendance/${props.classId}/${props.studentId}/${props.date}`, {
      method: 'POST',
      body: JSON.stringify(AttendanceformValues),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Handle the server's response
    const data = await response.json();
    console.log('Server response:', data);

    // Reset the form values
    setAttendanceFormValues({
        classId:'',
        studentId: '',
        date: '',
        state:''
      });

  };
  
  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setAttendanceFormValues({
      ...AttendanceformValues,
      state: event.target.value
    });
  }

  return (
    <>
      <div className="px-10 bg-blue-50">
    <div className="pb-5">
    <div className='text-xl font-semibold text-left'><GetNameByuserid userid={props.studentId}/></div>
    <div className='text-lg text-left'>{props.date}</div>
    </div>
  <form onSubmit={handleSubmit} className="flex-col">
  
  <div className="flex pl-24 m-3 border-2 border-blue-700 rounded-xl">

  <label className="inline-flex items-center p-5">
  <input
  type="checkbox"
  value="PRESENT"
  checked={AttendanceformValues.state === "PRESENT"}
  onChange={handleInputChange}
  className="w-6 h-6"
/>
  <span className="ml-2 text-lg font-medium text-blue-900">Present</span>
  </label>


  <label className="inline-flex items-center">
  <input
  type="checkbox"
  value="ABSENT"
  checked={AttendanceformValues.state === "ABSENT"}
  onChange={handleInputChange}
  className="w-6 h-6"
/>
   <span className="ml-2 text-lg font-medium text-red-900">Absent</span>
  </label>
</div>
<button type="submit" onClick={() => window.location.reload()} className="w-[30vw] p-10"><SubmitButton/></button>
</form>
      </div>
    </>
  )
}

export default MarkAttendancePopup
