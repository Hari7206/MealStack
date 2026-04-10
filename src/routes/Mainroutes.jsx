import React from 'react'
import { Routes , Route} from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Recipes from '../Pages/Recipes'
import Create from '../Pages/Create'
import SingleRecipe from '../Pages/SingleRecipe'
import PageNotFound from '../Pages/PageNotFound'
import Fav from '../Pages/Fav'

function Mainroutes() {
  return (
    <Routes>
<Route path="/" element={<Home/>} />
<Route path="/about" element={<About/>} />
<Route path="/recipes" element={<Recipes/>} />
<Route path="/recipes/details/:id" element={<SingleRecipe/>} />
<Route path="/create-recipes" element={<Create/>} />
<Route path="/Fav" element={<Fav/>} />
<Route path="*" element={<PageNotFound/>} />
    </Routes>
  )
}

export default Mainroutes