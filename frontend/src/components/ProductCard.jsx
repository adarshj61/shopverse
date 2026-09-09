import { useRef } from "react";
import gsap from "gsap";

function ProductCard({ product }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(cardRef.current.querySelector(".product-image"), {
      scale: 1.08,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(cardRef.current.querySelector(".product-image"), {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <div
      className="product-card"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <div
        className={`product-image ${product.className}`}
      >
        <span>{product.shortName}</span>
      </div>

      <div className="product-info">

        <div>
          <p className="product-category">
            {product.category}
          </p>

          <h3>{product.name}</h3>
        </div>

        <p className="product-price">
          ₹{product.price}
        </p>

      </div>

      <button className="add-button">
        +
      </button>

    </div>
  );
}

export default ProductCard;