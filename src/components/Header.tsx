import {Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import '../Style/Header.css';
import { navBar } from '../Data/loginRegiter';

export default function Header() {
  return (
   <header>
               <Stack direction="row" justifyContent="space-between">
                 <Link className='text-decoration' to='/'><div className='log'>
                    <span className="material-symbols-outlined logo">
                        room_service
                    </span>
                    <h1 className=' title title1'>RECIPE <span className='finder'>FINDER</span></h1>
                </div></Link>
                <ul style={{padding:'6px 30px',display:'flex',margin: '0'}}>
                       {navBar.map((navList)=>(
                        <Link to={navList.link} key={navList.id} className='text-decoration'><h3  className={navList.className || 'nav-list'}>{navList.title}</h3></Link>
                       ))}
                </ul>
               </Stack>

            </header>
  )
}
