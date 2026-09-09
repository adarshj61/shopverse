import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Essential Hoodie",
    category: "CLOTHING",
    price: "2,499",
    shortName: "01",
    className: "product-one",
  },
  {
    name: "Urban Sneakers",
    category: "FOOTWEAR",
    price: "3,999",
    shortName: "02",
    className: "product-two",
  },
  {
    name: "Classic Watch",
    category: "ACCESSORIES",
    price: "5,499",
    shortName: "03",
    className: "product-three",
  },
  {
    name: "Everyday Bag",
    category: "ACCESSORIES",
    price: "2,999",
    shortName: "04",
    className: "product-four",
  },
];

function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".section-heading", {
        scrollTrigger: {
          trigger: ".featured-section",
          start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".category-item", {
        scrollTrigger: {
          trigger: ".categories-section",
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".promo-content", {
        scrollTrigger: {
          trigger: ".promo-section",
          start: "top 75%",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

    }, homeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home" ref={homeRef}>

      <Navbar />

      <Hero />

      {/* MARQUEE */}

      <section className="marquee-section">

        <div className="marquee">

          <span>SHOP DIFFERENT ✦</span>
          <span>SHOP DIFFERENT ✦</span>
          <span>SHOP DIFFERENT ✦</span>
          <span>SHOP DIFFERENT ✦</span>

        </div>

      </section>


      {/* CATEGORIES */}

      <section
        className="categories-section"
        id="categories"
      >

        <div className="section-top">

          <p>01 / CATEGORIES</p>

          <p>
            EXPLORE OUR COLLECTION
          </p>

        </div>

        <div className="category-list">

          <div className="category-item">
            <span>01</span>
            <h2>FASHION</h2>
            <span>↗</span>
          </div>

          <div className="category-item">
            <span>02</span>
            <h2>FOOTWEAR</h2>
            <span>↗</span>
          </div>

          <div className="category-item">
            <span>03</span>
            <h2>ACCESSORIES</h2>
            <span>↗</span>
          </div>

          <div className="category-item">
            <span>04</span>
            <h2>ELECTRONICS</h2>
            <span>↗</span>
          </div>

        </div>

      </section>


      {/* FEATURED */}

      <section
        className="featured-section"
        id="featured"
      >

        <div className="section-heading">

          <div>

            <p>02 / FEATURED</p>

            <h2>
              OUR
              <br />
              FAVORITES
            </h2>

          </div>

          <p className="heading-description">
            Curated products selected
            specially for you.
          </p>

        </div>


        <div className="products-grid">

          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
            />
          ))}

        </div>

      </section>


      {/* PROMO */}

      <section className="promo-section">

        <div className="promo-content">

          <p>03 / SHOPVERSE</p>

          <h2>
            FIND
            <br />
            SOMETHING
            <br />
            <span>YOU LOVE.</span>
          </h2>

          <button className="promo-button">
            EXPLORE COLLECTION ↗
          </button>

        </div>

        <div className="promo-shape">
          <div>
            SV
          </div>
        </div>

      </section>


      {/* FOOTER */}

      <footer>

        <div className="footer-logo">
          SHOP<span>VERSE</span>
        </div>

        <p>
          © 2026 SHOPVERSE. ALL RIGHTS RESERVED.
        </p>

        <div className="footer-links">
          <span>INSTAGRAM</span>
          <span>TWITTER</span>
          <span>CONTACT</span>
        </div>

      </footer>

    </div>
  );
}

export default Home;