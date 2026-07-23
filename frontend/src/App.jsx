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
import Cart from "./pages/Order/CartPage.jsx"
import  AboutUs from "./pages/AboutPage.jsx"
import Checkout from "./pages/Order/Checkout.jsx"
import OrderSuccess from "./pages/Order/OrderSuccess.jsx"
import MyOrders from "./pages/Auth/MyOrders.jsx"
import AdminOrders from "./pages/Admin/AdminOrders.jsx"
import Reservation from "./pages/Reservation.jsx"
import MyReservations from "./pages/Auth/MyReservations.jsx"
import AdminReservations from "./pages/Admin/AdminReservation.jsx"

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
      <Route path="/checkout" element={< Checkout/>} />
      <Route path="/reservation" element={< Reservation/>} />
      <Route path="/order-success" element={< OrderSuccess/>} />
      <Route path="/useraccount" element={<UserSideBar />}>      
      <Route index element={<Account />} />
      </Route>

      <Route path="/useraccount" element={<UserSideBar />}>
        <Route index element={<Account />} />          
        <Route path="myorders" element={<MyOrders />} />  
        <Route path="myreservation" element={<MyReservations />} />  
      </Route>

      <Route path="/admindashboard" element={<AdminSideBar />}>
         <Route index element={<AdminDashboard />} />
         <Route path="addmenu" element={<AddMenu />} />
         <Route path="adminorders" element={<AdminOrders />} />  
         <Route path="adminReservation" element={<AdminReservations />} />  
      </Route>
  
     </Routes>
    </>
  )
}

export default App

