import { useLocation } from "react-router";
import useAuth from "./hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminNavbar from "./components/Admin/AdminNavbar";
import AdminTopNavbar from "./components/Admin/AdminTopNavbar";
import Loading from "./components/Loading"

const App = () => {
  const { loading } = useAuth();
  const isAdminPath = useLocation().pathname.includes("admin");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {!isAdminPath ? <Navbar /> : <AdminTopNavbar />}
      {isAdminPath ? (
        <div className="flex">
          <AdminNavbar /> <div className="pt-8 px-10"><AppRoutes /></div>
        </div>
      ) : (
        <AppRoutes />
      )}

      <ToastContainer />
      {!isAdminPath && <Footer />}
    </div>
  );
};

export default App;
