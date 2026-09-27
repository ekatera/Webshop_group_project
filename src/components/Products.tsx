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
    <main className="products-page">
        <h1>Products</h1>

        <div className="products-grid">
            {products?.map((product: any) => (
                <article className="product-card" key={product.id}>
                    <h2>{product.title}</h2>
                    <p className="product-card__price">{product.price} kr</p>
                </article>
            ))}
        </div>
    </main>
    );
};

export default Products;