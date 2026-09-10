import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProductShowcase() {
  const sectionRef = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const product = productRef.current;

      // Main scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2200",
          scrub: 1.5,
          pin: true,
        },
      });

      tl.fromTo(
        product,
        {
          scale: 0.45,
          rotationY: -35,
          rotationX: 15,
          y: 180,
        },
        {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      )

      .to(product, {
        rotationY: 360,
        rotationX: 8,
        scale: 1.15,
        duration: 2,
        ease: "none",
      })

      .to(product, {
        rotationY: 720,
        rotationX: -8,
        scale: 0.9,
        duration: 2,
        ease: "none",
      })

      .to(product, {
        scale: 1.4,
        y: -80,
        duration: 1.5,
        ease: "power3.inOut",
      })

      .to(product, {
        scale: 0.2,
        opacity: 0,
        rotationY: 900,
        y: -300,
        duration: 1,
        ease: "power4.in",
      });

      // Text animations
      gsap.from(".showcase-label", {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".showcase-title", {
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="product-showcase"
      ref={sectionRef}
    >
      <div className="showcase-background">
        <span>SV</span>
      </div>

      <div className="showcase-info">
        <p className="showcase-label">
          02 / THE OBJECT
        </p>

        <h2 className="showcase-title">
          DESIGNED
          <br />
          TO STAND
          <br />
          <span>OUT.</span>
        </h2>

        <p className="showcase-description">
          Minimal form.
          <br />
          Maximum impact.
        </p>
      </div>

      <div
        className="showcase-product"
        ref={productRef}
      >
        <div className="showcase-shine" />

        <div className="showcase-logo">
          SV
        </div>

        <div className="showcase-detail">
          SHOPVERSE
        </div>
      </div>

      <div className="showcase-scroll">
        SCROLL TO ROTATE
      </div>

      <div className="showcase-number">
        02
      </div>
    </section>
  );
}

export default ProductShowcase;