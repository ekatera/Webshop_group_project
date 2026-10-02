type ProductFilterProps = {
  filters: string[];
  setFilter: (filters: string[]) => void;
  categories: string[];
  setCategory: (category: string[]) => void;
};

const ProductFilter = ({
  filters,
  setFilter,
  categories,
  setCategory,
}: ProductFilterProps) => {
  return (
    <div className="product-filters">
      <section className="product-filter product-filter--pets">
        <h2>Pet</h2>

        <button
          className={filters.length === 0 ? 'active' : ''}
          onClick={() => setFilter([])}
        >
          All pets
        </button>

        <button
          className={filters.includes('dog') ? 'active' : ''}
          onClick={() => setFilter(['dog'])}
        >
          🐶 Dogs
        </button>

        <button
          className={filters.includes('cat') ? 'active' : ''}
          onClick={() => setFilter(['cat'])}
        >
          🐱 Cats
        </button>
      </section>

      <section className="product-filter product-filter--categories">
        <h2>Categories</h2>

        <button
          className={categories.length === 0 ? 'active' : ''}
          onClick={() => setCategory([])}
        >
          All
        </button>

        <button
          className={categories.includes('food') ? 'active' : ''}
          onClick={() => {
            if (categories.includes('food')) {
              setCategory(
                categories.filter((category) => category !== 'food')
              );
            } else {
              setCategory([...categories, 'food']);
            }
          }}
        >
          Food
        </button>

        <button
          className={categories.includes('accessories') ? 'active' : ''}
          onClick={() => {
            if (categories.includes('accessories')) {
              setCategory(
                categories.filter((category) => category !== 'accessories')
              );
            } else {
              setCategory([...categories, 'accessories']);
            }
          }}
        >
          Accessories
        </button>

        <button
          className={categories.includes('bedding') ? 'active' : ''}
          onClick={() => {
            if (categories.includes('bedding')) {
              setCategory(
                categories.filter((category) => category !== 'bedding')
              );
            } else {
              setCategory([...categories, 'bedding']);
            }
          }}
        >
          Bedding
        </button>

        <button
          className={categories.includes('toys') ? 'active' : ''}
          onClick={() => {
            if (categories.includes('toys')) {
              setCategory(
                categories.filter((category) => category !== 'toys')
              );
            } else {
              setCategory([...categories, 'toys']);
            }
          }}
        >
          Toys
        </button>

        <button
          className={categories.includes('health') ? 'active' : ''}
          onClick={() => {
            if (categories.includes('health')) {
              setCategory(
                categories.filter((category) => category !== 'health')
              );
            } else {
              setCategory([...categories, 'health']);
            }
          }}
        >
          Health
        </button>
      </section>
    </div>
  );
};

export default ProductFilter;