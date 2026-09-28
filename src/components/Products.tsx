import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    animal: string;
    categories: string[];
    onSale: boolean;
    picture: string;
    saldo: number;
};

const Products = () => {
    const [selectedAnimal, setSelectedAnimal] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');

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

    const filteredProducts = products?.filter((product) => {
        const animalMatch =
            selectedAnimal === 'all' || product.animal === selectedAnimal;

        const categoryMatch =
            selectedCategory === 'all' ||
            product.categories.includes(selectedCategory);

        return animalMatch && categoryMatch;
    });

    const handleAnimalChange = (animal: string) => {
        setSelectedAnimal(animal);
        setSelectedCategory('all');
    };

    return (
        <main>
            <h1>Welcome to Petpaws 🐾</h1>

            <p>Everything your pet needs in one place.</p>

            <section>
                <h2>Choose your pet</h2>

                <button onClick={() => handleAnimalChange('all')}>
                    All pets
                </button>

                <button onClick={() => handleAnimalChange('dog')}>
                    🐶 Dogs
                </button>

                <button onClick={() => handleAnimalChange('cat')}>
                    🐱 Cats
                </button>

                <button onClick={() => handleAnimalChange('bird')}>
                    🐦 Birds
                </button>

                <button onClick={() => handleAnimalChange('fish')}>
                    🐠 Fish
                </button>

                <button onClick={() => handleAnimalChange('rodent')}>
                    🐹 Rodents
                </button>
            </section>

            {selectedAnimal !== 'all' && (
                <section>
                    <h2>Categories</h2>

                    <button onClick={() => setSelectedCategory('all')}>
                        All
                    </button>

                    <button onClick={() => setSelectedCategory('food')}>
                        Food
                    </button>

                    <button onClick={() => setSelectedCategory('accessories')}>
                        Accessories
                    </button>

                    <button onClick={() => setSelectedCategory('bedding')}>
                        Bedding
                    </button>

                    <button onClick={() => setSelectedCategory('toys')}>
                        Toys
                    </button>

                    <button onClick={() => setSelectedCategory('health')}>
                        Health
                    </button>
                </section>
            )}

            <section>
                <h2>Products</h2>

                <div>
                    {filteredProducts?.map((product) => (
                        <article key={product.id}>
                            <img
                                src={product.picture}
                                alt={product.title}
                            />

                            <h3>{product.title}</h3>

                            <p>{product.description}</p>

                            <p>{product.price} kr</p>

                            {product.onSale && (
                                <strong>SALE</strong>
                            )}

                            {product.saldo === 0 && (
                                <p>Out of stock</p>
                            )}

                            <button disabled={product.saldo === 0}>
                                Add to cart
                            </button>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Products;