import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/others/Footer';
import Navbar from './components/others/Navbar';
import Cart from './components/pages/cart/Cart';
import Home from './components/pages/home/Home';
import ProductDetail from './components/pages/product-detail/ProductDetail';
import Products from './components/pages/products/Products';
import Login from "./components/auth/login/Login"
import Register from "./components/auth/register/Register"
import AdminCategories from './components/admin/categories/AdminCategories';
import AdminProducts from './components/admin/products/AdminProducts';
import AddProduct from './components/admin/products/AddProduct';
import AddCategory from './components/admin/categories/AddCategory';
import Blog from './components/pages/blog/Blog';
import Contact from './components/pages/contact/Contact';
import CategoryState from './state/CategoryState';
import UserState from './state/UserState';
import EditCategory from './components/admin/categories/EditCategory';
import Toastify from './components/others/Toastify';
import ProductState from './state/ProductState';
import EditProduct from './components/admin/products/EditProduct';
import NotFound from './components/pages/not-found/NotFound';
import CartState from './state/CartState';

function App() {
  return (
    <CartState>
      <UserState>
        <ProductState>
          <CategoryState>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/products" element={ <Products /> } />
                <Route path="/urun-detay" element={ <ProductDetail /> } />
                <Route path="/blog" element={ <Blog /> } />
                <Route path="/iletisim" element={ <Contact /> } />
                <Route path="/sepet" element={ <Cart /> } />
                <Route path="/giris-yap" element={ <Login /> } />
                <Route path="/kayit-ol" element={ <Register /> } />
                <Route path="/admin/urunler" element={ <AdminProducts /> } />
                <Route path="/admin/urunler/urun-ekle" element={ <AddProduct /> } />
                <Route path="/admin/urunler/urun-duzenle/:productId" element={ <EditProduct /> } />
                <Route path="/admin/kategoriler" element={ <AdminCategories /> } />
                <Route path="/admin/kategoriler/kategori-ekle" element={ <AddCategory /> } />
                <Route path="/admin/kategoriler/kategori-duzenle/:categoryId" element={ <EditCategory /> } />
                <Route path="/admin/kullanıcılar" element={ <Register /> } />
                <Route path="*" element={ <NotFound /> } />
              </Routes>
              <Footer />
              <Toastify />
            </BrowserRouter>
          </CategoryState>
        </ProductState>
      </UserState>
    </CartState>
  );
}

export default App;
