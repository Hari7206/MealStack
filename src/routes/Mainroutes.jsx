import React from 'react'
import { Routes , Route} from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Recipes from '../Pages/Recipes'
import Create from '../Pages/Create'

function Mainroutes() {
  return (
    <Routes>
<Route path="/" element={<Home/>} />
<Route path="/about" element={<About/>} />
<Route path="/recipes" element={<Recipes/>} />
<Route path="/create-recipes" element={<Create/>} />
    </Routes>
  )
}

export default Mainroutes