import { nanoid } from 'nanoid';
import  { useContext } from 'react'
import { useForm  } from 'react-hook-form'
import { recepiecontext } from '../context/RecipesContext';

function Create() {
    const { register, handleSubmit , reset } = useForm();
   const {data , setData} = useContext(recepiecontext)

    function onclick(recepie) {
        recepie.id = nanoid()

        setData([...data , recepie])
        reset()

        console.log(recepie);

    }


    return (
        <form
            onSubmit={handleSubmit(onclick)}>
            <input type="url"
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
              className='block border-b p-2 outline-0 text-white bg-transparent outline-none'
               placeholder='Write some description about your recipe'
            ></textarea>
              <small className='text-red-700'> This is how the recepie will be shown</small>
            <textarea 
             {...register("Ingridients")}
              className='block border-b p-2 outline-0 text-white bg-transparent outline-none'
               placeholder='Write some description about your recipe'
            ></textarea>
              <small className='text-red-700'> This is how the recepie will be shown</small>
            <textarea 
             {...register("Instructions")}
              className='block border-b p-2 outline-0 text-white bg-transparent outline-none'
               placeholder='Write some instructions about your recipe'
            ></textarea>
              <small className='text-red-700'> This is how the recepie will be shown</small>
                 
                    <select 
                 
                 
                     {...register("category")}
                      className='block border-b p-2 outline-0 text-white bg-transparent outline-none'>
                        <option value="cat-1">cat-1 </option>
                        <option value="cat-2">cat-2</option>
                        <option value="cat-3">cat-3</option>
                    </select>
            <button type='submit' className='block'> Submit </button>
        </form>
    )
}

export default Create