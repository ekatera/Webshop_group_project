import { useQuery } from '@tanstack/react-query';

const Products = () => {
    const { data: products, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            return data;
        }
    });

    if (error) {
        return <p>Something went wrong...</p>;
    }

    return (
        <div>
            <h1>Products</h1>

            {products?.map((product: any) => (
                <div key={product.id}>
                    <h2>{product.title}</h2>
                    <p>{product.price} kr</p>
                </div>
            ))}
        </div>
    );
};

export default Products;