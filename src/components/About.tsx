import { Link } from 'react-router-dom';

const About = () => {
    return (
        <main className="about-page">
            <section className="about-hero">
                <div className="about-hero__content">
                    <p className="about__eyebrow">About us</p>
                    <h1>We care about pets as much as you do</h1>
                    <p className="about-hero__text">
                        We want to make everyday life with your pet a little easier.
                        Discover carefully selected products for happy pets and
                        happy owners.
                    </p>
                </div>

                <div className="about-hero__image">
                    <img
                        src="/images/cat-bed.jpg"
                        alt="Pet resting comfortably"
                    />
                </div>
            </section>

            <section className="about-story">
                <p className="about__eyebrow">Our story</p>
                <h2>Made for pets and the people who love them</h2>
                <p>
                    Our webshop was created with a simple idea: pet owners should
                    be able to find everything they need in one place.
                </p>
                <p>
                    From food and everyday essentials to toys and accessories,
                    our goal is to make shopping for your pet simple and enjoyable.
                </p>
            </section>

            <section className="about-values">
                <article className="about-value">
                    <h3>Quality</h3>
                    <p>
                        Carefully selected products for pets and their everyday
                        needs.
                    </p>
                </article>

                <article className="about-value">
                    <h3>Care</h3>
                    <p>
                        Pets are part of the family, and their comfort and
                        happiness matter to us.
                    </p>
                </article>

                <article className="about-value">
                    <h3>Simplicity</h3>
                    <p>
                        An easy way to find and shop for the things your pet
                        needs.
                    </p>
                </article>
            </section>

            <section className="about-cta">
                <div>
                    <p className="about__eyebrow">Explore our products</p>
                    <h2>Find something your pet will love</h2>
                    <p>
                        Browse our selection of food, toys, accessories and
                        everyday essentials.
                    </p>
                </div>

                <Link to="/products" className="about-cta__button">
                    Shop products
                </Link>
            </section>
        </main>
    );
};

export default About;