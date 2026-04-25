import { Link } from "react-router";
import { useCart } from "../context/cart-context";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="p-4 border-b border-gray-300 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:opacity-70 transition-opacity">
          Sembark E-Commerce
        </Link>
        <Link to="/cart" className="relative text-sm font-medium hover:opacity-70 transition-opacity flex items-center">
          <ShoppingCart size={20} className="inline-block mr-2" />
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;