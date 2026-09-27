import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Everything for happy pets</p>

          <h1>Everything your pet needs</h1>

          <p className="hero__text">
            Discover food, toys, accessories and everyday essentials
            for your pet.
          </p>

          <Link to="/products" className="hero__button">
            Shop products
          </Link>
        </div>

        <div className="hero__image">
          <img
            src="/images/dog-bed.jpg"
            alt="Pet products"
          />
        </div>
      </section>

      <section className="home-benefits">
        <div>
          <strong>Quality products</strong>
          <span>Carefully selected for your pets</span>
        </div>

        <div>
          <strong>Fast delivery</strong>
          <span>Easy shopping from home</span>
        </div>

        <div>
          <strong>For happy pets</strong>
          <span>Everything they need in one place</span>
        </div>
      </section>
    </main>
  );
};

export default Home;