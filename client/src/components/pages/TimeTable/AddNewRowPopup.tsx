import React, { useState } from 'react';
import { SubmitButton } from '../../ui/atoms/Buttons';



function AddRowPopup(props: { classId: string }) {
  // Define state to hold the input field values
  const [formValues, setFormValues] = useState({
    classId:props.classId,
    rowNo: '',
    startingTime: '',
    endingTime: '',
    mondaySubject: '',
    tuesdaySubject: '',
    wednesdaySubject: '',
    thursdaySubject: '',
    fridaySubject: '',
  });

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send the form data to the backend using an HTTP request
    const response = await fetch(`http://localhost:8080/api/v1/timetables`, {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Handle the server's response
    const data = await response.json();
    console.log('Server response:', data);

    // Reset the form values
    setFormValues({
      classId:'',
      rowNo: '',
      startingTime: '',
      endingTime: '',
      mondaySubject: '',
      tuesdaySubject: '',
      wednesdaySubject: '',
      thursdaySubject: '',
      fridaySubject: '',
    });
  };

  // Handle input field changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <div className="bg-blue-50">
        <h1 className='pb-4 text-xl font-semibold text-center text-slate-700'>Enter data</h1>
        <div className='flex'>
          <div className="basis-1/3">
           
            <p className="p-[13.5px]">Row No</p>
            <p className="p-[13.5px]">Sterting time</p>
            <p className="p-[13.5px]">Ending time</p>
            <p className="p-[13.5px]">Monday</p>
            <p className="p-[13.5px]">Tuesday</p>
            <p className="p-[13.5px]">Wednesday</p>
            <p className="p-[13.5px]">Thursday</p>
            <p className="p-[13.5px]">Friday</p>
          </div>
          <div className="basis-2/3">
            <form onSubmit={handleSubmit}>
            
              <input type="number" name="rowNo" value={formValues.rowNo} className="p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange} />
              <input type="time" name="startingTime" value={formValues.startingTime} className="w-[200px] p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange} />
              <input type="time" name="endingTime" value={formValues.endingTime} className="w-[200px] p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange}/>
              <input type="text" name="mondaySubject" value={formValues.mondaySubject} className="p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange}/>
              <input type="text" name="tuesdaySubject" value={formValues.tuesdaySubject} className="p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange}/>
              <input type="text" name="wednesdaySubject" value={formValues.wednesdaySubject} className="p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange}/>
              <input type="text" name="thursdaySubject" value={formValues.thursdaySubject} className="p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange} />
              <input type="text" name="fridaySubject" value={formValues.fridaySubject} className="p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange} />
              <button type="submit" onClick={() => window.location.reload()}><SubmitButton/></button>
            </form>
         </div>
        </div>
       </div>
    </>
  )
}

export default AddRowPopup 
 