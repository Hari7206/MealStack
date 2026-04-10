import React, { createContext, useEffect, useState } from 'react'


export const recepiecontext = createContext();
function RecipesContext({children}) {
    const [data, setData] = useState([])

    useEffect(() => {
      setData(JSON.parse(localStorage.getItem("recipes")) || [])
    }, [])
    
  return (
 <recepiecontext.Provider  value={{data , setData}}>
{children}
 </recepiecontext.Provider>
  )
}

export default RecipesContext