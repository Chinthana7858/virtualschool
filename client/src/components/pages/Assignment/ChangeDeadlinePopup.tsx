import React, { useState } from 'react';
import { SubmitButton } from '../../ui/atoms/Buttons';



function ChangeDeadlinePopup (props: {assignmentId:string}) {
  // Define state to hold the input field values
  const [formValues, setFormValues] = useState({
    newDueDate:''
  });

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send the form data to the backend using an HTTP request
    const response = await fetch(`http://localhost:8080/api/v1/assignment/${props.assignmentId}/dueDate`, {
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
      newDueDate:''
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
      <div className='text-center'>
      <form onSubmit={handleSubmit}>
      <input type="datetime-local" name="newDueDate" value={formValues.newDueDate} 
      className="p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange} />
      <div className='text-center'><button type="submit" onClick={() => window.location.reload()}>
      <SubmitButton/>
      </button></div>
      </form>
      </div>
      </div>
    </>
  )
}

export default ChangeDeadlinePopup