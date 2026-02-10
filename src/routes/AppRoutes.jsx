import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import CategoryPage from '../pages/CategoryPage'
import ProductDetail from '../pages/ProductDetail'
import Layout from '../layout/Layout'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import Admin from '../pages/Admin'
import AdminLayout from '../layout/AdminLayout'


function AppRoutes() {
  return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path='/' element ={<Home/>}/>
            <Route path='/category/:name' element={<CategoryPage/>}/>
            <Route path='/product/:id' element={<ProductDetail/>} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<Login/>}/>
            {/* <Route path='/admin' element={<Admin/>}/> */}
        </Route>

         <Route path="/admin" element={<AdminLayout />}>
             <Route path="products" element={<Admin />} />
             <Route path="categories" element={<CategoryPage />} />
         </Route>
    </Routes>
  )
}

export default AppRoutes