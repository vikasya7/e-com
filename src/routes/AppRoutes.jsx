import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import CategoryPage from '../pages/CategoryPage'
import ProductDetail from '../pages/ProductDetail'
import Layout from '../layout/Layout'

function AppRoutes() {
  return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path='/' element ={<Home/>}/>
            <Route path='/category/:name' element={<CategoryPage/>}/>
            <Route path='/product/:id' element={<ProductDetail/>} />
        </Route>
    </Routes>
  )
}

export default AppRoutes