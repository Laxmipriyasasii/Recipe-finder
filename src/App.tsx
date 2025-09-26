import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SingleRecipe from './components/SingleRecipe';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          <Route path="/recipe/:id" element={<SingleRecipe />} />
        </Routes>
      </Router>
    </>
  )
}
