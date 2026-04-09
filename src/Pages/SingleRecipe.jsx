import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { recepiecontext } from '../context/RecipesContext'
// have to update this in this 
function SingleRecipe() {
  const { data, setData } = useContext(recepiecontext)
    const params = useParams()
  const recipe = data.find((item) => item.id === params.id)


  const navigate  = useNavigate()
  const { register, handleSubmit, reset } = useForm({
    defaultValues:{
      title: recipe.title,
    }
  });

  function onclick(recipe) {
    let index = data.findIndex((item) => item.id === params.id)
    const copyData = [...data]
    copyData[index] = { ...copyData[index], ...recipe }
    toast.success(" recipe updated !")
    setData(copyData)


  }


  if (!recipe) return <h1>Recipe not found</h1>

let deleteHandler = () => {
    const filterData = data.filter((item)=> item.id != params.id)
    setData(filterData)
    toast.success("recipe deleted")
    navigate("/recipes")
}

  return (
    <div className="w-full p-4">
      <div className="left">
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
      <form
        className='w-1/2 p-2'
        onSubmit={handleSubmit(onclick)}>
        <input type="url"
          value={recipe.image}
          {...register("image")}
          className='block border-b p-2 outline-0 text-white bg-transparent outline-none'
        />
        <small className='text-red-700'> This is how the recepie will be shown</small>
        <input type="text"
       
          {...register("title")}
          placeholder='Title'
          className='block border-b p-2 outline-0 text-white bg-transparent outline-none'
        />
        <small className='text-red-700'> This is how the recepie will be shown</small>

        <textarea
          {...register("description")}
          value={recipe.description}
          className='block border-b p-2 outline-0 text-white bg-transparent outline-none'
          placeholder='Write some description about your recipe'
        ></textarea>
        <small className='text-red-700'> This is how the recepie will be shown</small>
        <textarea
          {...register("Ingridients")}
          value={recipe.Ingridients}
          className='block border-b p-2 outline-0 text-white bg-transparent outline-none'
          placeholder='Write some description about your recipe'
        ></textarea>
        <small className='text-red-700'> This is how the recepie will be shown</small>
        <textarea
          {...register("Instructions")}
          value={recipe.Instructions}
          className='block border-b p-2 outline-0 text-white bg-transparent outline-none'
          placeholder='Write some instructions about your recipe'
        ></textarea>
        <small className='text-red-700'> This is how the recepie will be shown</small>

        <select


          {...register("category")}
          value={recipe.category}
          className='block border-b p-2 outline-0 text-white bg-transparent outline-none'>
          <option value="cat-1">cat-1 </option>
          <option value="cat-2">cat-2</option>
          <option value="cat-3">cat-3</option>
        </select>
        <button  className='block'> Update </button>
        <button onClick={deleteHandler} className='block'> Delete </button>
      </form>
    </div>
  )
}

export default SingleRecipe