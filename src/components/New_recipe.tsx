
import React from 'react'
import Marquee from "react-fast-marquee";
import axios from 'axios'
import { useEffect,useState, } from 'react';
import type { Recipe } from './recipe.type';
import { useNavigate } from 'react-router-dom';

export default function New_recipe() {
    const [recipe,setRecipe]=useState<Recipe[]>([]);
    const [err,setErr]=useState("")
    const navigate = useNavigate()
    useEffect(()=>{
      axios.get('http://localhost:3001/recipes')
      .then(res=>
        setRecipe(res.data)
      )
      .catch(e=>{
         setErr("error in fetching data")
      }
      )
    })
    const goToRecipe=(id:number)=>{
       navigate(`/recipe/${id}`)
    }
  return (
   <Marquee speed={30} pauseOnHover={true} className='pad-15 '>
    <div style={{ display: 'flex', alignItems: 'center',borderRadius:'5px'}} >
      {recipe.slice(-6).map((data)=>(
       <div className="pad-10" onClick={() => goToRecipe(data.id)}>
        <div className="c  marque">
                                <img src={`../src/assets/${data.img}`} className='food-image'></img>
                                <div className='flex space-between pad-10 '><h3 className='ternary new_rec'>{data.name}</h3><span className="material-symbols-outlined purple">double_arrow</span>
                                   
                                </div>
                             
                            </div>
       </div>
      ))}

   </div>
   </Marquee>

  )
}

