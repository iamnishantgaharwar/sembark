import { useParams, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useCart } from "../../context/cart-context";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import Error from "@/components/error";

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addItem, items, decreaseQuantity } = useCart();
    const [added, setAdded] = useState(false);

    const data = useFetch({
        url: `${import.meta.env.VITE_BASE_URL}/products/slug/${slug}`,
        key: `product-${slug}`
    });

    const { isLoading, isError } = data;
    const product = data.data;

    if (isLoading) return <Loader item="product details" />;
    if (isError) return <Error />;

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images?.[0] ?? "",
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const getItems = items.find(idx => idx.id === data.data.id)

    console.log(getItems)
    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="mb-6 text-sm text-gray-500 hover:text-black transition-colors cursor-pointer inline-flex items-center"
            >
                <ArrowLeft size={20} className="inline-block mr-2" />
                Back
            </Button>

            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full md:w-1/2 h-80 object-cover rounded-lg"
                />
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                    <p className="text-xl font-semibold">${product.price}</p>
                    <p>Quantity: {getItems?.quantity || 0}</p>
                    <Button variant={'outline'} onClick={handleAddToCart}>+</Button>
                    <Button variant={'outline'} onClick={() => decreaseQuantity(getItems!.id)}>-</Button>
                    {/* <Button
                        onClick={handleAddToCart}
                        className={`mt-auto py-3 px-6 rounded transition-all cursor-pointer ${
                            added
                                ? "bg-green-500 text-white"
                                : "bg-black text-white hover:bg-white hover:text-black border border-black"
                        }`}
                    >
                        {added ? "Added" : "Add to Cart"}
                    </Button> */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;