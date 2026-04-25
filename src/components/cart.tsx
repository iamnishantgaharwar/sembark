
import { useCart } from "@/context/cart-context";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

const Cart = () => {
    const { items, removeItem, totalItems, totalPrice } = useCart();
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-gray-500 mb-4">Your cart is empty.</p>
                <Button
                    onClick={() => navigate("/")}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    Continue Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h1 className="text-2xl font-bold mb-6">Cart ({totalItems} items)</h1>
            <div className="flex flex-col gap-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 border rounded-lg p-4">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <Button
                            onClick={() => removeItem(item.id)}
                            variant="outline"
                            className="text-red-500 hover:text-red-700 text-sm cursor-pointer transition-colors"
                        >
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default Cart;