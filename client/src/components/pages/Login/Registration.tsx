
import Footer from "../../ui/templates/Footer/Footer";
import {useState } from "react";
import Button from "../../ui/atoms/Buttons";
import { useNavigate } from "react-router-dom";
import { BiLogIn, BiUpload } from "react-icons/bi";
import axios from "axios";


interface FormErrors {
  
  userid?:string;
  userState?:string;
  userRole?:string;
  nameWithInitials?:string;
  fullName?:string;
  phoneNo?:string;
  dateOfBirth?:string;
  email?: string;
  nic?:string;
  gender?:string;
  address?:string;
  passWord?: string;
  studentId?:string;
}

const Registration = () => {
  
  const options = [
    {
      label: "PARENT",
      value: "PARENT",
    },
    {
      label: "STUDENT",
      value: "STUDENT",
    },
    {
      label: "PRINCIPAL",
      value: "PRINCIPAL",
    },
    {
      label: "TEACHER",
      value: "TEACHER",
    },
  ];

  const Genderoptions = [
    {
      label: "MALE",
      value: "MALE",
    },
    {
      label: "FEMALE",
      value: "FEMALE",
    }
  ];
  const [userRole,setUserRole]=useState('');
  const [fullName,setFullName]=useState('');
  const [nameWithInitials,seNameWithInitials]=useState('');
  const [phoneNo,setphoneNo]=useState('');
  const [email,setemail]=useState('');
  const [address,setaddress]=useState('');
  const [dateOfBirth,setdateOfBirth]=useState('');
  const [nic,setnic]=useState('');
  const [gender,setGender]=useState('');
  const [studentId,setStudentId]=useState('');
  const [userid,setuserid]=useState('');
  const [passWord,setpassWord]=useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassWord, setShowPassWord] = useState(false);

  const validateForm = () => {
    let errors: FormErrors = {};
    let isValid = true;
    if (!userRole) {
      errors.userRole = 'User Role is required';
      isValid = false;
    }
    if (!fullName) {
      errors.fullName = 'Full name is required';
      isValid = false;
    }else if (!/^[a-zA-Z ]+$/.test(fullName)) {
      errors.fullName = 'Invalid email format. Only text characters with spaces are allowed.';
      isValid = false;
    }
    if (!nameWithInitials) {
      errors.fullName = 'Name with initials is required';
      isValid = false;
    }else if (!/^[a-zA-Z ]+$/.test(fullName)) {
      errors.fullName = 'Invalid name format. Only text characters with spaces are allowed.';
      isValid = false;
    }
    if (!gender) {
      errors.gender = 'Select gender';
      isValid = false;
    }

    if (!phoneNo) {
      errors.phoneNo = 'Phone Number is required';
      isValid = false;
    }else if (!/^\d{10}$/.test(phoneNo)) {
      errors.phoneNo = 'Invalid phone number format. Only 10 digits are allowed.';
      isValid = false;
    }
    if (!address) {
      errors.address = 'Address is required';
      isValid = false;
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = 'Date Of Birth is required';
      isValid = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
      errors.dateOfBirth = 'Invalid date format. Please use the format yyyy-MM-dd.';
      isValid = false;
    } else {
      const parts = dateOfBirth.split('-'); // Split the date using dashes (-)
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      const isValidDate = !isNaN(year) && !isNaN(month) && !isNaN(day) && month >= 1 && month <= 12 && day >= 1 && day <= 31;
    
      if (!isValidDate) {
        errors.dateOfBirth = 'Invalid date. Please enter a valid date.';
        isValid = false;
      }
    }
    


    if(userRole!=="STUDENT"){
      if (!nic) {
        errors.nic = 'NIC is required';
        isValid = false;
        
      }else if(userRole!=="STUDENT" && userRole==="PARENT"){
        if (!studentId) {
          errors.studentId = 'Student Userid is required';
          isValid = false;
        }
      }
    }
    
    if (!userid) {
      errors.userid = 'userid is required';
      isValid = false;
    }
    // Validate email
    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    }else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate password
    if (!passWord) {
      errors.passWord = 'Password is required';
      isValid = false;
    }else if (passWord.length < 8) {
      errors.passWord = 'Password must be at least 8 characters long';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassWord(!showPassWord);
  };

  const postData = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:8080/api/v1/users/save', {
          userState: '0',
          userRole,
          fullName,
          nameWithInitials,
          phoneNo,
          email,
          address,
          dateOfBirth,
          nic,
          gender,
          studentId,
          userid,
          passWord,
        })
        .then((res: any) => {
          console.log('post data', res);
          window.alert('Request sent successfully. Wait untill acept the request');
          window.location.reload();
        })
        .catch((err: any) => console.log(err));
       
    }
  };
  
  return (
    
     
<div className="bg-[#E3E3E8]">
  <div className="pl-[67vw] pt-[5vh]">
    <span className='text-xl font-semibold text-slate-600'>Already have an account?</span>
    <span className="p-1">
    <Button name={'Sign In'} 
                buttonType={'tab-indigo'} 
                size={'md'} 
                padding={'3'}
                onClick={() => navigate("/")} 
                icon={BiLogIn}
                />
      
      </span>
  </div>
<div className="">
  <h1 className="text-3xl text-slate-600 pl-[40vw] p-8 font-medium">Create a new account</h1>
      <form className="px-[10vw]">
        <div className="">
          <div className="">
          </div>
          <div className="flex">
            <div className="pl-16 basis-1/2">
            <div className='p-4 text-lg text-slate-600'>
            <label className="font-medium pr-[50px]">Select User Type</label>
            <select className="p-[1px] border-2 rounded-md w-[210px]" value={userRole} onChange={(e)=> setUserRole(e.target.value)}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.userRole && <span>{errors.userRole}</span>}
            </div>
            <div className='p-4 text-lg text-slate-600'>
              <label className="font-medium pr-[105px]">Full name</label>
              <input type="text" className='p-[1px] border-2 rounded-md' id="fullName" name="fullName" value={fullName} onChange={(e)=> setFullName(e.target.value)} placeholder="Full name"></input> 
              {errors.fullName && <span>{errors.fullName}</span>}
            </div>
            <div className="p-4 text-lg text-slate-600">
              <label className="font-medium pr-[35px]">Name with initials</label>
              <input type="text" className="p-[1px] border-2 rounded-md" id="nameWithInitials" name="nameWithInitials" value={nameWithInitials} onChange={(e)=> seNameWithInitials(e.target.value)} placeholder="Name with initials"></input> 
              {errors.nameWithInitials && <span>{errors.nameWithInitials}</span>}
            </div>
            <div className='p-4 text-lg text-slate-600'>
            <label className="font-medium pr-[70px]">Select Gender</label>
            <select className="p-[1px] border-2 rounded-md w-[210px]" value={gender} onChange={(e)=> setGender(e.target.value)}>
              {Genderoptions.map((Genderoptions) => (
                <option value={Genderoptions.value}>{Genderoptions.label}</option>
              ))}
            </select>
            {errors.gender && <span>{errors.gender}</span>}
            </div>
            <div className="p-4 text-lg text-slate-600">
              <label className="font-medium pr-[60px]">Phone number</label>
              <input type="text" className="p-[1px] border-2 rounded-md" id="phoneNo" name="phoneNo" value={phoneNo} onChange={(e)=> setphoneNo(e.target.value)} placeholder="Phone number"></input>
              {errors.phoneNo && <span>{errors.phoneNo}</span>}
             </div>
            <div className="p-4 text-lg text-slate-600">
              <label className="font-medium pr-[130px]">E-mail</label>
              <input type="text" className="p-[1px] border-2 rounded-md" id="email" name="email" value={email} onChange={(e)=> setemail(e.target.value)} placeholder="E-mail"></input>
              {errors.email && <span>{errors.email}</span>}
              <div className='pt-2 text-sm font-normal'></div>
            </div>
            </div>

            <div className="pl-16 basis-1/2">
            <div className="pl-2">
            <div className="px-4 text-lg text-slate-600">
              <label className="font-medium pr-[170px]">Address</label>
              <input type="text" className="p-[1px] border-2 rounded-md" id="address" name="address" value={address} onChange={(e)=> setaddress(e.target.value)} placeholder="Address"></input>
              {errors.address && <span>{errors.address}</span>}
              </div>
            </div>
              <div className="pl-2">
            <div className="p-4 text-lg text-slate-600">
              <label className="font-medium pr-[130px]">Date of Birth</label>
              <input type="date" className="p-[1px] border-2 rounded-md" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={(e)=> setdateOfBirth(e.target.value)} placeholder="Date of Birth"></input>
              {errors.dateOfBirth && <span>{errors.dateOfBirth}</span>}
            </div>

            <div className="p-4 text-lg text-slate-600">
              <label className="font-medium pr-[80px]">Admission Number</label>
              <input type="text" className="p-[1px] border-2 rounded-md" id="userid" name="userid" value={userid} onChange={(e)=> setuserid(e.target.value)} placeholder="Admission Number"></input>
              {errors.userid && <span>{errors.userid}</span>}
            </div>
            
            <div className="p-4 text-lg text-slate-600">
              <label className="font-medium pr-[160px]">Password</label>
              <i className={`password-toggle-icon ${showPassWord ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
            onClick={togglePasswordVisibility}></i>
            <input type={showPassWord ? 'passWord' : 'text'} className="p-[1px] border-2 rounded-md" id="passWord" name="passWord" value={passWord} onChange={(e)=> setpassWord(e.target.value)} placeholder="PassWord"></input>
            </div>

            <div className="p-4 text-lg text-slate-600">
          {userRole !== 'STUDENT' && (
          <div className="">
                  <label className="font-medium pr-[200px]">NIC </label>
                  <input type="text" className="p-[1px] border-2 rounded-md" id="nic" name="nic" value={nic} onChange={(e) => setnic(e.target.value)} placeholder="NIC"></input>
                  {errors.nic && <span>{errors.nic}</span>}
                </div>)}
                </div>
          <div className="p-4 text-lg text-slate-600">
          {userRole ==='PARENT' && (
          <div className="">
                    <label className="font-medium pr-[5px]">Student’s Admission number</label>
                    <input type="text" className="p-[1px] border-2 rounded-md" id="studentId" name="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student’s Admission number"></input>
                    {errors.studentId && <span >{errors.studentId}</span>}
                  </div>)}
                  </div>

            </div>
            </div>
          </div>
        </div>
        <div className='pl-[30vw] m-10'>
          <button type="button" onClick={postData} className="">
          <Button name={'Sign Up'} 
                buttonType={'tab-green'} 
                size={'md'} 
                padding={'3'}
                icon={BiUpload}
                /></button>
        </div>
      </form>
      
</div>
<div className="pt-[10vh]">
  <Footer/>
</div>
</div>
    
    
  );
};
export default Registration;
