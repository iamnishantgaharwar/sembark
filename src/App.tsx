import { Routes, Route } from "react-router";
import ProductList from "./pages/HomePage/product-list";
import ProductDetail from "./pages/Product/product-detail";
import Cart from "./components/cart";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/navbar";
import { CartProvider } from "./context/cart-context";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CartProvider>
                <Navbar />
                <div className="pb-16">
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/product/:slug" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
                <ReactQueryDevtools initialIsOpen={false} />
            </CartProvider>
        </QueryClientProvider>
    );
}

export default App;