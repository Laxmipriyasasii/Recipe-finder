import { Button, Container, Grid, Stack } from '@mui/material'
import '../App.css'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PropagateLoader from "react-spinners/PropagateLoader";
import type { Recipe } from './recipe.type';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Home() {
    const navigate = useNavigate()
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [recipe, setRecipe] = useState<Recipe[]>([]);
    const [query, setQuery] = useState("");
    const [message, setmessage] = useState<string | null>(null);
    const [showall, setShowall] = useState(false);
    const [delay, setDelay] = useState<Recipe[]>([]);
    const [meal, setMeal] = useState(["all recipe", "breakfast", "lunch", "snacks", "dinner"]);
    const [mealtype, setMealtype] = useState('all recipe')
    const [error, setError] = useState("");
    const [save, setSave] = useState<Recipe[]>([]);
    const [savedata, setSavedata] =  useState<Recipe[]>([]);
    useEffect(() => {
        axios.get('http://localhost:3001/recipes')
            .then(res => {
                setAllRecipes(res.data)
                setRecipe(res.data)

            })
            .catch(err => {
                setError("Error fetching data")
                setmessage(null)

            })
    }, [])
    useEffect(() => {
        setmessage('Loading')
        const timer = setTimeout(() => {
            setDelay(recipe)
            setmessage(null)
            console.log("delayed value", delay)
        }, 1500);
        return () => clearTimeout(timer);
    }, [recipe])

    const filteredData = delay.filter((recipe: any) => {

        const lowerQuery = query.toLowerCase();
        const recipe_name = recipe.name?.toLowerCase() || "";
        return recipe_name.includes(lowerQuery);
    })
    const Mealtype = (meal: string) => {
        setMealtype(meal)
        if (meal === 'all recipe') {
            setDelay([])
            setRecipe(allRecipes)
        }
        else {
            const res = allRecipes.filter((recipe: any) => (recipe.mealType === meal))
            setDelay([])
            setRecipe(res)
        }
    }
    const addtofavorite = (id: any) => {
        const selectedRecipe = allRecipes.find((recipe: Recipe) => recipe.id === id);
        console.log("selectedRecipe", selectedRecipe)
        if (selectedRecipe) {
           
            setSave((prevSave) => {
                // Log state directly inside the updater function (this is the state after the update)
                const updatedSave = [...prevSave, selectedRecipe];
                console.log("updated save", updatedSave);
                setSavedata(updatedSave);
                return updatedSave;
            });
            console.log("save", save)
        }
       

    }
    const handleClick = (id: any) => {
        navigate(`/recipe/${id}`);
    };
    console.log("recipes", query)
    return (

        <>

            <Stack className='stack'>

                <div className="banner">
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '1000px' }}>
                        <h1 className='title title2'>Your Desired Dish?</h1>
                        <input type='search' placeholder='Search your recipe...' className='search' id='search' value={query} onChange={(e) => setQuery(e.target.value)} />
                        <p>search any recipe e.g. burger, pizza, sandwich, toast...</p>
                    </div>
                </div>
                <div className='recipess'>
                    <Grid container spacing={0}>
                        {meal.map((meal) => {

                            return (
                                <Grid size={{ xs: 12, md: 2.4, lg: 2.4 }} className={`border-bottom text-center pad ternary ${mealtype === meal ? 'selected' : 'none'}`} onClick={() => Mealtype(meal)}>{meal}</Grid>
                            )
                        })}


                    </Grid>
                    {error && <div className='ternary text-center flex'><span className="material-symbols-outlined error">
                        error
                    </span><h4 className='err-text'>{error}</h4></div>}
                    <Grid container spacing={6} className='recipe-list' >
                        {message && error === "" && <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '1000px' }}>
                            <PropagateLoader color="#833AB4" size={20} className='padding' /></div>}
                        {(showall ? filteredData : filteredData.slice(0, 6)).map((data: any) => {
                            // const arr = data;
                            // console.log("arr", arr)

                            return (

                                <Grid size={{ xs: 12, md: 6, lg: 4 }} className="c recipe-item">
                                    <img src={`../src/assets/${data.img}`} className='food-image'></img>
                                    <div className='flex space-between pad-10'><h3 className='ternary'>{data.name}</h3>
                                    {save.some((item) => item.id === data.id) ? <FavoriteIcon className='favorite-icon red' onClick={() => addtofavorite(data.id)} /> : <FavoriteBorderOutlinedIcon className='favorite-icon ternary' onClick={() => addtofavorite(data.id)} />}
</div>
                                    <p className='ternary pad-10-top'>{data.description}</p>
                                    <Button variant="contained" className='view' onClick={() => handleClick(data.id)} >View recipe</Button>
                                </Grid>
                            )
                        })}

                    </Grid>

                    {mealtype === 'all recipe' && message === null && error === "" &&
                        <div className='flex'>
                            <span className={`material-symbols-outlined showAll`} onClick={() => setShowall(prev => !prev)}>
                                {showall ? 'north' : 'south'}
                            </span>
                        </div>
                    }
                </div>

            </Stack>
        </>


    )
}
