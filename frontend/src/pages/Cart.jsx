import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Cart() {
  const cartRef = useRef(null);

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  const shipping =
    totalPrice >= 999 || totalPrice === 0
      ? 0
      : 99;

  const grandTotal =
    totalPrice + shipping;


  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".cart-header-content", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".cart-item", {
        x: -60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".cart-summary", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });

    }, cartRef);

    return () => ctx.revert();
  }, []);


  return (
    <div
      className="cart-page"
      ref={cartRef}
    >

      <Navbar />

      <main className="cart-main">

        <div className="cart-header-content">

          <Link
            to="/shop"
            className="back-to-shop"
          >
            <ArrowLeft size={15} />
            CONTINUE SHOPPING
          </Link>

          <p className="cart-eyebrow">
            SHOPVERSE / YOUR BAG
          </p>

          <h1>
            YOUR
            <br />
            <span>CART.</span>
          </h1>

        </div>


        {cartItems.length === 0 ? (

          <EmptyCart />

        ) : (

          <div className="cart-layout">

            {/* ITEMS */}

            <div className="cart-items">

              <div className="cart-items-top">

                <p>
                  {cartItems.length} PRODUCTS
                </p>

                <button
                  onClick={clearCart}
                >
                  CLEAR CART
                </button>

              </div>


              {cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={`${item.id}-${item.size}`}
                >

                  <div className="cart-item-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>


                  <div className="cart-item-info">

                    <p className="cart-item-category">
                      {item.category}
                    </p>

                    <h2>
                      {item.name}
                    </h2>

                    {item.size && (
                      <p className="cart-item-size">
                        SIZE: {item.size}
                      </p>
                    )}

                    <div className="cart-item-bottom">

                      <div className="cart-quantity">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id,
                              item.size
                            )
                          }
                        >
                          <Minus size={13} />
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.id,
                              item.size
                            )
                          }
                        >
                          <Plus size={13} />
                        </button>

                      </div>


                      <strong>
                        ₹{(
                          item.price *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>

                  </div>


                  <button
                    className="remove-item"
                    onClick={() =>
                      removeFromCart(
                        item.id,
                        item.size
                      )
                    }
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              ))}

            </div>


            {/* SUMMARY */}

            <div className="cart-summary">

              <p className="summary-eyebrow">
                ORDER SUMMARY
              </p>

              <h2>
                SUMMARY
              </h2>


              <div className="summary-line">

                <span>
                  SUBTOTAL
                </span>

                <strong>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </strong>

              </div>


              <div className="summary-line">

                <span>
                  SHIPPING
                </span>

                <strong>
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping}`}
                </strong>

              </div>


              {totalPrice > 0 &&
                totalPrice < 999 && (
                  <p className="shipping-message">
                    Add ₹
                    {(
                      999 - totalPrice
                    ).toLocaleString("en-IN")}
                    {" "}
                    more for free shipping.
                  </p>
                )}


              <div className="summary-total">

                <span>
                  TOTAL
                </span>

                <strong>
                  ₹{grandTotal.toLocaleString("en-IN")}
                </strong>

              </div>


              <Link
                to="/checkout"
                className="checkout-button"
              >
                CHECKOUT ↗
              </Link>


              <p className="secure-text">
                SECURE CHECKOUT · FREE RETURNS
              </p>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}


/* EMPTY CART */

function EmptyCart() {

  return (
    <div className="empty-cart">

      <div className="empty-cart-number">
        00
      </div>

      <h2>
        YOUR CART
        <br />
        IS EMPTY.
      </h2>

      <p>
        Looks like you haven't added
        anything yet.
      </p>

      <Link
        to="/shop"
        className="empty-cart-button"
      >
        START SHOPPING ↗
      </Link>

    </div>
  );
}

export default Cart;