import { useQuery } from '@tanstack/react-query';
import ProductFilter from './ProductFilter';
import { ShoppingCart } from 'lucide-react';
import { useUserStore } from './Store';
import { useState } from 'react';
import { Link } from 'react-router-dom';


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

    const [filters, setFilter] = useState<string []>([]);
    const [categories, setCategory] = useState<string[]>([]);
    const addToCart = useUserStore( (state: any) => state.updateOrder );

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
    const filteredProducts = filters.length > 0
        ? products?.filter((product) =>
            filters.some(filter => product.animal.includes(filter)) && 
            (categories.length > 0 ? categories.some((category) => product.categories.includes(category)) : true)
        )
        : products;
    return (
  <main className="products-page">
    <h1>Products</h1>

    <ProductFilter
      filters={filters}
      categories={categories}
      setFilter={setFilter}
      setCategory={setCategory}
    />

    <div className="products-grid">
      {filteredProducts?.map((product: any) => (
        <article className="product-card" key={product.id}>
          <Link
            to={`/products/detail/${product.id}`}
            className="product-card__link"
          >
            <img
              src={product.picture}
              alt={product.title}
              className="product-card__image"
            />
            <h2>{product.title}</h2>
          </Link>

          <p className="product-card__price">
            {product.price} kr
            <ShoppingCart
              className="shopping-cart"
              onClick={() => {
                console.log('Add to cart', product.id);
                addToCart(product.id, 1);
              }}
            />
          </p>
        </article>
      ))}
    </div>
  </main>
);
};

export default Products;