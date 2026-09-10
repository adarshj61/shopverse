import { useRef } from "react";
import gsap from "gsap";

function ProductCard({ product }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 900) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.5,
      ease: "power3.out",
      transformPerspective: 1000,
    });

    gsap.to(imageRef.current, {
      x: (x / rect.width - 0.5) * 18,
      y: (y / rect.height - 0.5) * 18,
      scale: 1.08,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(glowRef.current, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    if (window.innerWidth <= 900) return;

    gsap.to(imageRef.current, {
      scale: 1.08,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.4,
    });
  };

  return (
    <div
      className="product-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-image">

        <div
          className="product-cursor-glow"
          ref={glowRef}
        />

        <div
          className={`product-placeholder ${product.className}`}
          ref={imageRef}
        >
          <span>{product.shortName}</span>
        </div>

        <div className="product-view">
          VIEW PRODUCT
          <span>↗</span>
        </div>

      </div>

      <div className="product-info">

        <div>
          <p className="product-category">
            {product.category}
          </p>

          <h3>{product.name}</h3>
        </div>

        <div className="product-price">
          ₹{product.price}
        </div>

      </div>
    </div>
  );
}

export default ProductCard;