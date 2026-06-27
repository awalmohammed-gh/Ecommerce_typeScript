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
import AdminLogin from "./Admin/pages/AdminLogin"
import ProtectedAdminRoute from "./Admin/routes/ProtectedAdminRoute"
import AdminLayout from "./Admin/layout/AdminLayout"
import Dashboard from "./Admin/pages/Dashboard"
import AddProduct from "./Admin/pages/AddProduct"
import ListProduct from "./Admin/pages/ListProduct"
import Orders from "./Admin/pages/Orders"
import UsersList from "./Admin/pages/UsersList"

const App = () => (
  <>
    <Routes>
      {/* Authentication || Login form */}
      <Route path="/login" element={<LoginForm />} />

      {/* Admin login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* System Route */}
      <Route path="/" element={<SystemLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product-details/:id" element={<ProductsPage />} />
        <Route path="cart" element={<MainCartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="order" element={<Order />} />
        <Route path="my-addresses" element={<Addresses />} />
        <Route path="my-account" element={<Account />} />
        <Route path="journal" element={<Journal />} />
        <Route path="about" element={<About />} />
        <Route path="categories" element={<Categories />} />
      </Route>

      {/* Admin route */}
      <Route path="/admin" element={<ProtectedAdminRoute>
        <AdminLayout/>
      </ProtectedAdminRoute>}>
       <Route index element={<Dashboard/>}/>
       <Route path="add-product" element={<AddProduct/>}/>
       <Route path="list-product" element={<ListProduct/>}/>
       <Route path="orders" element={<Orders/>}/>
       <Route path="users-list" element={<UsersList/>}/>
      </Route>
    </Routes>
  </>
);

export default App
