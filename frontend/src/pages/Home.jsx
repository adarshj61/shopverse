import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductShowcase from "../components/ProductShowcase";
import ProductCard from "../components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const homeRef = useRef(null);

  const products = [
    {
      id: "1",
      name: "Essential Hoodie",
      category: "CLOTHING",
      price: "2,499",
      shortName: "01",
      className: "product-one",
    },
    {
      id: "2",
      name: "Urban Sneakers",
      category: "FOOTWEAR",
      price: "3,999",
      shortName: "02",
      className: "product-two",
    },
    {
      id: "3",
      name: "Classic Watch",
      category: "ACCESSORIES",
      price: "5,499",
      shortName: "03",
      className: "product-three",
    },
    {
      id: "4",
      name: "Everyday Bag",
      category: "ACCESSORIES",
      price: "2,999",
      shortName: "04",
      className: "product-four",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================================
         GLOBAL SCROLL REFRESH
      ========================================= */

      const refreshScroll = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("load", refreshScroll);

      /* =========================================
         CINEMATIC STORY
      ========================================= */

      gsap.from(".panel-1 h2", {
        scrollTrigger: {
          trigger: ".panel-1",
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        opacity: 0,
        ease: "none",
      });

      gsap.from(".story-product", {
        scrollTrigger: {
          trigger: ".panel-2",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
        scale: 0.4,
        rotation: -20,
        opacity: 0,
        ease: "none",
      });

      gsap.from(".panel-3 h2", {
        scrollTrigger: {
          trigger: ".panel-3",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
        y: 200,
        opacity: 0,
        ease: "none",
      });

      /* =========================================
         MARQUEE
      ========================================= */

      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      /* =========================================
         CATEGORIES
      ========================================= */

      const categoryItems =
        document.querySelectorAll(".category-item");

      const preview =
        document.querySelector(".category-image-preview");

      const previewImage =
        document.querySelector(".category-image-preview img");

      let moveX;
      let moveY;
      let moveScale;
      let moveOpacity;

      if (preview) {
        moveX = gsap.quickTo(preview, "left", {
          duration: 0.5,
          ease: "power3.out",
        });

        moveY = gsap.quickTo(preview, "top", {
          duration: 0.5,
          ease: "power3.out",
        });

        moveScale = gsap.quickTo(preview, "scale", {
          duration: 0.5,
          ease: "power3.out",
        });

        moveOpacity = gsap.quickTo(preview, "opacity", {
          duration: 0.3,
          ease: "power3.out",
        });
      }

      const categoryHandlers = [];

      categoryItems.forEach((item) => {
        const handleMove = (event) => {
          if (!preview) return;

          moveX(event.clientX);
          moveY(event.clientY);

          moveScale(1);

          const image =
            item.getAttribute("data-image");

          if (image && previewImage) {
            previewImage.src = image;
          }

          moveOpacity(1);
        };

        const handleEnter = () => {
          if (!preview) return;

          gsap.to(preview, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(item.querySelector("h2"), {
            x: 15,
            letterSpacing: "-2px",
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(item.querySelector(".category-arrow"), {
            x: 10,
            rotation: -45,
            duration: 0.5,
            ease: "power3.out",
          });
        };

        const handleLeave = () => {
          if (!preview) return;

          gsap.to(preview, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power3.inOut",
          });

          gsap.to(item.querySelector("h2"), {
            x: 0,
            letterSpacing: "normal",
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(item.querySelector(".category-arrow"), {
            x: 0,
            rotation: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        };

        item.addEventListener(
          "mouseenter",
          handleEnter
        );

        item.addEventListener(
          "mousemove",
          handleMove
        );

        item.addEventListener(
          "mouseleave",
          handleLeave
        );

        categoryHandlers.push({
          item,
          handleEnter,
          handleMove,
          handleLeave,
        });
      });

      /* =========================================
         FEATURED PRODUCTS
      ========================================= */

      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: ".featured-section",
          start: "top 75%",
        },
        y: 100,
        opacity: 0,
        scale: 0.92,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
      });

      /* =========================================
         FEATURED HEADING
      ========================================= */

      gsap.from(".featured-heading", {
        scrollTrigger: {
          trigger: ".featured-section",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      /* =========================================
         PROMO SECTION
      ========================================= */

      const promo =
        document.querySelector(".promo-section");

      if (promo) {
        gsap.from(".promo-title span", {
          scrollTrigger: {
            trigger: promo,
            start: "top 75%",
            end: "top 20%",
            scrub: 1,
          },
          y: 120,
          opacity: 0,
          rotateX: 25,
          stagger: 0.15,
          ease: "power4.out",
        });

        gsap.from(".promo-label", {
          scrollTrigger: {
            trigger: promo,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(".promo-description", {
          scrollTrigger: {
            trigger: promo,
            start: "top 65%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });

        gsap.from(".promo-button", {
          scrollTrigger: {
            trigger: promo,
            start: "top 60%",
          },
          scale: 0.7,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        });

        gsap.to(".promo-bg-text", {
          scrollTrigger: {
            trigger: promo,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          x: -250,
          ease: "none",
        });

        gsap.to(".orb-one", {
          scrollTrigger: {
            trigger: promo,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          x: 250,
          y: -150,
          scale: 1.5,
          ease: "none",
        });

        gsap.to(".orb-two", {
          scrollTrigger: {
            trigger: promo,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          x: -200,
          y: 180,
          scale: 0.7,
          ease: "none",
        });
      }

      /* =========================================
         MAGNETIC PROMO BUTTON
      ========================================= */

      const promoButton =
        document.querySelector(".promo-button");

      let promoMoveX;
      let promoMoveY;

      const handlePromoMove = (event) => {
        if (!promoButton) return;

        const rect =
          promoButton.getBoundingClientRect();

        const x =
          event.clientX -
          (rect.left + rect.width / 2);

        const y =
          event.clientY -
          (rect.top + rect.height / 2);

        promoMoveX(x * 0.18);
        promoMoveY(y * 0.18);
      };

      const resetPromoButton = () => {
        if (!promoButton) return;

        promoMoveX(0);
        promoMoveY(0);
      };

      if (promoButton) {
        promoMoveX = gsap.quickTo(
          promoButton,
          "x",
          {
            duration: 0.4,
            ease: "power3.out",
          }
        );

        promoMoveY = gsap.quickTo(
          promoButton,
          "y",
          {
            duration: 0.4,
            ease: "power3.out",
          }
        );

        promoButton.addEventListener(
          "mousemove",
          handlePromoMove
        );

        promoButton.addEventListener(
          "mouseleave",
          resetPromoButton
        );
      }

      /* =========================================
         FOOTER CINEMATIC ANIMATION
      ========================================= */

 gsap.from(".footer-big-title", {
  scrollTrigger: {
    trigger: ".site-footer",
    start: "top bottom",
    end: "top 20%",
    scrub: 1.2,
  },
  x: 180,
  opacity: 0,
  ease: "none",
});

gsap.from(".footer-big-title span", {
  scrollTrigger: {
    trigger: ".site-footer",
    start: "top bottom",
    end: "top 25%",
    scrub: 1.2,
  },
  x: -80,
  opacity: 0,
  ease: "none",
});

      gsap.from(".footer-column", {
        scrollTrigger: {
          trigger: ".footer-middle",
          start: "top 85%",
        },
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".footer-index", {
        scrollTrigger: {
          trigger: ".site-footer",
          start: "top 90%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".footer-bottom", {
        scrollTrigger: {
          trigger: ".site-footer",
          start: "top 50%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      /* =========================================
         FOOTER LINK MAGNETIC HOVER
      ========================================= */

      const footerLinks =
        document.querySelectorAll(
          ".footer-column a"
        );

      const footerHandlers = [];

      footerLinks.forEach((link) => {
        const xTo = gsap.quickTo(link, "x", {
          duration: 0.4,
          ease: "power3.out",
        });

        const handleMove = (event) => {
          const rect =
            link.getBoundingClientRect();

          const x =
            event.clientX -
            (rect.left + rect.width / 2);

          xTo(x * 0.15);
        };

        const handleLeave = () => {
          xTo(0);
        };

        link.addEventListener(
          "mousemove",
          handleMove
        );

        link.addEventListener(
          "mouseleave",
          handleLeave
        );

        footerHandlers.push({
          link,
          handleMove,
          handleLeave,
        });
      });

      /* =========================================
         CLEANUP
      ========================================= */

      return () => {
        window.removeEventListener(
          "load",
          refreshScroll
        );

        categoryHandlers.forEach(
          ({
            item,
            handleEnter,
            handleMove,
            handleLeave,
          }) => {
            item.removeEventListener(
              "mouseenter",
              handleEnter
            );

            item.removeEventListener(
              "mousemove",
              handleMove
            );

            item.removeEventListener(
              "mouseleave",
              handleLeave
            );
          }
        );

        if (promoButton) {
          promoButton.removeEventListener(
            "mousemove",
            handlePromoMove
          );

          promoButton.removeEventListener(
            "mouseleave",
            resetPromoButton
          );
        }

        footerHandlers.forEach(
          ({
            link,
            handleMove,
            handleLeave,
          }) => {
            link.removeEventListener(
              "mousemove",
              handleMove
            );

            link.removeEventListener(
              "mouseleave",
              handleLeave
            );
          }
        );
      };
    }, homeRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="home" ref={homeRef}>
  
      <Navbar />


      <Hero />

      {/* =========================================
          CINEMATIC STORY
      ========================================= */}

      <section className="story-section">
        <div className="story-panel panel-1">
          <h2>
            DESIGNED
            <br />
            FOR
            <br />
            MODERN LIFE
          </h2>
        </div>

        <div className="story-panel panel-2">
          <div className="story-product">
            SV
          </div>
        </div>

        <div className="story-panel panel-3">
          <h2>
            STYLE
            <br />
            WITHOUT
            <br />
            LIMITS
          </h2>
        </div>
      </section>

      {/* =========================================
          PRODUCT SHOWCASE
      ========================================= */}

      <ProductShowcase />

      {/* =========================================
          MARQUEE
      ========================================= */}

      <section className="marquee-section">
        <div className="marquee-track">
          <span>
            SHOPVERSE ✦ SHOPVERSE ✦ SHOPVERSE ✦
          </span>

          <span>
            SHOPVERSE ✦ SHOPVERSE ✦ SHOPVERSE ✦
          </span>
        </div>
      </section>

      {/* =========================================
          CATEGORIES
      ========================================= */}

      <section
        className="categories-section"
        id="categories"
      >
        <div className="section-header">
          <p>01 / CATEGORIES</p>

          <span>
            FIND YOUR
            <br />
            STYLE
          </span>
        </div>

        <div className="category-list">
          <div
            className="category-item"
            data-image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
          >
            <h2>FASHION</h2>

            <span className="category-arrow">
              ↗
            </span>
          </div>

          <div
            className="category-item"
            data-image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
          >
            <h2>FOOTWEAR</h2>

            <span className="category-arrow">
              ↗
            </span>
          </div>

          <div
            className="category-item"
            data-image="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80"
          >
            <h2>ACCESSORIES</h2>

            <span className="category-arrow">
              ↗
            </span>
          </div>

          <div
            className="category-item"
            data-image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80"
          >
            <h2>LIFESTYLE</h2>

            <span className="category-arrow">
              ↗
            </span>
          </div>

          <div className="category-image-preview">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
              alt="Category preview"
            />
          </div>
        </div>
      </section>

      {/* =========================================
          FEATURED PRODUCTS
      ========================================= */}

      <section className="featured-section">
        <div className="featured-heading">
          <div>
            <p>02 / FEATURED</p>

            <h2>
              SELECTED
              <br />
              <span>FOR YOU.</span>
            </h2>
          </div>

          <p className="featured-description">
            A selection of pieces designed
            <br />
            to become everyday essentials.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* =========================================
          PROMO
      ========================================= */}

      <section
        className="promo-section"
        id="promo"
      >
        <div className="promo-bg-text">
          SHOPVERSE
        </div>

        <div className="promo-orb orb-one"></div>
        <div className="promo-orb orb-two"></div>

        <div className="promo-content">
          <p className="promo-label">
            03 / SHOPVERSE
          </p>

          <h2 className="promo-title">
            <span>FIND</span>

            <span>SOMETHING</span>

            <span className="promo-outline">
              YOU LOVE.
            </span>
          </h2>

          <p className="promo-description">
            Curated pieces for the way
            <br />
            you live, move and express
            yourself.
          </p>

          <button className="promo-button">
            <span>
              EXPLORE COLLECTION
            </span>

            <span className="promo-arrow">
              ↗
            </span>
          </button>
        </div>

       <div className="promo-corner">
  <span>03 / 04</span>
  <span>KEEP EXPLORING</span>
</div>
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-index">
            <span>04 / 04</span>

            <span>
              THE END IS JUST THE BEGINNING
            </span>
          </div>

          <h2 className="footer-big-title">
            SHOP
            <span>VERSE</span>
          </h2>
        </div>

        <div className="footer-middle">
          <div className="footer-column">
            <p>EXPLORE</p>

            <a href="/">HOME</a>

            <a href="/shop">SHOP</a>

            <a href="#categories">
              CATEGORIES
            </a>
          </div>

          <div className="footer-column">
            <p>CONNECT</p>

            <a href="#promo">
              INSTAGRAM ↗
            </a>

            <a href="#promo">
              TWITTER ↗
            </a>

            <a href="#promo">
              CONTACT ↗
            </a>
          </div>

          <div className="footer-column footer-newsletter">
            <p>STAY IN THE LOOP</p>

            <div className="newsletter-form">
              <input
                type="email"
                placeholder="YOUR EMAIL"
              />

              <button>↗</button>
            </div>

            <span>
              NEW PRODUCTS. NEW DROPS.
              <br />
              NOTHING SPAMMY.
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 SHOPVERSE
          </span>

          <span>
            ALL RIGHTS RESERVED
          </span>

          <span>
            MADE WITH ✦
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Home;