
import Footer from "../../ui/templates/Footer/Footer";
import NavBar from "../../ui/templates/NavBar/NavBar";
import {  useState } from "react";
import { HiBars4 } from "react-icons/hi2";
import { AccessButton, ViewButton } from "../../ui/atoms/Buttons";
import HomePageDescription from "../../ui/organisms/HomePageDescription";
import SideBarAdmin from "../../ui/templates/SideBar/SideBar-Admin";
import { useNavigate } from "react-router-dom";
import Axios , {AxiosResponse, AxiosError} from 'axios'
import DatePicker from "react-date-picker";

interface ViewLinkProps {
  url: string;
  children?: React.ReactNode;
}

const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);
interface FormErrors {
  userRole?:string;
  fullname?:string;
  phoneNo?:string;
  address?:string;
  dateOfBirth?:string;
  NIC?:string;
  stUserid?:string;
  userid?:string;
  email?: string;
  password?: string;
}

const Registration = () => {
  const [open, setOpen] = useState(true);
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
  const [userRole,setUserRole]=useState('');
  const [fullname,setFullname]=useState('');
  const [phoneNo,setphoneNo]=useState('');
  const [email,setemail]=useState('');
  const [address,setaddress]=useState('');
  const [dateOfBirth,setdateOfBirth]=useState('');
  // const [dateOfBirth, onChange] = useState(new Date());
  const [NIC,setNIC]=useState('');
  const [stUserid,setstUserid]=useState('');
  const [userid,setuserid]=useState('');
  const [password,setpassword]=useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let errors: FormErrors = {};
    let isValid = true;
    if (!userRole) {
      errors.userRole = 'User Role is required';
      isValid = false;
    }
    if (!fullname) {
      errors.fullname = 'Full name is required';
      isValid = false;
    }else if (!/^[a-zA-Z ]+$/.test(fullname)) {
      errors.fullname = 'Invalid email format. Only text characters with spaces are allowed.';
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
    }else if (!/^\d{4}\/\d{2}\/\d{2}$/.test(dateOfBirth)) {
      errors.dateOfBirth = 'Invalid date format. Please use the format yyyy/mm/dd.';
      isValid = false;
    } else {
      const parts = dateOfBirth.split('/');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      const isValidDate = !isNaN(year) && !isNaN(month) && !isNaN(day) && month >= 1 && month <= 12 && day >= 1 && day <= 31;
      
      if (!isValidDate) {
        errors.dateOfBirth = 'Invalid date. Please enter a valid date.';
        isValid = false;
      }
    }


    if(userRole!="STUDENT"){
      if (!NIC) {
        errors.NIC = 'NIC is required';
        isValid = false;
      }else if(userRole!="STUDENT" && userRole=="PARENT"){
        if (!stUserid) {
          errors.stUserid = 'Student Userid is required';
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
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const postData = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("came",postData)
    Axios.post('http://localhost:8080/api/vi/users',{
      userRole,
      fullname,
      phoneNo,
      email,
      address,
      dateOfBirth,
      NIC,
      stUserid,
      userid,
      password
    }).then((res: any)=>console.log('post data',res)).catch((err: any)=>console.log(err))
  }
}
  return (
    
     
<div className="bg-[#dee2e6] 100vh">
  <div className="d-flex flex-column align-items-end p-3">
    <span className="p-2">Already have an account?</span>
    <span className="p-2"><button type="button" className="btn btn-primary" onClick={() => navigate("/")} style={{backgroundColor:"#6f42c1",borderRadius:"4px",border:"none",padding:"10px",width:"130px"}}>Sign In</button></span>
  </div>
<div className="d-flex flex-column align-items-center p-3">
  <h1 className="p-2">Create a new account</h1>
      <form>
        <div className="d-flex justify-content-round">
          <div className="p-3 mr-6 w-[500px]">
            <div className="form-group p-3">
            <label style={{padding:"5px"}}>Select User Type</label>
            <select className="form-control" value={userRole} onChange={(e)=> setUserRole(e.target.value)}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.userRole && <span style={{color:"#ff0000"}}>{errors.userRole}</span>}
            </div>
          </div>
          <div className="p-3 w-100">
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Full name</label>
              <input type="text" className="form-control" id="fullName" name="fullName" value={fullname} onChange={(e)=> setFullname(e.target.value)} placeholder="Full name"></input> 
              {errors.fullname && <span style={{color:"#ff0000"}}>{errors.fullname}</span>}
            </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Phone number</label>
              <input type="text" className="form-control" id="phoneNo" name="phoneNo" value={phoneNo} onChange={(e)=> setphoneNo(e.target.value)} placeholder="Phone number"></input>
              {errors.phoneNo && <span style={{color:"#ff0000"}}>{errors.phoneNo}</span>}
             </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>E-mail</label>
              <input type="text" className="form-control" id="email" name="email" value={email} onChange={(e)=> setemail(e.target.value)} placeholder="E-mail"></input>
              {errors.email && <span style={{color:"#ff0000"}}>{errors.email}</span>}
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Address</label>
              <input type="text" className="form-control" id="address" name="address" value={address} onChange={(e)=> setaddress(e.target.value)} placeholder="Address"></input>
              {errors.address && <span style={{color:"#ff0000"}}>{errors.address}</span>}
            </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Date of Birth</label>
              {/* <DatePicker onChange={onChange} value={dateOfBirth} id="dateOfBirth" name="dateOfBirth"/> */}
              <input type="text" className="form-control" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={(e)=> setdateOfBirth(e.target.value)} placeholder="Date of Birth"></input>
              {errors.dateOfBirth && <span style={{color:"#ff0000"}}>{errors.dateOfBirth}</span>}
            </div>
          </div>
          <div className="p-3 mr-6 ml-5 w-100">
          {userRole != 'STUDENT' && (
          <><div className="form-group p-2">
                  <label style={{ padding: "5px" }}>NIC </label>
                  <input type="text" className="form-control" id="NIC" name="NIC" value={NIC} onChange={(e) => setNIC(e.target.value)} placeholder="NIC"></input>
                  {errors.NIC && <span style={{color:"#ff0000"}}>{errors.NIC}</span>}
                </div></>)}
          {userRole == 'PARENT' && (
          <><div className="form-group p-2">
                    <label style={{ padding: "5px" }}>Student’s Admission number</label>
                    <input type="text" className="form-control" id="stUserid" name="stUserid" value={stUserid} onChange={(e) => setstUserid(e.target.value)} placeholder="Student’s Admission number"></input>
                    {errors.stUserid && <span style={{color:"#ff0000"}}>{errors.stUserid}</span>}
                  </div></>)}
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Admission Number</label>
              <input type="text" className="form-control" id="userid" name="userid" value={userid} onChange={(e)=> setuserid(e.target.value)} placeholder="Admission Number"></input>
              {errors.userid && <span style={{color:"#ff0000"}}>{errors.userid}</span>}
            </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Password</label>
              <i className={`password-toggle-icon ${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
            onClick={togglePasswordVisibility}
          ></i><input type={showPassword ? 'password' : 'text'} className="form-control" id="password" name="password" value={password} onChange={(e)=> setpassword(e.target.value)} placeholder="Password"></input>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <button type="button" onClick={postData} className="btn btn-primary p-2" style={{backgroundColor:"#6f42c1",borderRadius:"4px",border:"none",padding:"10px",width:"130px"}}>Submit</button>
        </div>
      </form>
      
</div>
<div className="">
  <Footer/>
</div>
</div>
    
    
  );
};
export default Registration;
