import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../ui/templates/Footer/Footer";

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
  
  const navigate = useNavigate();
  return (
    
     
<div className="bg-[#dee2e6] 100vh">
<div className="d-flex flex-column align-items-center p-3">
  <h1 className="p-2">Sign in</h1>
      <form>
        <div className="d-flex justify-content-round">
          
          <div className="p-3 w-100">
            
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>E-mail</label>
              <input type="text" className="form-control" id="email" name="email" placeholder="E-mail"></input>
            </div>
            
          
          
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Password</label>
              <input type="text" className="form-control" id="password" name="password" placeholder="Password"></input>
            </div>
            </div> 
        </div>
        <div className="d-flex flex-column align-items-center">
          <button type="button" className="btn btn-primary p-2" style={{backgroundColor:"#6f42c1",borderRadius:"4px",border:"none",padding:"10px",width:"130px"}}>Submit</button>
        </div>
      </form>
</div>
<div className="top-[120%]">
  <Footer/>
</div>
</div>
    
    
  );
};


export default Login;