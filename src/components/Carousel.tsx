import Slider from 'react-slick';
import axios from 'axios'
import { useEffect, useState, } from 'react';
import type { Recipe } from './recipe.type';
import { useNavigate } from 'react-router-dom';
// Custom Next Arrow Component

  

export default function Carousel() {
  const [recipe, setRecipe] = useState<Recipe[]>([]);
  const [err, setErr] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3001/recipes')
      .then(res =>
        setRecipe(res.data)
      )
      .catch(e => {
        setErr("error in fetching data")
      }
      )
  })
  const goToRecipe = (id: number) => {
    navigate(`/recipe/${id}`)
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  return (
    <div className="App pad-10">
      <Slider {...settings}>
        {recipe.slice(-6).map((data) => (
          <div className="pad-10 flex-center" onClick={() => goToRecipe(data.id)}>
            <div className="c  marque">
              <img src={`../src/assets/${data.img}`} className='food-image caro-img'></img>
              <div className='flex space-between pad-10'><div style={{display:'flex',flexDirection:'column'}}><h4 className='ternary new_rec mar-0 err-text fa-10'>{data.name}</h4>
              <div style={{display:'flex',flexDirection:'row',gap:'2px'}}>
                <span className="material-symbols-outlined purple font-large">schedule </span>
                <h4 className='mar-0 err-text purple fa-10'>{data.total_time}</h4></div></div><span className="material-symbols-outlined purple">double_arrow</span>
              </div>

            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
