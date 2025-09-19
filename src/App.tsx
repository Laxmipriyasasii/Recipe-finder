import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SingleRecipe from './components/SingleRecipe';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
        </Routes>
      </Router>
    </>
  )
}
