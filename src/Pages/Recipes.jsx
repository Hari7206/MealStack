import React, { useContext } from 'react'
import { recepiecontext } from '../context/RecipesContext'

function Recipes() {
  const { data } = useContext(recepiecontext)

  const renderRecipie = () => {
    return data.map(item => (
      <div key={item.id}>
        <h1>{item.title}</h1>
      </div>
    ))
  }

  return (
    <div>
      {renderRecipie()}
    </div>
  )
}

export default Recipes