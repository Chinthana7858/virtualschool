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
  const [emailConfirmation, setEmailConfirmation] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (formValues.email !== emailConfirmation) {
      alert('Email confirmation does not match.');
      return;
    }
  
    if (formValues.passWord !== passwordConfirmation) {
      alert('Password confirmation does not match.');
      return;
    }
  
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
    window.location.href = "/";
  };
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEmailConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailConfirmation(event.target.value);
  };

  const handlePasswordConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(event.target.value);
  };

  return (
    <>
      <div className="bg-blue-50">
        <h1 className="pb-4 text-xl font-semibold text-center text-slate-700">Update details</h1>
        <div className="flex">
          <div className="basis-1/3">
            <p className="p-[13.5px]">Contact no</p>
            <p className="p-[13.5px]">Address</p>
            <p className="p-[13.5px]">email</p>
            <p className="p-[13.5px]">Confirm email</p>
            <p className="p-[13.5px]">Password</p>
            <p className="p-[13.5px]">Confirm Password</p>
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
              <input
                type="email"
                name="emailConfirmation"
                value={emailConfirmation}
                className="p-1 m-2 border rounded-md border-slate-400"
                onChange={handleEmailConfirmationChange}
              />
              <input
                type="password"
                name="passWord"
                value={formValues.passWord}
                className="p-1 m-2 border rounded-md border-slate-400"
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                className="p-1 m-2 border rounded-md border-slate-400"
                onChange={handlePasswordConfirmationChange}
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
