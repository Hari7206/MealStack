import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { recepiecontext } from '../context/RecipesContext'

function SingleRecipe() {

    const {data} = useContext(recepiecontext)
    const params = useParams()
const recipe = data.find((item) => item.id === params.id)       

 return (
    <div className="p-4">
      <img
        src={recipe.image || "https://via.placeholder.com/150"}
        alt={recipe.title}
        className="w-60 h-40 object-cover"
      />

      <h1 className="text-2xl font-bold mt-2">
        {recipe.title}
      </h1>

      <p className="mt-2">
        {recipe.description}
      </p>

      <h3 className="mt-3 font-semibold">Ingredients:</h3>
      <p>{recipe.Ingridients}</p>

      <h3 className="mt-3 font-semibold">Instructions:</h3>
      <p>{recipe.Instructions}</p>
    </div>
  )
}

export default SingleRecipe