import React, { useState } from 'react';
import { SubmitButton } from '../../ui/atoms/Buttons';



function AddNewSectionPopup (){
  // Define state to hold the input field values
  const [formValues, setFormValues] = useState({
    sectionId:'',
    sectionName: '',
  });

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send the form data to the backend using an HTTP request
    const response = await fetch(`http://localhost:8080/api/v1/sections`, {
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
      sectionId:'',
      sectionName: '',
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
           
            <p className="p-[13.5px]">Section Id</p>
            <p className="p-[13.5px]">Section Name</p>
          </div>
          <div className="basis-2/3">
            <form onSubmit={handleSubmit}>
            
              <input type="text" name="sectionId" value={formValues.sectionId} className="p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange} />
              <input type="text" name="sectionName" value={formValues.sectionName} className="p-1 m-2 border rounded-md border-slate-400" onChange={handleInputChange} />

      <button type="submit" onClick={() => window.location.reload()}><SubmitButton/></button>
    </form>
      </div>
      </div>
      </div>
    </>
  )
}

export default AddNewSectionPopup
