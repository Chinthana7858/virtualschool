import React, { useEffect, useState } from 'react';
import { SubmitButton } from '../../ui/atoms/Buttons';



function AddNewDiscussionPopup(props: { classId: string, subjectId:string ,userid:String}) {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId.toString());
    }
  }, []);
  
  // Define state to hold the input field values
  const [formValues, setFormValues] = useState({
    classId:props.classId,
    subjectId:props.subjectId,
    discussionTopic: '',
    userid: userId || '',
    message: '',
    motherDiscussionId: '0',
    dateTime:  new Date().toISOString(),
  });

  // Update the formValues object when userId changes
  useEffect(() => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      userid: userId || '', // Assign the userId value to the formValues object
    }));
  }, [userId]);

  
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send the form data to the backend using an HTTP request
    const response = await fetch(`http://localhost:8080/api/v1/discussionForum`, {
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
        subjectId:'',
        discussionTopic: '',
        userid:'',
        message: '',
        motherDiscussionId: '',
        dateTime:'',
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

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
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
            <p className="p-[13.5px]">Discussion Topic</p>
            <p className="p-[13.5px]">Message</p>
          </div>
          <div className="basis-2/3 "> 
            <form onSubmit={handleSubmit}>
                <div className='pt-3'>
            <input  type="text" name="discussionTopic" value={formValues.discussionTopic} className="border rounded-md border-slate-400  w-[350px]" onChange={handleInputChange} />
                </div>
                <div className='pt-8'>
            <textarea name="message" value={formValues.message} className="border rounded-md border-slate-400 h-[150px] w-[350px]" onChange={handleTextAreaChange}/>
                </div>
                <div className="p-10">
            <button type="submit" onClick={() => window.location.reload()}><SubmitButton/></button>
                </div>
            </form>
      </div>
      </div>
      </div>
    </>
  )
}

export default AddNewDiscussionPopup
