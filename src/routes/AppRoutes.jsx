import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import CategoryPage from '../pages/CategoryPage'

function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/category/:name' element={<CategoryPage/>}/>
    </Routes>
  )
}

export default AppRoutes