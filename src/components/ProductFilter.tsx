import { useState } from 'react';

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

type ProductFilterProps = {
    products: Product[];
};

const ProductFilter = ({ products }: ProductFilterProps) => {
    const [selectedAnimal, setSelectedAnimal] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleAnimalChange = (animal: string) => {
        setSelectedAnimal(animal);
        setSelectedCategory('all');
    };

    const filteredProducts = products.filter((product) => {
        const animalMatch =
            selectedAnimal === 'all' ||
            product.animal === selectedAnimal;

        const categoryMatch =
            selectedCategory === 'all' ||
            product.categories.includes(selectedCategory);

        return animalMatch && categoryMatch;
    });

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
                   🐶  Puppies
                </button>

                <button onClick={() => handleAnimalChange('fish')}>
                    🐱 Kittens
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

                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <article
                            className="product-card"
                            key={product.id}
                        >
                            <img
                                src={product.picture}
                                alt={product.title}
                                className="product-card__image"
                            />

                            <h3>{product.title}</h3>

                            <p>{product.description}</p>

                            <p className="product-card__price">
                                {product.price} kr
                            </p>

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

export default ProductFilter;