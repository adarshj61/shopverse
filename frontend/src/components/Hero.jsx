import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Hero() {
  const heroRef = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .from(".hero-small-text", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(".hero-title-line", {
          y: 120,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
        })
        .from(".hero-description", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(".hero-buttons", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.3")
        .from(productRef.current, {
          scale: 0.5,
          rotation: -15,
          opacity: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        }, "-=0.8");

      gsap.to(".hero-product", {
        y: -15,
        rotation: 2,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-circle", {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      const xTo = gsap.quickTo(productRef.current, "x", {
        duration: 0.8,
        ease: "power3",
      });

      const yTo = gsap.quickTo(productRef.current, "y", {
        duration: 0.8,
        ease: "power3",
      });

      const moveProduct = (event) => {
        const { clientX, clientY } = event;

        const x = (clientX / window.innerWidth - 0.5) * 35;
        const y = (clientY / window.innerHeight - 0.5) * 35;

        xTo(x);
        yTo(y);
      };

      window.addEventListener("mousemove", moveProduct);

      return () => {
        window.removeEventListener("mousemove", moveProduct);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>

      <div className="hero-background-text">
        SHOP
      </div>

      <div className="hero-content">

        <p className="hero-small-text">
          ✦ THE NEW SHOPPING EXPERIENCE
        </p>

        <h1 className="hero-title">

          <span className="hero-title-line">
            DISCOVER
          </span>

          <span className="hero-title-line hero-title-outline">
            YOUR
          </span>

          <span className="hero-title-line">
            STYLE.
          </span>

        </h1>

        <p className="hero-description">
          Discover products designed for the way
          you live, work and express yourself.
        </p>

        <div className="hero-buttons">

          <Link to="/shop" className="primary-button">
            SHOP NOW
            <span>↗</span>
          </Link>

          <a href="#featured" className="secondary-button">
            EXPLORE
          </a>

        </div>

      </div>

      <div className="hero-visual" ref={productRef}>

        <div className="floating-circle">
          <span>NEW • NEW • NEW • NEW •</span>
        </div>

        <div className="hero-product">

          <div className="product-shape">
            <div className="product-shine"></div>

            <div className="product-label">
              SV
            </div>

          </div>

          <div className="floating-tag">
            PREMIUM
          </div>

        </div>

        <div className="hero-number">
          01
        </div>

      </div>

      <div className="scroll-indicator">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line"></div>
      </div>

    </section>
  );
}

export default Hero;