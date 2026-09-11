import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Essential Hoodie",
    category: "FASHION",
    price: 2499,
    oldPrice: 2999,
    rating: 4.8,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Urban Sneakers",
    category: "FOOTWEAR",
    price: 3999,
    oldPrice: 4999,
    rating: 4.9,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Classic Watch",
    category: "ACCESSORIES",
    price: 5499,
    oldPrice: 6499,
    rating: 4.7,
    badge: "LIMITED",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Everyday Bag",
    category: "ACCESSORIES",
    price: 2999,
    oldPrice: 3599,
    rating: 4.6,
    badge: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Minimal Overshirt",
    category: "FASHION",
    price: 3299,
    oldPrice: 3999,
    rating: 4.8,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Street Runner",
    category: "FOOTWEAR",
    price: 4299,
    oldPrice: 4999,
    rating: 4.9,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Steel Chronograph",
    category: "ACCESSORIES",
    price: 6999,
    oldPrice: 7999,
    rating: 4.9,
    badge: "PREMIUM",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Essential Tee",
    category: "FASHION",
    price: 1499,
    oldPrice: 1899,
    rating: 4.5,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
];
const getCart = () => {
  try {
    return JSON.parse(
      localStorage.getItem("shopverse-cart")
    ) || [];
  } catch {
    return [];
  }
};

