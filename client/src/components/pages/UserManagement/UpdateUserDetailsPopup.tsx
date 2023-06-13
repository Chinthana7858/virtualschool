import React, { useState } from 'react';
import { SubmitButton } from '../../ui/atoms/Buttons';

interface User {
  userid: string;
  userState:string;
  userRole: string;
  nameWithInitials: string;
  fullName: string;
  phoneNo: string;
  dateOfBirth: string;
  email: string;
  nic: string;
  gender: string;
  address: string;
  passWord: string;
  studentId:string;
  classIds: string[];
}

function UpdateUserDetailsPopup(props: User) {
  const [formValues, setFormValues] = useState<User>(props);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
  
    const shouldSubmit = window.confirm('Are you sure you want change these informathins?');
  
    if (!shouldSubmit) {
      return;
    }
  
    const response = await fetch('http://localhost:8080/api/v1/users/save', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();
    console.log('Server response:', data);
  };
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };



  return (
    <>
      <div className="bg-blue-50">
        <h1 className="pb-4 text-xl font-semibold text-center text-slate-700">Update contact details</h1>
        <div className="flex">
          <div className="basis-1/3">
            <p className="p-[13.5px]">Contact no</p>
            <p className="p-[13.5px]">Address</p>
            <p className="p-[13.5px]">email</p>
          </div>
          <div className="basis-2/3">
            <form onSubmit={handleSubmit}>
              <input
                type="string"
                name="phoneNo"
                value={formValues.phoneNo}
                className="w-[200px] p-1 m-2 border rounded-md border-slate-400"
                onChange={handleInputChange}
              />
              <input
                type="string"
                name="address"
                value={formValues.address}
                className="w-[200px] p-1 m-2 border rounded-md border-slate-400"
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                value={formValues.email}
                className="p-1 m-2 border rounded-md border-slate-400"
                onChange={handleInputChange}
              />

              <div>
                <button type="submit" onClick={() => window.location.reload()}>
                  <SubmitButton />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateUserDetailsPopup;
