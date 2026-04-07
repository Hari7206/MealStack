import React, { useContext } from 'react'
import { recepiecontext } from '../context/RecipesContext'
import RecipeCard from '../components/RecipeCard'

function Recipes() {
  const { data } = useContext(recepiecontext)

const renderRecipie = data.map((recipe) => (
  <RecipeCard key={recipe.id} recipe={recipe} />
))
   
  return (
    <div>
      {renderRecipie}
    </div>
  )

  }



export default Recipes