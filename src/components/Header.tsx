import {Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import '../Style/Header.css';
import { navBar } from '../Data/loginRegiter';
import {useSelector} from 'react-redux';
import type { RootState } from '../store';

export default function Header() {
  const user_details=useSelector((state: RootState) => state.user);
     const { name, email, isAuthenticated } = user_details;
     console.log('auth',isAuthenticated)
     const firstletter=name.charAt(0)
  return (
   <header className='head'>
               <Stack direction="row" justifyContent="space-between">
                 <Link className='text-decoration' to='/'><div className='log'>
                    <span className="material-symbols-outlined logo">
                        room_service
                    </span>
                    <h1 className=' title title1'>RECIPE <span className='finder'>FINDER</span></h1>
                </div></Link>
                <ul style={{padding:'6px 30px',display:'flex',margin: '0'}}>
                       {navBar.map((navList)=>(
                        <Link to={navList.link} key={navList.id} className='text-decoration'><h3  className= 'nav-list'>{navList.title}</h3></Link>
                       ))}
                       </ul>
                       <ul style={{padding:'6px 30px',display:'flex',margin: '0'}}>
                       {!isAuthenticated ?<><Link to="/login" className='text-decoration'><h3  className= 'login-nav-list'>Sign-In</h3></Link><Link to="/register"  className='text-decoration '><h3  className= 'nav-list logi'>Sign-Up</h3></Link></>
                       :<><Link to="/login"  className='text-decoration '><h3  className= 'nav-list logi'>Logout</h3></Link><Link to='/' className='text-decoration pad10'><h3 className=' profile' >{firstletter}</h3></Link></>
                        }
                        </ul>
                      
                
               </Stack>

            </header>
  )
}
