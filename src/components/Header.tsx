import {Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import '../Style/Header.css';

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
                <ul style={{padding:'0px 30px',display:'flex'}}>
                    <Link to='/' className='text-decoration'><h3 className='nav-list'>Home</h3></Link>
                     <Link to='/' className='text-decoration'><h3 className='nav-list'>Recipe</h3></Link>
                      <Link to='/' className='text-decoration'><h3 className='nav-list'>About</h3></Link>
                       <Link to='/' className='text-decoration'><h3 className='nav-list'>Services</h3></Link>
                </ul>
               </Stack>

            </header>
  )
}
