import React from 'react';
import loginImage from '../assets/login3.jpg';
import '../Style/Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginField } from '../Data/loginRegiter';
import { registerField } from '../Data/loginRegiter';
export default function Login() {
    const [isregister, setIsregister] = useState(false);
    const handleLoginClick = () => {
        setIsregister(!isregister);
        console.log(isregister);
    };
    return (
        <div className='login-container'>
            <div className='width'>
                <img src={loginImage} alt="Login Background" className={` ${isregister ? 'register' : 'image'}`} />
            </div>
            <div className={` ${isregister ? 'register-form' : "login-form"}`}>
                <form className='form'>
                    <div className='log mb-5'>
                        <span className="material-symbols-outlined logo">
                            room_service
                        </span>
                        <h1 className=' title title1'>RECIPE <span className='finder'>FINDER</span></h1>
                    </div>
                    <h2 className='orangish  title login-register'>{isregister ? <div>
                        <span>Not a member?</span>
                        <br />
                        <span>Sign up to get started!</span>
                    </div> : 'Welcome back, Sign-In!'} </h2>
                    {!isregister && loginField.map((field, index) => (
                        <TextField
                            key={index} // Use the index or a unique identifier from your JSON
                            id={field.id}
                            label={field.label}
                            type={field.type}
                            variant="standard"
                            className={field.className}
                        />
                    ))}
                      {isregister && registerField.map((field, index) => (
                        <TextField
                            key={index} // Use the index or a unique identifier from your JSON
                            id={field.id}
                            label={field.label}
                            type={field.type}
                            variant="standard"
                            className={field.className}
                        />
                    ))}


                     <Link to="/" className='text-decoration input-field' ><h5 className='mb-4 purple  title'>CONTINUE AS GUEST</h5></Link>
                    <Button variant="contained" className='login-btn'>{isregister ?'Sign-Up' :'Sign-In'}</Button>
                    <h5 className='login-text title ternary'>{isregister ?'Already a member?':'Not a member? '}
                        <Link to="/" className=' text-decoration' onClick={handleLoginClick}><span className='orangish'>{isregister? 'Sign-In':'Sign-Up'}</span></Link></h5> 


                    
                </form>
            </div>
        </div>
    );
}

