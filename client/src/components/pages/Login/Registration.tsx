
import Footer from "../../ui/templates/Footer/Footer";
import NavBar from "../../ui/templates/NavBar/NavBar";
import { useState } from "react";
import { HiBars4 } from "react-icons/hi2";
import { AccessButton, AttemptButton, ViewButton } from "../../ui/atoms/Buttons";
import HomePageDescription from "../../ui/organisms/HomePageDescription";
import SideBarAdmin from "../../ui/templates/SideBar/SideBar-Admin";
import { useNavigate } from "react-router-dom";

interface ViewLinkProps {
  url: string;
  children?: React.ReactNode;
}

const ViewLink: React.FC<ViewLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);

const Registration = () => {
  const [open, setOpen] = useState(true);
  
  const navigate = useNavigate();
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
            <select className="form-control">
              <option>Parent</option>
              <option>Principle</option>
              <option>Teacher</option>
              <option>Student</option>
            </select>
            </div>
          </div>
          <div className="p-3 w-100">
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Full name</label>
              <input type="text" className="form-control" id="fullName" name="fullName" placeholder="Full name"></input> 
            </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Phone number</label>
              <input type="text" className="form-control" id="phoneNo" name="phoneNo" placeholder="Phone number"></input>
             </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>E-mail</label>
              <input type="text" className="form-control" id="email" name="email" placeholder="E-mail"></input>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Address</label>
              <input type="text" className="form-control" id="address" name="address" placeholder="Address"></input>
            </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Date of Birth</label>
              <input type="text" className="form-control" id="dateOfBirth" name="dateOfBirth" placeholder="Date of Birth"></input>
            </div>
          </div>
          <div className="p-3 mr-6 ml-5 w-100">
          <div className="form-group p-2">
              <label style={{padding:"5px"}}>NIC (Students don't need to fill)</label>
              <input type="text" className="form-control" id="NIC" name="NIC" placeholder="NIC"></input> 
            </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>Student's User ID (For parents)</label>
              <input type="text" className="form-control" id="stUserid" name="stUserid" placeholder="Student UserID"></input>
             </div>
            <div className="form-group p-2">
              <label style={{padding:"5px"}}>User ID</label>
              <input type="text" className="form-control" id="userid" name="userid" placeholder="User ID"></input>
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
<div className="">
  <Footer/>
</div>
</div>
    
    
  );
};
export default Registration;
