import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SubmitButton } from '../../ui/atoms/Buttons';



function AddFeedbackPopup(props: { classId: string, subjectId: string, studentId: string }) {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId.toString());
    }
  }, []);

  
  
  // Define state to hold the input field values
  const [formValues, setFormValues] = useState({
    studentId:props.studentId,
    teacherId:userId || '',
    subjectId:props.subjectId,
    classId:props.classId,
    dateTime:  new Date().toISOString(),
    body: '',
  });
  

    // Update the formValues object when userId changes
    useEffect(() => {
      setFormValues(prevFormValues => ({
        ...prevFormValues,
        teacherId: userId || '', // Assign the userId value to the formValues object
      }));
    }, [userId]);
    


  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send the form data to the backend using an HTTP request
    const response = await fetch(`http://localhost:8080/api/v1/feedback/${props.studentId}/${formValues.teacherId}/${props.classId}/${props.subjectId}`, {
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
    studentId:'',
    teacherId:'',
    subjectId:'',
    classId:'',
    dateTime:'',
    body: '',
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
            <p className="p-[13.5px]">Feedback</p>
          </div>
          <div className="basis-2/3 "> 
            <form onSubmit={handleSubmit}>
                <div className='pt-8'>
            <textarea name="body" value={formValues.body} className="border rounded-md border-slate-400 h-[150px] w-[350px]" onChange={handleTextAreaChange}/>
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

export default AddFeedbackPopup

