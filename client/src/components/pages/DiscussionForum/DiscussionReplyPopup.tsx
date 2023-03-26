import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SubmitButton } from '../../ui/atoms/Buttons';



function DiscussionReplyPopup(props: { classId: string, subjectId:string ,userid:String,id:string}) {
  // Define state to hold the input field values
  const [formValues, setFormValues] = useState({
    classId:props.classId,
    subjectId:props.subjectId,
    discussionTopic: '',
    userid:props.userid,
    message: '',
    motherDiscussionId:props.id,
    dateTime:  new Date().toISOString(),
  });
  

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
        userid: '',
        message: '',
        motherDiscussionId: '',
        dateTime:'',
      });

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
        <h1 className='pb-4 text-xl font-semibold text-center text-slate-700'>Add a reply</h1>
        <div className='flex'>
          <div className="basis-1/3">
            <p className="p-[13.5px]">Message</p>
          </div>
          <div className="basis-2/3 ">
            <form onSubmit={handleSubmit}>
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

export default DiscussionReplyPopup
