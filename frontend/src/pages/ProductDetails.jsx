import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";
import gsap from "gsap";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const pageRef = useRef(null);
  const imageRef = useRef(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [liked, setLiked] = useState(false);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  useEffect(() => {
    if (!product) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .from(".product-detail-image", {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        })
        .from(
          ".product-detail-info > *",
          {
            x: 80,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.7"
        );
    }, pageRef);

    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h1>PRODUCT NOT FOUND.</h1>

        <Link to="/shop">
          ← BACK TO SHOP
        </Link>
      </div>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

 const handleAddToCart = () => {
  if (product.sizes.length > 1 && !selectedSize) {
    alert("Please select a size.");
    return;
  }

  const size =
    product.sizes.length === 1
      ? product.sizes[0]
      : selectedSize;

  addToCart(product, quantity, size);

  alert(
    `${product.name} added to cart!`
  );
};

  return (
    <div
      className="product-details-page"
      ref={pageRef}
    >
      <Navbar />

      <main className="product-details">

        {/* BACK */}

        <Link
          to="/shop"
          className="back-to-shop"
        >
          <ArrowLeft size={16} />
          BACK TO SHOP
        </Link>


        <div className="product-detail-layout">

          {/* IMAGE */}

          <div className="product-detail-image">

            <div className="detail-image-wrapper">

              <img
                ref={imageRef}
                src={product.image}
                alt={product.name}
              />

              <button
                className={`detail-wishlist ${
                  liked ? "liked" : ""
                }`}
                onClick={() =>
                  setLiked(!liked)
                }
              >
                <Heart
                  size={21}
                  fill={
                    liked
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

              <div className="detail-badge">
                -{discount}%
              </div>

            </div>


            <div className="image-caption">

              <span>
                SHOPVERSE / {product.category}
              </span>

              <span>
                PRODUCT #{String(product.id).padStart(2, "0")}
              </span>

            </div>

          </div>


          {/* INFORMATION */}

          <div className="product-detail-info">

            <p className="detail-category">
              {product.category}
            </p>

            <h1>
              {product.name}
            </h1>


            {/* RATING */}

            <div className="detail-rating">

              <div className="stars">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <Star
                      key={star}
                      size={14}
                      fill="currentColor"
                    />
                  )
                )}

              </div>

              <span>
                {product.rating} / 5
              </span>

            </div>


            {/* PRICE */}

            <div className="detail-price">

              <strong>
                ₹{product.price.toLocaleString("en-IN")}
              </strong>

              <del>
                ₹{product.oldPrice.toLocaleString(
                  "en-IN"
                )}
              </del>

              <span>
                SAVE {discount}%
              </span>

            </div>


            {/* DESCRIPTION */}

            <p className="detail-description">
              {product.description}
            </p>


            {/* SIZE */}

            {product.sizes.length > 1 && (
              <div className="size-section">

                <div className="size-heading">

                  <span>
                    SELECT SIZE
                  </span>

                  <span>
                    SIZE GUIDE
                  </span>

                </div>

                <div className="sizes">

                  {product.sizes.map(
                    (size) => (

                      <button
                        key={size}
                        className={
                          selectedSize === size
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          setSelectedSize(size)
                        }
                      >
                        {size}
                      </button>

                    )
                  )}

                </div>

              </div>
            )}


            {/* QUANTITY */}

            <div className="quantity-section">

              <span>
                QUANTITY
              </span>

              <div className="quantity-control">

                <button
                  onClick={
                    decreaseQuantity
                  }
                >
                  <Minus size={15} />
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  onClick={
                    increaseQuantity
                  }
                >
                  <Plus size={15} />
                </button>

              </div>

            </div>


            {/* CART */}

            <button
              className="detail-add-cart"
              onClick={handleAddToCart}
            >

              <ShoppingBag size={19} />

              ADD TO CART

              <span>
                ₹{(
                  product.price *
                  quantity
                ).toLocaleString("en-IN")}
              </span>

            </button>


            {/* INFO */}

            <div className="product-extra-info">

              <div>
                <span>✓</span>
                Free shipping on orders above ₹999
              </div>

              <div>
                <span>✓</span>
                Easy 7-day returns
              </div>

              <div>
                <span>✓</span>
                Secure checkout
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ProductDetails;