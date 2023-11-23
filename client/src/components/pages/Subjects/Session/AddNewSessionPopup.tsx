import React, { useState } from 'react';
import { SubmitButton } from '../../../ui/atoms/Buttons';

interface AddNewSessionPopupProps {
    topicId:string;
}

function AddNewSessionPopup(props: AddNewSessionPopupProps) {
  // Define state to hold the input field values
  const [formValues, setFormValues] = useState({
    topicId:props.topicId,
    date:'',
    startingTime:'',
    link:''
  }); 

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send the form data to the backend using an HTTP request
    const response = await fetch(`http://localhost:8080/api/v1/sessions`, {
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
    topicId:'',
    date:'',
    startingTime:'',
    link:''
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
            <p className="p-[13.5px]">Date</p>
            <p className="p-[13.5px]">Time</p>
            <p className="p-[13.5px]">Link</p>
          </div>
          <div className="basis-2/3">
            <form onSubmit={handleSubmit}>
            
              <input type="date" name="date" value={formValues.date} className="p-1 m-2 border rounded-md border-slate-400 w-[60%]" onChange={handleInputChange} />
              <input type="time" name="startingTime" value={formValues.startingTime} className="p-1 m-2 border rounded-md border-slate-400 w-[60%]" onChange={handleInputChange} />
              <input type="Text" name="link" value={formValues.link} className="p-1 m-2 border rounded-md border-slate-400 w-[60%]" onChange={handleInputChange} />

      <button type="submit" onClick={() => window.location.reload()} className='w-[60%]'><SubmitButton/></button>
    </form>
      </div>
      </div>
      </div>
    </>
  )
}

export default AddNewSessionPopup
