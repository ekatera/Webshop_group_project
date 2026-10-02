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
  const [filters, setFilter] = useState<string[]>([]);
  const [categories, setCategory] = useState<string[]>([]);
  const addToCart = useUserStore((state: any) => state.updateOrder);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return response.json();
    },
  });

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Something went wrong when loading the products.</p>;
  }

  const filteredProducts = products?.filter((product) => {
    const matchesAnimal =
      filters.length === 0 ||
      filters.some((filter) => product.animal.includes(filter));

    const matchesCategory =
      categories.length === 0 ||
      categories.some((category) => product.categories.includes(category));

    return matchesAnimal && matchesCategory;
  });

  return (
    <main className="products-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <span className="home-hero__eyebrow">PET PAWS</span>

          <h1>
            Happy pets
            <span> start here.</span>
          </h1>

          <p>
            Everyday essentials for happier dogs and cats. Find everything your
            pet needs in one place.
          </p>

          <div className="home-hero__features">
            <span>🐾 Carefully selected</span>
            <span>♡ Made for pets</span>
            <span>✓ Everyday essentials</span>
          </div>
        </div>
      </section>

      <section className="shop-filters">
        <div className="shop-filters__heading">
          <span>FIND THEIR FAVOURITES</span>
          <h2>Shop for your pet</h2>
          <p>Choose a pet and one or more categories.</p>
        </div>

        <ProductFilter
          filters={filters}
          categories={categories}
          setFilter={setFilter}
          setCategory={setCategory}
        />
      </section>

      <div className="products-results">
        <div>
          <span className="products-results__eyebrow">SHOP</span>
          <h2>Our products</h2>
        </div>

        <p>
          {filteredProducts?.length ?? 0}{' '}
          {filteredProducts?.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      <div className="products-grid">
        {filteredProducts?.map((product: Product) => (
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
                  addToCart(product.id, product.saldo);
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