function Shop() {
  const [addedProduct, setAddedProduct] = useState(null);
  const shopRef = useRef(null);

  const [searchParams, setSearchParams] =
    useSearchParams();
  const [cart, setCart] = useState(getCart);
  const initialCategory =
    searchParams.get("category")?.toUpperCase() || "ALL";

  const [category, setCategory] =
    useState(initialCategory);

  const [search, setSearch] = useState("");

  const [sort, setSort] =
    useState("featured");

  const [liked, setLiked] =
  useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          "shopverse-wishlist"
        )
      ) || [];
    } catch {
      return [];
    }
  });

  const categories = [
    "ALL",
    "FASHION",
    "FOOTWEAR",
    "ACCESSORIES",
  ];

  /* =========================================
     FILTER + SORT
  ========================================= */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "ALL") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    if (search.trim()) {
      const query =
        search.toLowerCase().trim();

      result = result.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query) ||
          product.category
            .toLowerCase()
            .includes(query)
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [category, search, sort]);

  /* =========================================
     CATEGORY CHANGE
  ========================================= */

  const changeCategory = (newCategory) => {
    setCategory(newCategory);

    if (newCategory === "ALL") {
      setSearchParams({});
    } else {
      setSearchParams({
        category:
          newCategory.toLowerCase(),
      });
    }
  };

  /* =========================================
     WISHLIST
  ========================================= */

  const toggleWishlist = (id) => {
  setLiked((current) => {
    const updated =
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id];

    localStorage.setItem(
      "shopverse-wishlist",
      JSON.stringify(updated)
    );

    return updated;
  });
};
  const addToCart = (product) => {
  setCart((currentCart) => {
    const existing =
      currentCart.find(
        (item) => item.id === product.id
      );

    let updatedCart;

    if (existing) {
      updatedCart = currentCart.map(
        (item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
      );
    } else {
      updatedCart = [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "shopverse-cart",
      JSON.stringify(updatedCart)
    );

    return updatedCart;
  });
    setAddedProduct(product.id);

  setTimeout(() => {
    setAddedProduct(null);
  }, 1200);


  /* CART BUTTON ANIMATION */

  const button =
    document.querySelector(
      `[data-cart-id="${product.id}"]`
    );

  if (button) {
    gsap.fromTo(
      button,
      {
        scale: 1,
      },
      {
        scale: 0.94,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      }
    );
  }
};

  /* =========================================
     GSAP
  ========================================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* HEADER */

      const headerTimeline =
        gsap.timeline();

      headerTimeline
        .from(".shop-eyebrow", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".shop-heading-content h1 span",
          {
            y: 120,
            opacity: 0,
            rotateX: 70,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .from(
          ".shop-intro",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );

      /* HEADER PARALLAX */

      gsap.to(".shop-header-glow", {
        scrollTrigger: {
          trigger: ".shop-header",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 220,
        scale: 1.3,
        ease: "none",
      });

      gsap.to(".shop-header-number", {
        scrollTrigger: {
          trigger: ".shop-header",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 150,
        rotation: -8,
        ease: "none",
      });

      /* TOOLBAR */

      gsap.from(".shop-toolbar", {
        scrollTrigger: {
          trigger: ".shop-toolbar",
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      /* RESULT */

      gsap.from(".shop-result-info", {
        scrollTrigger: {
          trigger: ".shop-result-info",
          start: "top 90%",
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      /* PRODUCT CARDS */

      gsap.from(".shop-product-card", {
        scrollTrigger: {
          trigger: ".shop-product-grid",
          start: "top 85%",
        },
        y: 100,
        opacity: 0,
        scale: 0.94,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
      });

      /* PRODUCT IMAGES */

      gsap.utils
        .toArray(".shop-product-image img")
        .forEach((image) => {
          gsap.to(image, {
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
            yPercent: -8,
            scale: 1.08,
            ease: "none",
          });
        });
    }, shopRef);

    return () => {
      ctx.revert();
    };
  }, [ category,
  search,
  sort,]);
  useEffect(() => {
  const cards = gsap.utils.toArray(
    ".shop-product-card"
  );

  if (!cards.length) return;

  gsap.fromTo(
    cards,
    {
      y: 40,
      opacity: 0,
      scale: 0.96,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
    }
  );
}, [
  category,
  search,
  sort,
]);
useEffect(() => {
  const count =
    document.querySelector(
      ".shop-count"
    );

  if (!count) return;

  gsap.fromTo(
    count,
    {
      y: 10,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 0.5,
      duration: 0.4,
      ease: "power3.out",
    }
  );
}, [filteredProducts.length]);

  /* =========================================
     CARD HOVER
  ========================================= */

  const handleCardMove = (
    event,
    card
  ) => {
    const rect =
      card.getBoundingClientRect();

    const x =
      event.clientX -
      (rect.left + rect.width / 2);

    const y =
      event.clientY -
      (rect.top + rect.height / 2);

    gsap.to(card, {
      rotationY: x * 0.025,
      rotationX: y * -0.025,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleCardLeave = (card) => {
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      className="shop-page"
      ref={shopRef}
    >
      <Navbar />

      {/* =====================================
          SHOP HERO
      ===================================== */}

      <header className="shop-header">
        <div className="shop-header-glow"></div>

        <div className="shop-header-number">
          08
        </div>

        <div className="shop-heading-content">
          <p className="shop-eyebrow">
            SHOPVERSE / COLLECTION
          </p>

          <h1>
            <span>SHOP</span>
            <span>
              EVERYTHING.
            </span>
          </h1>

          <p className="shop-intro">
            Discover carefully selected
            pieces for everyday life.
            Designed to move with you,
            wherever you go.
          </p>
        </div>
      </header>

      {/* =====================================
          TOOLBAR
      ===================================== */}

      <section className="shop-toolbar">
        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="SEARCH PRODUCTS"
          />
        </div>

        <div className="category-filter">
          {categories.map(
            (item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeCategory(item)
                }
              >
                {item}
              </button>
            )
          )}
        </div>

        <div className="sort-box">
          <span>SORT</span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
          >
            <option value="featured">
              FEATURED
            </option>

            <option value="price-low">
              PRICE: LOW
            </option>

            <option value="price-high">
              PRICE: HIGH
            </option>

            <option value="rating">
              RATING
            </option>
          </select>
        </div>
      </section>


      {/* =====================================
          RESULT INFO
      ===================================== */}

      <div className="shop-result-info">
        <span className="shop-count">
          {filteredProducts.length
            .toString()
            .padStart(2, "0")}{" "}
          PRODUCTS
        </span>

        <span>
          {category}
        </span>
        <div className="shop-cart-status">
  CART /
  {cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )
    .toString()
    .padStart(2, "0")}
</div>
      </div>

      {/* =====================================
          PRODUCTS
      ===================================== */}

      <section className="shop-products">
        {filteredProducts.length > 0 ? (
          <div className="shop-product-grid">
            {filteredProducts.map(
              (product) => (
                <article
                  className="shop-product-card"
                  key={product.id}
                  onMouseMove={(event) =>
                    handleCardMove(
                      event,
                      event.currentTarget
                    )
                  }
                  onMouseLeave={(event) =>
                    handleCardLeave(
                      event.currentTarget
                    )
                  }
                >
                  <div className="shop-product-image">
                    {product.badge && (
                      <span className="product-badge">
                        {product.badge}
                      </span>
                    )}

                    <button
                      className={`wishlist-button ${
                        liked.includes(
                          product.id
                        )
                          ? "liked"
                          : ""
                      }`}
                      onClick={() =>
                        toggleWishlist(
                          product.id
                        )
                      }
                      aria-label="Add to wishlist"
                    >
                      {liked.includes(
                        product.id
                      )
                        ? "♥"
                        : "♡"}
                    </button>

                    <Link
                      to={`/product/${product.id}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />
                    </Link>

                    <Link
                      className="quick-view"
                      to={`/product/${product.id}`}
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

                      <p className="product-rating">
                        ★ {product.rating}
                      </p>
                    </div>

                    <div className="shop-product-price">
                      <strong>
                        ₹
                        {product.price.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      <del>
                        ₹
                        {product.oldPrice.toLocaleString(
                          "en-IN"
                        )}
                      </del>
                    </div>
                  </div>

                  <button
  className="shop-add-cart"
  data-cart-id={product.id}
  onClick={() =>
    addToCart(product)
  }
>
  {addedProduct === product.id
    ? "ADDED ✓"
    : "ADD TO CART"}

  <span>
    {addedProduct === product.id
      ? "✓"
      : "↗"}
  </span>
</button>
                </article>
              )
            )}
          </div>
        ) : (
          <div className="no-products">
            <span className="no-products-number">
              00
            </span>

            <h2>
              NOTHING
              <br />
              FOUND.
            </h2>

            <p>
              Try another search or
              category.
            </p>
          </div>
        )}
      </section>

      {/* =====================================
          END STATEMENT
      ===================================== */}

      <section className="shop-end">
        <p>SHOPVERSE / 2026</p>

        <h2>
          FIND
          <br />
          <span>YOUR</span>
          <br />
          THING.
        </h2>
      </section>
    </div>
  );
}

export default Shop;