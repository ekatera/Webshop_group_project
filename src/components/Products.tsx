import { useQuery } from '@tanstack/react-query';
import ProductFilter from './ProductFilter';

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    animal: string | string[];
    categories: string[];
    onSale: boolean;
    picture: string;
    saldo: number;
};

const Products = () => {

    const { data: products, isLoading, isError } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/products');

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            return response.json();
        }
    });

    if (isLoading) {
        return <p>Loading products...</p>;
    }
    if (isError) {
    return <p>Something went wrong when loading the products.</p>;
    }
    
    return (
        <main className="products-page">
            <h1>Products</h1>

            <ProductFilter products={products ?? []} />
        </main>
    );
};

export default Products;