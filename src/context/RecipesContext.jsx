import React, { createContext, useState } from 'react'


export const recepiecontext = createContext();
function RecipesContext({children}) {
    const [data, setData] = useState([])

  return (
 <recepiecontext.Provider  value={{data , setData}}>
{children}
 </recepiecontext.Provider>
  )
}

export default RecipesContext