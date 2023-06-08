import React, { useEffect, useState } from 'react';
import { SubmitButton } from '../../ui/atoms/Buttons';

function SubmissionPopup(props: { assignmentId: string}) {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId.toString());
    }
  }, []);
  
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  // Define state to hold the input field values
  const [formValues, setFormValues] = useState({
    submissionBody: '',
    submissionDate:  formattedDate,
    file: '' as File | string,
  });

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Create a new FormData object and add the form values to it
    const formData = new FormData();
    formData.append('submissionBody', formValues.submissionBody);
    formData.append('submissionDate', formValues.submissionDate);
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
    xhr.open('POST', `http://localhost:8080/api/v1/assignmentSubmit/${props.assignmentId}/${userId}`);//Hardcoded
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
          <h1 className="pb-6 text-xl font-semibold text-center">Submit Assignment</h1>
    <div className='pl-24'>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <div  className='p-2'>
          
        <label>
          Submission body:
          <input type="text" name="submissionBody" className='w-[300px]' value={formValues.submissionBody} onChange={handleInputChange} />
        </label>
        </div>
        <br />
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

export default SubmissionPopup;
