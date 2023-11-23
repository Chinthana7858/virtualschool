import Axios from 'axios'
import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../ui/templates/Footer/Footer";
import { BiLogIn, BiUpload } from 'react-icons/bi';
import Button from '../../ui/atoms/Buttons';


interface FormErrors {
  email?: string;
  passWord?: string;
}

const Login = () => {
  const [email,setemail]=useState('');
  const [passWord,setpassWord]=useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassWord, setShowPassWord] = useState(false);

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

    // Validate passWord
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassWord(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassWord(!showPassWord);
  };

  const navigate = useNavigate();


  async function sendLoginRequest(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await Axios.post("http://localhost:8080/api/v1/users/login", {
          email: email,
          passWord: passWord,
        });
        const data = response.data;
  
        console.log(data);
  
        if (data.msg === "Email not exists"||data.msg==='Your registration request not approved yet') {
          alert(data.msg);

        } else if (data.msg === "Login Success") {
          localStorage.setItem('userid',data.keysec);
          localStorage.setItem('studentId',data.studentId);

          if (data.role === "PRINCIPAL") {
            localStorage.setItem('role', 'PRINCIPAL');
            navigate('/HomePagePrincipal');

          } else if (data.role === "TEACHER") {
            localStorage.setItem('role', 'TEACHER');
            navigate('/HomePageTeacher');

          } else if (data.role === "ADMIN") {
            localStorage.setItem('role', 'ADMIN');
            navigate('/HomePageAdmin');

          } else if (data.role === "STUDENT") {
            localStorage.setItem('role', 'STUDENT');
            localStorage.setItem('keysec', data.keysec);
            navigate('/HomePageStudent');

          } else if (data.role === "PARENT") {
            localStorage.setItem('role', 'PARENT');
            navigate('/HomePageParent');

          }
        } else {
          alert("Incorrect Email or Password do not match");
        }
     
      } catch (err) {
        alert(err);
      }
    }
  }
  

  return (
    
     
<div className="bg-[#dee2e6] 100vh">
  
<div className="">
  <div className='pt-[3vw]'>
  <h1 className="text-5xl font-semibold text-center text-indigo-600">Sign in</h1>
  <h5 className='p-8 text-2xl font-medium text-center text-indigo-500'>Sign in and enjoy learning !</h5>
</div>

  <br></br>

      <form>
        <div className="text-center">
            <div className="py-4">
              <label className='pr-16 text-xl font-semibold text-slate-600'>E-mail</label>
              <input type="text" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="E-mail" className={`w-[15vw] p-1 rounded-lg`}></input>
              {errors.email && <div className='text-red-700'>{errors.email}</div>}
            </div>

            <div className="py-4">
              <label className='text-xl font-semibold text-slate-600'>Password</label>
              <i className={`pl-8`}
            onClick={togglePasswordVisibility}
          ></i><input type={showPassWord ? 'password' : 'text'} className="w-[15vw] p-1 rounded-lg" id="passWord" name="passWord" value={passWord} onChange={handlePasswordChange} placeholder="Password" ></input>          
              {errors.passWord && <div className='text-red-700'>{errors.passWord}</div>}
            </div>  

        </div>

        <div className='p-4 text-center'>
          <button onClick={sendLoginRequest}>
            <Button name={'Sign In'} 
                buttonType={'tab-indigo'} 
                size={'md'} 
                padding={'3'}
                icon={BiLogIn}
                />
                </button>
        </div>

      </form>

    <h6 className='p-2 text-base font-medium text-center text-blue-700'>Still don't have an account? </h6>
    <div className='p-4 text-center'>
    <Button name={'Sign Up'} 
                buttonType={'tab-green'} 
                size={'md'} 
                onClick={() => navigate("/Registration")}
                padding={'3'}
                icon={BiUpload}
                />
         
    </div>
    
</div>
<div className="">
  <Footer/>
</div>
</div>
    
    
  );
};


export default Login;