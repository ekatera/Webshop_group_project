type ProductFilterProps = {
    filters: string[];
    setFilter: (filters: string[]) => void;
    categories: string[];
    setCategory: (category: string[]) => void;
};

const ProductFilter = ({ filters, setFilter, categories, setCategory }: ProductFilterProps) =>  {
    return (
        <main>
            <h1>Welcome to Petpaws 🐾</h1>

            <p>Everything your pet needs in one place.</p>

            <section className="product-filter">
                <h2>Choose your pet</h2>

                <button className={filters.length === 0 ? 'active' : ''} onClick={() => { setFilter([]); }}>
                    All pets
                </button>

                <button className={filters.includes('dog') ? 'active' : ''} onClick={() => setFilter(['dog'])}>
                    🐶 Dogs
                </button>

                <button className={filters.includes('cat') ? 'active' : ''} onClick={() => setFilter(['cat'])}>
                    🐱 Cats
                </button>

            </section>
                
                {  filters.length > 0 && (
               
                <section className="product-filter product-filter--categories">
                    <h2>Categories</h2>

                    <button className={categories.length === 0 ? 'active' : ''} onClick={() => setCategory([])}>
                        All
                    </button>

                    <button className={categories.includes('food') ? 'active' : ''} onClick={() => setCategory(['food'])}>
                        Food
                    </button>

                    <button className={categories.includes('accessories') ? 'active' : ''} onClick={() => setCategory(['accessories'])}>
                        Accessories
                    </button>

                    <button className={categories.includes('bedding') ? 'active' : ''} onClick={() => setCategory(['bedding'])}>
                        Bedding
                    </button>

                    <button className={categories.includes('toys') ? 'active' : ''} onClick={() => setCategory(['toys'])}>
                        Toys
                    </button>

                    <button className = {categories.includes('health') ? 'active' : ''} onClick={() => setCategory(['health'])}>
                        Health
                    </button>
                </section>)}
            
        </main>
    );
};

export default ProductFilter;