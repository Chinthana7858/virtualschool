import Axios , {AxiosResponse, AxiosError} from 'axios'
import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../ui/templates/Footer/Footer";
//import {useLocalState} from "./useLocalState"

interface ViewLinkProps {
  url: string;
  children?: React.ReactNode;
}

const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [open, setOpen] = useState(true);
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let errors: FormErrors = {};
    let isValid = true;

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //const[jwt,setJwt] =useLocalState("","jwt");
  const navigate = useNavigate();


  async function sendLoginRequest(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (validateForm()) {
        try {
          await Axios.post("http://localhost:8085/api/vi/users/login", {
            email: email,
            password: password,
            }).then((res:any) => 
            {
             console.log(res.data);
             
             if (res.data.message == "Email not exits") 
             {
               alert("Email not exits");
             } 
             else if(res.data.message == "Login Success")
             { 
                if(res.data.role=="PRINCIPAL"){
                  navigate('/HomePagePrinciple');
                }else if(res.data.role=="TEACHER"){
                  navigate('/HomePageTeacher');

                }else if (res.data.role=="ADMIN"){
                  navigate('/HomePageAdmin');

                }else if (res.data.role=="STUDENT"){
                  navigate('/HomePageStudent');

                }else if(res.data.role=="PARENT"){
                  navigate('/HomePageParent');

                }
                
             } 
              else 
             { 
                alert("Incorrect Email and Password not match");
             }
          }, (fail: any) => {
           console.error(fail); // Error!
  });
        }

 
         catch (err) {
          alert(err);
        }
  }}
  return (
    
     
<div className="bg-[#dee2e6] 100vh">
  
  <br></br><br></br><br></br><br></br><br></br>
<div className="d-flex flex-column align-items-center p-8">
  <h1 className="p-2">Sign in</h1>
  <h5>Sign in and enjoy learning !</h5>
  <br></br>
      <form>
        <div className="d-flex flex-column justify-content-round">
        
            <div className="form-group p-2 w-[400px]">
              <label style={{padding:"5px"}}>E-mail</label>
              <input type="text" className="form-control" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="E-mail"></input>
              {errors.email && <span style={{color:"#ff0000"}}>{errors.email}</span>}
            </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Password</label>
              <i className={`password-toggle-icon ${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
            onClick={togglePasswordVisibility}
          ></i><input type={showPassword ? 'password' : 'text'} className="form-control" id="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Password"></input>
              
              {errors.password && <span style={{color:"#ff0000"}}>{errors.password}</span>}
            </div>    
        </div>
        <div className="d-flex flex-column align-items-center p-5">
          <button type="submit" className="btn btn-primary p-2" onClick={sendLoginRequest} style={{backgroundColor:"#6f42c1",borderRadius:"4px",border:"none",padding:"10px",width:"130px"}}>Sign In</button>
        </div>
      </form>
    <h6>Still don't have an account? </h6>
    <div className="d-flex flex-column align-items-center">
          <button type="button" className="btn btn-primary p-2" onClick={() => navigate("/Registration")} style={{backgroundColor:"#20c997",borderRadius:"4px",border:"none",padding:"10px",width:"130px"}}>Sign Up</button>
    </div>
</div>
<div className="top-[120%]">
  <Footer/>
</div>
</div>
    
    
  );
};


export default Login;