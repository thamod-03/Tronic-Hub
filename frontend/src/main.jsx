import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { AppProvider } from "./context/appContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";
import { CategoryProvider } from "./context/categoryContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { OrderProvider } from "./context/orderContext.jsx";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <ProductProvider>
        <CategoryProvider>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                  <App />
                </MantineProvider>
              </OrderProvider>
            </CartProvider>
          </AuthProvider>
        </CategoryProvider>
      </ProductProvider>
    </AppProvider>
  </BrowserRouter>
);
