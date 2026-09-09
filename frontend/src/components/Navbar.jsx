import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import gsap from "gsap";

import { useCart } from "../context/CartContext";

function Navbar() {
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { totalItems } = useCart();

  /* =========================
     NAVBAR ENTRANCE
  ========================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-item",
        {
          y: -20,
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
    }, navRef);

    return () => ctx.revert();
  }, []);


  /* =========================
     SCROLL
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);


  /* =========================
     MOBILE MENU
  ========================= */

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      gsap.to(mobileMenuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.65,
        ease: "power4.inOut",
      });

      gsap.fromTo(
        ".mobile-link",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);


  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}

      <nav
        ref={navRef}
        className={`navbar ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >

        <Link
          to="/"
          className="logo nav-item"
        >
          SHOP<span>VERSE</span>
        </Link>


        <div className="nav-links">

          <Link
            to="/"
            className="nav-item"
          >
            Home
          </Link>

          <Link
            to="/shop"
            className="nav-item"
          >
            Shop
          </Link>

          <a
            href="/#categories"
            className="nav-item"
          >
            Categories
          </a>

          <a
            href="/#featured"
            className="nav-item"
          >
            Featured
          </a>

        </div>


        <div className="nav-actions">

          <button
            className="nav-icon nav-item"
            aria-label="Search"
          >
            <Search size={18} />
          </button>


          <button
            className="nav-icon nav-item"
            aria-label="Wishlist"
          >
            <Heart size={18} />
          </button>


          <Link
            to="/cart"
            className="nav-icon cart-icon nav-item"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />

            {totalItems > 0 && (
              <span>
                {totalItems}
              </span>
            )}
          </Link>


          <Link
            to="/login"
            className="login-link nav-item"
          >
            Login
          </Link>


          <button
            className="menu-button nav-item"
            onClick={() =>
              setMenuOpen(true)
            }
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

        </div>

      </nav>


      {/* =========================
          MOBILE MENU
      ========================= */}

      <div
        ref={mobileMenuRef}
        className="mobile-menu"
      >

        <div className="mobile-menu-header">

          <Link
            to="/"
            className="logo"
            onClick={closeMenu}
          >
            SHOP<span>VERSE</span>
          </Link>


          <button
            className="mobile-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

        </div>


        <div className="mobile-navigation">

          <Link
            to="/"
            className="mobile-link"
            onClick={closeMenu}
          >
            <span>01</span>
            HOME
          </Link>


          <Link
            to="/shop"
            className="mobile-link"
            onClick={closeMenu}
          >
            <span>02</span>
            SHOP
          </Link>


          <a
            href="/#categories"
            className="mobile-link"
            onClick={closeMenu}
          >
            <span>03</span>
            CATEGORIES
          </a>


          <a
            href="/#featured"
            className="mobile-link"
            onClick={closeMenu}
          >
            <span>04</span>
            FEATURED
          </a>


          <Link
            to="/login"
            className="mobile-link"
            onClick={closeMenu}
          >
            <span>05</span>
            LOGIN
          </Link>

        </div>


        <div className="mobile-menu-footer">

          <p>
            YOUR STYLE.
            <br />
            YOUR CHOICE.
          </p>

          <div>
            <Heart size={17} />
            <ShoppingBag size={17} />
          </div>

        </div>

      </div>
    </>
  );
}

export default Navbar;