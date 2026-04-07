import React from 'react'
import Mainroutes from './routes/Mainroutes'
import Nav from './components/Nav'

function App() {
  return (
    <div className='h-screen w-screen px-10 py-10 bg-gray-800 text-white'>
      <Mainroutes/>
      <Nav/>
    </div>
  )
}

export default App