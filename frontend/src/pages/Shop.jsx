import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import Navbar from "../components/Navbar";
import products from "../data/products";

function Shop() {
  const shopRef = useRef(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = [
    "All",
    "Fashion",
    "Footwear",
    "Accessories",
    "Electronics",
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (search.trim() !== "") {
      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".shop-heading-content", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".shop-toolbar", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    }, shopRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".shop-product-card");

    gsap.killTweensOf(cards);

    gsap.fromTo(
      cards,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, [filteredProducts]);

  return (
    <div className="shop-page" ref={shopRef}>

      <Navbar />

      {/* HEADER */}

      <section className="shop-header">

        <div className="shop-heading-content">

          <p className="shop-eyebrow">
            SHOPVERSE / COLLECTION
          </p>

          <h1>
            FIND
            <br />
            YOUR
            <br />
            <span>STYLE.</span>
          </h1>

          <p className="shop-intro">
            Explore our carefully selected collection
            of fashion, footwear, accessories and
            technology.
          </p>

        </div>

      </section>


      {/* TOOLBAR */}

      <section className="shop-toolbar">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        <div className="category-filter">

          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "active"
                  : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}

        </div>


        <div className="sort-box">

          <SlidersHorizontal size={16} />

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
          >
            <option value="featured">
              Featured
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="rating">
              Highest Rated
            </option>

          </select>

        </div>

      </section>


      {/* PRODUCT COUNT */}

      <div className="shop-result-info">

        <p>
          {filteredProducts.length} PRODUCTS
        </p>

        {search && (
          <p>
            RESULTS FOR "{search.toUpperCase()}"
          </p>
        )}

      </div>


      {/* PRODUCTS */}

      <section className="shop-products">

        {filteredProducts.length > 0 ? (

          <div className="shop-product-grid">

            {filteredProducts.map((product) => (

              <ShopProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        ) : (

          <div className="no-products">

            <h2>
              NOTHING FOUND.
            </h2>

            <p>
              Try another search or category.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}


/* PRODUCT CARD */

function ShopProductCard({ product }) {

  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const [liked, setLiked] = useState(false);

  const handleEnter = () => {

    gsap.to(cardRef.current, {
      y: -8,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(imageRef.current, {
      scale: 1.06,
      duration: 0.5,
      ease: "power3.out",
    });

  };

  const handleLeave = () => {

    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });

  };

  return (

    <article
      className="shop-product-card"
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >

      <div className="shop-product-image">

        <img
          ref={imageRef}
          src={product.image}
          alt={product.name}
        />


        <button
          className={`wishlist-button ${
            liked ? "liked" : ""
          }`}
          onClick={() => setLiked(!liked)}
        >
          <Heart
            size={18}
            fill={liked ? "currentColor" : "none"}
          />
        </button>


        <div className="product-badge">
          NEW
        </div>


        <Link
          to={`/product/${product.id}`}
          className="quick-view"
        >
          QUICK VIEW ↗
        </Link>

      </div>


      <div className="shop-product-info">

        <div>

          <p className="shop-product-category">
            {product.category}
          </p>

          <h3>
            {product.name}
          </h3>

          <div className="product-rating">
            ★ {product.rating}
          </div>

        </div>


        <div className="shop-product-price">

          <strong>
            ₹{product.price.toLocaleString("en-IN")}
          </strong>

          <del>
            ₹{product.oldPrice.toLocaleString("en-IN")}
          </del>

        </div>

      </div>


      <button className="shop-add-cart">

        <ShoppingBag size={16} />

        ADD TO CART

      </button>

    </article>
  );
}

export default Shop;