import { Route, Routes } from "react-router-dom"
import LoginForm from "./pages/LoginForm"
import SystemLayout from "./layout/SystemLayout"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductsPage from "./pages/ProductsPage"
import SearchPage from "./pages/SearchPage"
import Account from "./pages/Account"
import Categories from "./pages/Categories"
import Journal from "./pages/Journal"
import About from "./pages/About"
import MainCartPage from "./pages/MainCartPage"
import Checkout from "./pages/Checkout"
import Addresses from "./pages/Addresses"
import Order from "./pages/Order"
import Wishlist from "./pages/Wishlist"

const App = () => (
  <>
    <Routes>
      {/* Authentication || Login form */}
      <Route path="/login" element={<LoginForm/>}/>

      {/* System Route */}
       <Route path="/" element={<SystemLayout/>}>
         <Route index element={<Home/>}/>
         <Route path="products" element={<Products/>}/>
         <Route path="product-details/:id" element={<ProductsPage/>}/>
         <Route path="cart" element={<MainCartPage/>}/>
         <Route path="checkout" element={<Checkout/>}/>
         <Route path="wishlist" element={<Wishlist/>}/>
         <Route path="search" element={<SearchPage/>}/>
         <Route path="order" element={<Order/>}/>
         <Route path="my-addresses" element={<Addresses/>}/>
         <Route path="my-account" element={<Account/>}/>
         <Route path="journal" element={<Journal/>}/>
         <Route path="about" element={<About/>}/>
         <Route path="categories" element={<Categories/>}/>
       </Route>
    </Routes>
  </>
)

export default App
