import loginImage from '../assets/login3.jpg';
import '../Style/Login.css';
import '../Style/Register.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { registerBtn } from '../Data/Btn_fn';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { registerField } from '../Data/loginRegiter';
import {logout } from '../loginSlice';
import {useDispatch } from 'react-redux';
type FormDataType = {
  name: string;
  email: string;
  password: string;
  Confirm_password: string;
  [key: string]: string;
};
export default function Register() {
  const dispatch=useDispatch();
 const [formData,setFormdata] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
    Confirm_password: '',
  })
  const [success, setSuccess] = useState('');
 const [err, setErr] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
const continue_guest=()=>{
    dispatch(logout())
  }
  const handlechange=(e:any)=>{
     setFormdata({...formData,
      [e.target.id]:e.target.value})
  }
  function validateEmail(email:string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
const checkEmailExists = async (email: string) =>{
   try {
      const response = await axios.get('http://localhost:3001/register_user', {
        params: { email },
      });
      // If the email already exists, the response data length will be greater than 0
      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
}
 const handlesubmit=async (e:any)=>{
    e.preventDefault();
    
        if(formData.name === '' && formData.email === '' && formData.password === '' && formData.Confirm_password === ''){
      return setErr("All fields are required")
    }
   
    if(formData.name===''){
      return setErr("Name field is required")
    }
     if(formData.email===''){
      return setErr("Email field is required")
    }
     if(formData.password===''){
      return setErr("Password field is required")
    }
     if(formData.Confirm_password===''){
      return setErr("Confirm password field is required")
    }
     if (!validateEmail(formData.email)) {
    return setErr("Please enter a valid email address.");
  }
  const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      return setErr('Email already exists. Please use a different email.');
    }
   if(formData.password !== formData.Confirm_password){
      return setErr("Passwords doesn't match")
    }


    console.log(formData); 
    axios.post('http://localhost:3001/register_user',{
     ...formData
    })
    setErr('');
    setSuccess('Registration successful!');
    
    setFormdata({
    name: '',
    email: '',
    password: '',
    Confirm_password: '',
  });
  }
  return (
    <div className='register-container'>
    
      <div className='width'>
        <img src={loginImage} alt="Login Background" className="register" />
      </div>
      <div className="register-form">
        <form className='form'  onSubmit={handlesubmit}>
          <div className='log margin-0'>  {/*//mb-5 */}
            <span className="material-symbols-outlined logo">
              room_service
            </span>
            <h1 className=' title title1 margin-0'>RECIPE <span className='finder'>FINDER</span></h1>
          </div>
          <h2 className='orangish  title pad-15 login-register margin-0'><span>Not a member?</span>
            <br />
            <span>Sign up to get started!</span> </h2>

          {registerField.map((field, index) => {
             
            return field.type !== 'password' ? (
              <TextField
                key={index}
                id={field.id}
                label={field.label}
                type={field.type}
                variant="standard"
                value={formData[field.id]}
                onChange={(e) => handlechange(e)}
                className={field.className}
              />
            ) : (
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">{field.label}</InputLabel>
            <Input
              id={field.id}
              type={showPassword ? 'text' : 'password'}
               value={formData[field.id]}
                onChange={(e) => handlechange(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
            );
          })}

        
{success && <p className='success-msg green input-field'>{success}</p>}
 {err && <p className='error-msg red input-field'>{err}</p>}
          <Link to="/" className='text-decoration input-field' onClick={continue_guest} ><h5 className='mb-4 purple  title'>CONTINUE AS GUEST</h5></Link>
          <Button variant="contained" className='login-btn' type="submit" onClick={registerBtn}>Sign-Up</Button>
          <h5 className='login-text title ternary'>Already a member?
          <Link to="/login" className=' text-decoration'><span className='orangish'> Sign-In</span></Link></h5>
        </form>
      </div>
    </div>
  )
}
