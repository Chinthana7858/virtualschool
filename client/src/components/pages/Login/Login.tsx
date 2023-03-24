import Axios , {AxiosResponse, AxiosError} from 'axios'
import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../ui/templates/Footer/Footer";
import {useLocalState} from "./useLocalState"

interface ViewLinkProps {
  url: string;
  children?: React.ReactNode;
}

const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);

const required = (value: any) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const [open, setOpen] = useState(true);
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');

  const[jwt,setJwt] =useLocalState("","jwt");
  const navigate = useNavigate();

  async function sendLoginRequest(e: { preventDefault: () => void; }) {
    e.preventDefault();
        try {
          await Axios.post("http://localhost:8085/api/vi/users/login", {
            email: email,
            password: password,
            }).then((res) => 
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
  }
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
              <input type="text" className="form-control" id="email" name="email" value={email} onChange={(e)=> setemail(e.target.value)} placeholder="E-mail"></input>
            </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Password</label>
              <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e)=> setpassword(e.target.value)} placeholder="Password"></input>
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