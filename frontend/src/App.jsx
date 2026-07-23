import { useState } from 'react'
import Login from "./pages/Auth/LoginPage.jsx"
import { Routes,Route } from 'react-router-dom'
import Register from "./pages/Auth/RegisterPage.jsx"
import RestaurantHomepage from "./pages/HomePage.jsx"
import UserSideBar from "./components/UserSideBar.jsx"
import AdminSideBar from "./components/AdminSideBar.jsx"
import ContactUs from "./pages/ContactUs";
import Gallery from "./pages/GalleryPage.jsx"
import Account from "./pages/Auth/UserPage.jsx"
import AddMenu from "./pages/Admin/AddMenu.jsx"
import AdminDashboard from "./pages/Admin/Dashboard.jsx"
import { useUserStore } from "./store/Auth/User.js";
import Cart from "./pages/CartPage.jsx"
import Product from "./pages/ProductPage.jsx"
import  AboutUs from "./pages/AboutPage.jsx"

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
     <Routes>
      <Route path="/" element={<RestaurantHomepage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/admindashboard" element={<AdminSideBar/>} />
      <Route path="/useraccount" element={<UserSideBar/>} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/cart" element={<Cart />} />
        <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/useraccount" element={<UserSideBar />}>
       <Route index element={<Account />} />
      </Route>

      <Route path="/admindashboard" element={<AdminSideBar />}>
         <Route index element={<AdminDashboard />} />
         <Route path="addmenu" element={<AddMenu />} />
      </Route>
  
     </Routes>
    </>
  )
}

export default App

