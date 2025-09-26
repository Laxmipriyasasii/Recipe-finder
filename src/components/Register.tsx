import loginImage from '../assets/login3.jpg';
import '../Style/Login.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { registerField } from '../Data/loginRegiter';

export default function Register() {
//     const [showPassword, setShowPassword] =useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };

//   const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };
    return (
        <div className='login-container'>
            <div className='width'>
                <img src={loginImage} alt="Login Background" className="register" />
            </div>
            <div className="register-form">
                <form className='form'>
                    <div className='log mb-5'>
                        <span className="material-symbols-outlined logo">
                            room_service
                        </span>
                        <h1 className=' title title1'>RECIPE <span className='finder'>FINDER</span></h1>
                    </div>
                    <h2 className='orangish  title login-register'><span>Not a member?</span>
                        <br />
                        <span>Sign up to get started!</span> </h2>

                    {registerField.map((field, index) => (
                        <TextField
                            key={index} 
                            id={field.id}
                            label={field.label}
                            type={field.type}
                            variant="standard"
                            className={field.className}
                        />
                    ))}
                    {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
        </FormControl> */}


                    <Link to="/" className='text-decoration input-field' ><h5 className='mb-4 purple  title'>CONTINUE AS GUEST</h5></Link>
                    <Button variant="contained" className='login-btn' type="submit">Sign-Up</Button>
                    <h5 className='login-text title ternary'>Already a member?
                        <Link to="/" className=' text-decoration'><span className='orangish'>Sign-In</span></Link></h5>



                </form>
            </div>
        </div>
    )
}
