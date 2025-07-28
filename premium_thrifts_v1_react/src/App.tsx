import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import ErrorBoundary from "./errorboundary.jsx";
import {flashSaleProducts} from './container/product/products'

// Client Pages
import Index from "./pages/Index.js";
import LayoutClient from "./pages/Layout";
import Register from "./container/Auth/register.tsx";
import AllProducts from "./pages/AllProducts.tsx";
import ClientWishlist from './container/wishList.tsx'
import ProductView from './container/product/Actions/Productview.jsx'; // Consistent naming
import SignIn from './container/Auth/signin.tsx';
import ProductList from './container/product/ProdList';
import Not_Found from './pages/notFound';
import Cart from './container/product/cartView.tsx';
import { CartProvider } from './container/product/CartContexts.tsx';
import {WishlistProvider} from './container/product/wishListContext.jsx'
import Checkout from './container/product/Actions/Checkout.js';
import HelpCenterPage from './container/Helpcenter'
import OrdersClient from './container/Orders.tsx'
import Profile from "./pages/profile/profile";
import ProfileInbox from "./pages/profile/inbox";
import ProfileVouchers from "./pages/profile/vouchers";
import ProdViewHome from './container/product/Actions/prodViewHome'
import ProfileNewsletterPreferences from "./pages/profile/newsletter.tsx";
import CategoryProductsView from "./pages/Categoryview.tsx";
import OAuthSuccess from './container/Auth/OathSuccess'

// Admin Pages
import Dashboard from "./admin/Dashboard.tsx";
import ForgotPassword from './admin/Pages/forgot-passowrd';
import Layout from './admin/Layout.js';
import Productlist from "./admin/Pages/Products/productsLists.tsx";
import Addproduct from "./admin/Pages/Products/Addproduct.tsx";
import NotFound from './admin/Notfound';
import Users from './admin/Pages/customers/users.tsx';
import AddUsers from './admin/Pages/customers/addUser.js';
import AdminList from './admin/Pages/customers/admins.tsx';
import Inventory from './admin/Pages/Products/Inventory.tsx';
import ProfileView from './admin/Pages/profile/profileView.tsx';
import Revenue from './admin/Pages/Revenue/Revenue';
import CustomerAnalysis from './admin/Pages/customers/customerAnalysis.tsx';
import Notifications from "./admin/Pages/Notification/notification.tsx";
import Message from "./admin/Pages/Messages/messages.tsx";
import Orders from "./admin/Pages/Orders/OrdersMap.tsx";
import Loader from "./lib/Loader"; 
import Announcements from "./admin/Pages/Announcement/announcement.tsx";
import Sales from './admin/Pages/sales.tsx';
import Performance from './admin/Pages/performance.tsx';
import Permissions from './admin/Pages/Permissions.tsx';
import Category from './admin/Pages/Category/category.tsx';
import Settings from './admin/Pages/settings/settings.tsx';
import PaymentMethods from './admin/Pages/settings/payment.tsx';
import PrivacyPolicy from './admin/Pages/PrivacyPolicy/PrivacyPolicy.tsx';
import HelpCenter from './admin/Pages/help.tsx';
import BannedUsers from './admin/Pages/customers/banned-users.tsx';
import OrderDetails from "./admin/Pages/Orders/OrderDetails.tsx";
import AdminLogin from './admin/Pages/login.tsx'
// import Profile from "./pages/profile.tsx";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Sonner />
        <WishlistProvider> 
          <CartProvider> 
          <BrowserRouter>
            <Routes>
              <Route element={<LayoutClient/>}>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/oauth-success" element={<OAuthSuccess/>}/>
                <Route path= "/forgot-password" element={<ForgotPassword/>}/>

                <Route path="/wishlist" element={<ClientWishlist />} />
                <Route path="/products/:category" element={<AllProducts />} />
                <Route path="/category/:slug" element={<CategoryProductsView />} />
                <Route path="/product/:slug" element={<ProductView product={flashSaleProducts} />} />
                <Route path="/products" element={<ProductList />} />
                <Route path='/cart' element={<Cart/>}/>
                <Route path="/Checkout" element={<Checkout/>}/>
                <Route path="/help-center" element={<HelpCenterPage />} />
                <Route path='/orders' element={<OrdersClient/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/inbox" element={<ProfileInbox />} />
                <Route path="/profile/wishlist" element={<ClientWishlist />} />
                <Route path="/profile/vouchers" element={<ProfileVouchers />} />
                <Route path="/pro/:slug" element={<ProdViewHome/>}/>
                <Route path="/profile/newsletter-preferences" element={<ProfileNewsletterPreferences />} />
                <Route path="*" element={<Not_Found />} />
              </Route>    

              {/* Admin Routes */}
              <Route path='/admin/login' element={<AdminLogin />} />  
              <Route path="/admin/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/admin/Dashboard" element={<Navigate to="/admin" />} />
                <Route path='/admin/product-list' element={<Productlist />} />
                <Route path='/admin/add-product' element={<Addproduct />} />
                <Route path='/admin/inventory' element={<Inventory />} />
                <Route path='/admin/revenue' element={<Revenue />} />
                <Route path='/admin/customer' element={<CustomerAnalysis />} />
                <Route path='/admin/Orders' element={<Orders />} />
                <Route path='Orders/:id' element={<OrderDetails orderId={""} status={{
                  paid: false,
                  fulfilled: false,
                  date: ""
                }} products={[]} customer={{
                  name: "",
                  email: "",
                  phone: "",
                  orders: 0,
                  avatar: ""
                }} shipping={{
                  address: {
                    street: "",
                    city: "",
                    country: "",
                    postalCode: ""
                  },
                  activity: []
                }} payment={{
                  subtotal: 0,
                  shipping: 0,
                  tax: 0,
                  total: 0,
                  method: {
                    type: "",
                    cardNumber: ""
                  }
                }} />} />
                <Route path="/admin/notifications" element={<Notifications />} />
                <Route path="/admin/sales" element={<Sales />} />
                <Route path="/admin/performance" element={<Performance />} />
                <Route path="/admin/category" element={<Category />} />
                <Route path="/admin/messages" element={<Message />} />
                <Route path='/admin/all-users' element={<Users />} />
                <Route path='/admin/add-users' element={<AddUsers />} />
                <Route path='/admin/admin-list' element={<AdminList />} />
                <Route path='/admin/banned-users' element={<BannedUsers />} />
                <Route path='/admin/roles' element={<Permissions />} />
                <Route path='/admin/profile' element={<ProfileView />} />
                <Route path='/admin/announcement' element={<Announcements />} />
                <Route path='/admin/load' element={<Loader />} />
                <Route path='/admin/settings' element={<Settings />} />
                <Route path="/admin/settings/:section" element={<Settings />} />
                <Route path='/admin/payment' element={<PaymentMethods />} />
                <Route path='/admin/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/admin/help' element={<HelpCenter />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;