import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
       * =========================================
       * DESKTOP EXPERIENCE
       * =========================================
       */

      mm.add("(min-width: 901px)", () => {
        const intro = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
        });

        /*
         * INITIAL STATE
         */

        gsap.set(".hero-title-line", {
          yPercent: 120,
          opacity: 0,
        });

        gsap.set(".hero-small-text", {
          y: 30,
          opacity: 0,
        });

        gsap.set(".hero-description", {
          y: 30,
          opacity: 0,
        });

        gsap.set(".hero-buttons", {
          y: 30,
          opacity: 0,
        });

        gsap.set(".hero-visual", {
          scale: 0.75,
          opacity: 0,
          rotation: -8,
        });

        gsap.set(".hero-background-text", {
          opacity: 0,
          x: 100,
        });

        gsap.set(".scroll-indicator", {
          opacity: 0,
          y: 20,
        });

        /*
         * CINEMATIC INTRO
         */

        intro
          .to(".hero-small-text", {
            y: 0,
            opacity: 1,
            duration: 0.7,
          })

          .to(
            ".hero-title-line",
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.12,
              ease: "power4.out",
            },
            "-=0.25"
          )

          .to(
            ".hero-description",
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            "-=0.55"
          )

          .to(
            ".hero-buttons",
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            "-=0.45"
          )

          .to(
            ".hero-visual",
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 1.2,
              ease: "expo.out",
            },
            "-=0.9"
          )

          .to(
            ".hero-background-text",
            {
              opacity: 1,
              x: 0,
              duration: 1.2,
            },
            "-=1"
          )

          .to(
            ".scroll-indicator",
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
            },
            "-=0.5"
          );


        /*
         * =========================================
         * HERO SCROLL EXPERIENCE
         * =========================================
         */

        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,

            start: "top top",

            end: "+=1800",

            scrub: 1.2,

            pin: true,

            anticipatePin: 1,

            invalidateOnRefresh: true,
          },
        });


        /*
         * 1 — TYPOGRAPHY STARTS MOVING
         */

        scrollTimeline
          .to(
            ".hero-title-line:nth-child(1)",
            {
              x: -180,
              y: -80,
              rotation: -3,
              opacity: 0.2,
              duration: 1,
            }
          )

          .to(
            ".hero-title-line:nth-child(2)",
            {
              x: 160,
              scale: 1.15,
              duration: 1,
            },
            "<"
          )

          .to(
            ".hero-title-line:nth-child(3)",
            {
              x: -100,
              y: 90,
              scale: 0.9,
              opacity: 0.25,
              duration: 1,
            },
            "<"
          );


        /*
         * 2 — DESCRIPTION / BUTTONS LEAVE
         */

        scrollTimeline
          .to(
            ".hero-description",
            {
              y: 80,
              opacity: 0,
              duration: 0.6,
            }
          )

          .to(
            ".hero-buttons",
            {
              y: 100,
              opacity: 0,
              duration: 0.6,
            },
            "<"
          );


        /*
         * 3 — PRODUCT TAKES OVER THE SCREEN
         */

        scrollTimeline.to(
          ".hero-visual",
          {
            x: 80,
            y: -20,
            scale: 1.35,
            rotation: 8,
            duration: 1.4,
            ease: "power2.inOut",
          },
          "-=0.2"
        );


        /*
         * 4 — PRODUCT SHAPE ROTATION
         */

        scrollTimeline.to(
          ".hero-product",
          {
            rotation: -12,
            scale: 1.08,
            duration: 1,
            ease: "power2.inOut",
          },
          "<"
        );


        /*
         * 5 — CIRCLE EXPANDS
         */

        scrollTimeline.to(
          ".floating-circle",
          {
            scale: 2.2,
            opacity: 0.08,
            rotation: 160,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        );


        /*
         * 6 — BACKGROUND TYPOGRAPHY MOVES
         */

        scrollTimeline.to(
          ".hero-background-text",
          {
            x: -250,
            scale: 1.3,
            opacity: 0.04,
            duration: 1.3,
          },
          "<"
        );


        /*
         * 7 — NUMBER FLIES AWAY
         */

        scrollTimeline.to(
          ".hero-number",
          {
            x: 200,
            y: -120,
            scale: 1.8,
            opacity: 0,
            rotation: 8,
            duration: 1,
          },
          "<"
        );


        /*
         * 8 — FINAL HERO EXIT
         */

        scrollTimeline.to(
          ".hero-content",
          {
            y: -100,
            opacity: 0,
            duration: 0.8,
          }
        );

        scrollTimeline.to(
          ".hero-visual",
          {
            x: 350,
            y: -80,
            scale: 1.8,
            opacity: 0,
            rotation: 18,
            duration: 1,
            ease: "power3.in",
          },
          "<"
        );

        scrollTimeline.to(
          ".scroll-indicator",
          {
            y: 40,
            opacity: 0,
            duration: 0.5,
          },
          "<"
        );


        /*
         * =========================================
         * PRODUCT MICRO-MOTION
         * =========================================
         */

        gsap.to(".hero-product", {
          y: -12,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });


        /*
         * CIRCLE ROTATION
         */

        gsap.to(".floating-circle", {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });


        /*
         * =========================================
         * MOUSE PARALLAX
         * =========================================
         */

        const product = heroRef.current.querySelector(
          ".hero-product"
        );

        const xTo = gsap.quickTo(product, "x", {
          duration: 0.8,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(product, "y", {
          duration: 0.8,
          ease: "power3.out",
        });

        const rotateTo = gsap.quickTo(
          product,
          "rotation",
          {
            duration: 1,
            ease: "power3.out",
          }
        );


        const handleMouseMove = (event) => {
          const x =
            (event.clientX /
              window.innerWidth -
              0.5) *
            35;

          const y =
            (event.clientY /
              window.innerHeight -
              0.5) *
            25;

          const rotation =
            (event.clientX /
              window.innerWidth -
              0.5) *
            5;

          xTo(x);

          yTo(y);

          rotateTo(rotation);
        };


        window.addEventListener(
          "mousemove",
          handleMouseMove
        );


        return () => {
          window.removeEventListener(
            "mousemove",
            handleMouseMove
          );
        };
      });


      /*
       * =========================================
       * MOBILE
       * =========================================
       */

      mm.add("(max-width: 900px)", () => {
        const mobileTimeline = gsap.timeline();

        mobileTimeline
          .from(".hero-small-text", {
            y: 30,
            opacity: 0,
            duration: 0.6,
          })

          .from(
            ".hero-title-line",
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power4.out",
            },
            "-=0.2"
          )

          .from(
            ".hero-description",
            {
              y: 25,
              opacity: 0,
              duration: 0.6,
            },
            "-=0.4"
          )

          .from(
            ".hero-buttons",
            {
              y: 25,
              opacity: 0,
              duration: 0.6,
            },
            "-=0.3"
          )

          .from(
            ".hero-visual",
            {
              scale: 0.7,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.5"
          );


        gsap.to(".hero-product", {
          y: -8,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });


        gsap.to(".floating-circle", {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });


        /*
         * MOBILE SCROLL
         */

        gsap.to(".hero-product", {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          scale: 1.15,
          rotation: 6,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="hero"
      ref={heroRef}
    >

      {/* BACKGROUND WORD */}

      <div className="hero-background-text">
        SHOP
      </div>


      {/* CONTENT */}

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

          <Link
            to="/shop"
            className="primary-button"
          >
            SHOP NOW
            <span>↗</span>
          </Link>


          <a
            href="#featured"
            className="secondary-button"
          >
            EXPLORE
          </a>

        </div>

      </div>


      {/* PRODUCT */}

      <div
        className="hero-visual"
      >

        <div className="floating-circle">

          <span>
            NEW • NEW • NEW • NEW •
          </span>

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


      {/* SCROLL INDICATOR */}

      <div className="scroll-indicator">

        <span>
          SCROLL TO EXPLORE
        </span>

        <div className="scroll-line"></div>

      </div>

    </section>
  );
}

export default Hero;