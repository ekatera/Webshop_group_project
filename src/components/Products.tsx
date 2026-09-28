import { useQuery } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';
import { useUserStore } from './Store';
const Products = () => {
    const { data: products, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            return data;
        }
    });

    const addToCart = useUserStore( (state: any) => state.updateOrder );

    if (error) {
        return <p>Something went wrong...</p>;
    }

    return (
        <main className="products-page">
            <h1>Products</h1>

            <div className="products-grid">
                {products?.map((product: any) => (
                    <article className="product-card" key={product.id}>
                        <img
                            src={product.picture}
                            alt={product.title}
                            className="product-card__image"
                        />
                        <h2>{product.title}</h2>
                        <p className="product-card__price">{product.price} kr 
                            <ShoppingCart className="shopping-cart"
                            onClick={() => 
                            { 
                                console.log('Add to cart', product.id);
                                addToCart(product.id, 1);
                            }} />
                        </p>
                    </article>
                ))}
            </div>
        </main>
    );
};

export default Products;