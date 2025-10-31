import React, { use } from 'react';
import loginImage from '../assets/login3.jpg';
import '../Style/Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';
import { loginField } from '../Data/loginRegiter';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch,useSelector } from 'react-redux';
import { login,logout } from '../loginSlice';
type formDataType = {  
  name:string,
  email: string,
  password: string,
  [key: string]: string;
}
export default function Login() {
  const dispatch=useDispatch();
  
  
  const Navigate = useNavigate();
   const [Uname,setName]=useState('');
  const [err, setErr] = useState('');
  const [formData, setFormData] = useState<formDataType>({
    name:'',
    email: '',
    password: ''
  });
 
  const handlechange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const continue_guest=()=>{
    dispatch(logout())
  }
//  const handleLogin=()=>{
//   dispatch(login({name:formData.n}))
//  } 
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.email === '' && formData.password === '') {
      return setErr("All fields are required")
    }

    if (formData.email === '') {
      return setErr("Email field is required")
    }
    if (formData.password === '') {
      return setErr("Password field is required")
    }
    if (!validateEmail(formData.email)) {
      return setErr("Please enter a valid email address.");
    }
    try {
      const response = await axios.get('http://localhost:3001/register_user', {
        params: { email: formData.email },
      })
      if (response.data.length === 0) {
        console.log('response', response.data);
        return setErr("Email does not exist.Please sign up.");
      }
      const user = response.data[0];
      setName(user.name)
      
      if (user.password !== formData.password) {
        return setErr("Incorrect password. Please try again.");
      }
     dispatch(login({ name: user.name, email: user.email }))
      Navigate('/')

    }
    catch (error) {
      console.error('Error during login:', error);
    }
   
    console.log('logged user', formData);
    setFormData({
      email: '',
      password: '',
      name:''
    });
    setErr('');
  }
  return (
    <div className='login-container'>
      <div className='width'>
        <img src={loginImage} alt="Login Background" className='image' />
      </div>
      <div className="login-form">
        <form className='form' onSubmit={handleSubmit}>
          <div className='log '>
            <span className="material-symbols-outlined logo">
              room_service
            </span>
            <h1 className=' title title1'>RECIPE <span className='finder'>FINDER</span></h1>
          </div>
          <h2 className='orangish  title login-register'>Welcome back, Sign-In!</h2>
          {loginField.map((field, index) => {

            return field.type !== 'password' ? (
              <TextField
                key={index}
                id={field.id}
                label={field.label}

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
          {err && <p className='error-msg red input-field'>{err}</p>}



          <Link to="/" className='text-decoration input-field' onClick={continue_guest}><h5 className='mb-4 purple  title'>CONTINUE AS GUEST</h5></Link>
          <Button variant="contained" className='login-btn' type="submit" >Sign-In</Button>
          <h5 className='login-text title ternary'>Not a member?
            <Link to="/register" className=' text-decoration'><span className='orangish'> Sign-Up</span></Link></h5>



        </form>
      </div>
    </div>
  );
}

