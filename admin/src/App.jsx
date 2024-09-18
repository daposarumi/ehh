// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Orders from './Pages/Orders/Orders'

const App = () => {

  const url = "http://localhost:4000"
  return (
    <div><Navbar/>
    <hr/>
    <div className='app-content'>
      <Sidebar/>
      <Routes>
        <Route path="/orders" element={<Orders url={url}/>}/>
      </Routes>
    </div>
    </div>
  )
}

export default App