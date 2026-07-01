import { useState } from 'react'
import Login from "./pages/Auth/LoginPage.jsx"
import { Routes,Route } from 'react-router-dom'
import Register from "./pages/Auth/RegisterPage.jsx"
import RestaurantHomepage from "./pages/HomePage.jsx"
import UserSideBar from "./components/UserSideBar.jsx"
import AdminSideBar from "./components/AdminSideBar.jsx"


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
     </Routes>
    </>
  )
}

export default App

