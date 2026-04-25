import { Link } from "react-router";
import { Button } from "./ui/button";

interface IProductCardProps {
  name: string;
  price: number;
  thumbnail: string;
  slug: string;
}

const ProductCard= ({ name, price, thumbnail, slug }: IProductCardProps) => {

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-sm h-full mx-auto border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg flex flex-col">
      <img
        src={thumbnail}
        alt={name}
        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h2 className="text-base sm:text-lg font-semibold mt-3">{name}</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          ${price.toFixed(2)}
        </p>
      </div>
      <Link to={`/product/${slug}`}>
      <Button variant="outline" className="mt-2 w-full cursor-pointer">
        View
      </Button>
      </Link>
    </div>
  )
}

export default ProductCard