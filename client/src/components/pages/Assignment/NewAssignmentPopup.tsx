import React, { useState } from 'react';
import { SubmitButton } from '../../ui/atoms/Buttons';

function NewAssignmentPopup(props: { topicId: string,classId:string,subjectId:string}) {
  // Define state to hold the input field values
  const [formValues, setFormValues] = useState({
    classId:props.classId,
    subjectId:props.subjectId,
    topicId:props.topicId,
    assignmentHead: '',
    assignmentBody: '',
    dueDate: '',
    file: '' as File | string,
  });

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Create a new FormData object and add the form values to it
    const formData = new FormData();
    formData.append('classId', formValues.classId);
    formData.append('subjectId', formValues.subjectId);
    formData.append('topicId', formValues.topicId);
    formData.append('assignmentHead', formValues.assignmentHead);
    formData.append('assignmentBody', formValues.assignmentBody);
    formData.append('dueDate', formValues.dueDate);
    formData.append('file', formValues.file);
  
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
  
    // Set up event listeners for tracking upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        console.log(`Upload progress: ${percentage}%`);
        // Update the upload progress indicator in your UI
      }
    });
  
    // Set up event listener for handling upload completion
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // Do something if the upload was successful
        console.log('Upload successful');
      } else {
        // Handle the error if the upload failed
        const errorData = JSON.parse(xhr.responseText);
        console.log('Upload failed:', errorData);
        // Display error message to the user or perform other error handling
      }
    });
  
    // Set up event listener for handling upload errors
    xhr.addEventListener('error', () => {
      console.error('An error occurred during the upload');
      // Display error message to the user or perform other error handling
    });
  
    // Open and send the XMLHttpRequest
    xhr.open('POST', `http://localhost:8080/api/v1/assignment/${props.classId}/${props.subjectId}/${props.topicId}`);
    xhr.send(formData);
  };
  

  // Handle input field changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
  
    if (file) {
      const fileSizeLimit = 2000 * 1024 * 1024; // 10MB
      
      // Validate file size
      if (file.size > fileSizeLimit) {
        alert('File size exceeds the limit (2GB)');
        return;
      }
  
    }
  
    setFormValues({
      ...formValues,
      file: file || ''
    });
  };
  

  return (
    <>
          <h1 className="pb-6 text-xl font-semibold text-center">Create Assignment</h1>
    <div className='pl-24'>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <div  className='p-2'>
          
        <label>
          Short Description :
          <input type="text" name="assignmentHead" className='w-[300px]' value={formValues.assignmentHead} onChange={handleInputChange} />
        </label>
        </div>
        <br />
        <div  className='p-2'>
        <label>
          Instructions:
          <input type="textarea" name="assignmentBody" className='w-[300px] h-[150px] ml-[47px]' value={formValues.assignmentBody} onChange={handleInputChange} />
        </label>
        </div>
        <br/>
        <div  className='p-2'>
        <label>
          Due date:
          <input type="datetime-local" className='ml-[65px]' name="dueDate" value={formValues.dueDate} onChange={handleInputChange} />
        </label>
        </div>
        <br/>
        <div  className='p-2'>
        <label>
          File:
          <input type="file" className='ml-[105px]' name="file" onChange={handleFileChange} required/>
        </label>
        </div>
        <br/>
        <button type="submit" className='ml-[170px]' onClick={() => window.location.reload()}><SubmitButton/></button>
      </form>
      </div>
    </>
  );
}

export default NewAssignmentPopup;
