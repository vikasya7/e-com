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
import AdminDashboard from '../pages/AdminDashboard'
import Checkout from '../pages/Checkout'
import Profile from '../pages/Profile'
import MyOrders from '../pages/MyOrders'
import OrderDetails from '../pages/OrderDetails'
import AdminCoupons from '../pages/AdminCoupons'
import Contact from '../pages/Contact'


function AppRoutes() {
  return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path='/' element ={<Home/>}/>
            <Route path='/category/:name' element={<CategoryPage/>}/>
            <Route path='/product/:id' element={<ProductDetail/>} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/my-orders' element={<MyOrders/>}/>
            <Route path='/my-orders/:id' element={<OrderDetails/>}/>
            <Route path='/contact' element={<Contact/>}/>
            {/* <Route path='/admin' element={<Admin/>}/> */}
        </Route>

         <Route path="/admin" element={<AdminLayout />}>
             <Route index element={<AdminDashboard />} /> 
             <Route path="products" element={<Admin />} />
             <Route path="categories" element={<CategoryPage />} />
             <Route path='coupons' element={<AdminCoupons/>}/>
         </Route>
    </Routes>
  )
}

export default AppRoutes