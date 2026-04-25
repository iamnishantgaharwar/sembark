import ProductCard from "../../components/product-card"
import Loader from "../../components/loader"
import usefetch from "../../hooks/useFetch"
import { useSearchParams } from "react-router"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import Error from "@/components/error"

const ProductList = () => {
    const limit = 9;
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get("page") || "0");
    const selectedCategory = searchParams.get("category") || "";

    const offset = page * limit;

    const productsUrl = `${import.meta.env.VITE_BASE_URL}/products?offset=${offset}&limit=${limit}${selectedCategory ? `&categoryId=${selectedCategory}` : ''}`;
    const data = usefetch({ url: productsUrl, key: ['products', selectedCategory, page].join('-') })
    const { isLoading, isError } = data;

    const categoryData = usefetch({ url: `${import.meta.env.VITE_BASE_URL}/categories`, key: 'categories' })

    const handleCategoryChange = (value: string) => {
        setSearchParams(prev => {
            prev.set("category", value);
            prev.set("page", "0"); // reset page on category change
            return prev;
        });
    }

    const handleNext = () => {
        setSearchParams(prev => {
            prev.set("page", String(page + 1));
            return prev;
        });
    }

    const handlePrev = () => {
        setSearchParams(prev => {
            prev.set("page", String(page - 1));
            return prev;
        });
    }

    if (isLoading) {
        return <Loader item="products" />
    }

    if (isError) {
        return <Error />
    }

    return (
        <section className="container mx-auto">
            <div className="max-w-sm overflow-hidden flex ">
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full border border-gray-300 rounded p-2 mb-4">
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        {categoryData.data?.map((category: any) => (
                            <SelectItem key={category.id} value={String(category.id)}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button variant="outline" className="ml-2 cursor-pointer" onClick={() => {
                setSearchParams(prev => {
                    prev.delete("category");
                    prev.set("page", "0");
                    return prev;
                });
            }}>
                Reset Filters
            </Button>
            </div>
            
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 place-items-center gap-4">
                {data.data?.length === 0 && <div>No products found.</div>}
                {data.data?.map((product: any) => (
                    <ProductCard
                        key={product.id}
                        name={product.title}
                        price={product.price}
                        slug={product.slug}
                        thumbnail={product.images[0]}
                    />
                ))}
                <div className="col-span-full">
                    <Button
                        className="w-full bg-black text-white py-2 rounded hover:bg-white hover:text-black hover:border hover:border-black transition-colors mt-4 cursor-pointer"
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                    <Button
                        className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition-colors mt-2 cursor-pointer"
                        onClick={handlePrev}
                        disabled={page === 0}
                    >
                        Previous
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default ProductList