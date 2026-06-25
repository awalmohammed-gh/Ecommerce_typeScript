import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import {Toaster} from "react-hot-toast"
import CartSidebar from "../pages/CartSidebar"

const SystemLayout = () => {
  return (
    <div>
      <Toaster/>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
      <CartSidebar/>
    </div>
  )
}

export default SystemLayout
