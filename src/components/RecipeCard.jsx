import React from 'react'
import { Link } from 'react-router-dom'

function RecipeCard({ recipe }) {
  

  return (
    <Link to={`/recipes/details/${recipe.id}`}>
      <div className="border p-4 rounded-lg shadow-md w-60">
        
        <img 
          src={recipe.image || "https://via.placeholder.com/150"} 
          alt={recipe.title} 
          className="w-full h-32 object-cover rounded"
        />

        <h2 className="text-lg font-bold mt-2">
          {recipe.title || "No Title"}
        </h2>

        <p className="text-sm text-gray-600">
          {recipe.description || "No description"}
        </p>

      </div>
    </Link>
  )
}

export default RecipeCard