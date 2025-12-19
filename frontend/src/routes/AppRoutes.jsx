import { Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoutes";
import Register from "../pages/Register";
import VerifyPage from "../pages/VerifyPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import Products from "../pages/Products";
import SingleProductPage from "../pages/SingleProductPage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrderPage";
import AdminRoute from "./AdminRoutes";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminCategories from "../pages/Admin/AdminCategories";
import AddNewProduct from "../pages/Admin/AddNewProduct";
import AdminProduct from "../pages/Admin/AdminProduct";
import AdminOrder from "../pages/Admin/AdminOrder";
import NotFound from "../pages/NotFound";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import ReturnPolicy from "../pages/ReturnPolicy";
import DeliveryInformation from "../pages/DeliveryInformation";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/verify/:token"
        element={
          <PublicRoute>
            <VerifyPage />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        }
      />
      <Route
        path="/reset/:token"
        element={
          <PublicRoute>
            <ResetPasswordPage />
          </PublicRoute>
        }
      />
      <Route path="/products" element={<Products />} />
      <Route path="/products/product/:id" element={<SingleProductPage />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <AdminCategories />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products/add-new"
        element={
          <AdminRoute>
            <AddNewProduct />
          </AdminRoute>
        }
      />
      <Route
        path="admin/products/"
        element={
          <AdminRoute>
            <AdminProduct />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/orders/"
        element={
          <AdminRoute>
            <AdminOrder />
          </AdminRoute>
        }
      />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/return-policy" element={<ReturnPolicy />} />
      <Route path="/delivery-info" element={<DeliveryInformation />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppRoutes;
