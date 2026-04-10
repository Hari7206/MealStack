import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <div className='flex justify-end gap-10 px-40'>
        <NavLink
         className={(e)=> e.isActive && 'text-red-700  text-[1.2rem]'}
        to={"/"}
        >
           Home
        </NavLink>
        <NavLink
         className={(e)=> e.isActive && 'text-red-700 flex justify-center gap-10px text-[1.2rem]'}
        to={"/about"}
        >
           About
        </NavLink>
        <NavLink
         className={(e)=> e.isActive && 'text-red-700 flex justify-center gap-10px text-[1.2rem]'}
        to={"/recipes"}
        >
           Recipes
        </NavLink>
        <NavLink
         className={(e)=> e.isActive && 'text-red-700 flex justify-center gap-10px text-[1.2rem]'}
        to={"/create-recipes"}
        >
           Create Recipes
        </NavLink>
        <NavLink
         className={(e)=> e.isActive && 'text-red-700 flex justify-center gap-10px text-[1.2rem]'}
        to={"/create-recipes"}
        >
          favourite
        </NavLink>
    </div>
  )
}

export default Nav