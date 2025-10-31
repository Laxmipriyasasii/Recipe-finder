import React from 'react'
import '../Style/Todayrecipe.css'

export default function Todayrecipe() {
  return (
    <>
      <div className="flex" style={{gap:'100px'}}>
        <img src='../src/assets/pancake.jpg' className='random-img'></img>
        <div className='recipe-day'>
          <h3>top recipe of the day</h3>
          <p>Pancakes are a popular breakfast dish made from a simple batter of flour, eggs, milk, and baking powder, which is fried on a griddle or skillet. They are typically round, flat, and fluffy, and can be served with a variety of toppings such as syrup, butter, fruit, whipped cream, or nuts. Pancakes are enjoyed worldwide, with regional variations like crepes, buttermilk pancakes, or savory versions with fillings.</p>
        </div>
      </div>
    </>
  )
}
