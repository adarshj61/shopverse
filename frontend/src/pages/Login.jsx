import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Login() {

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {

    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.8,
      }
    );

    tl.fromTo(
      titleRef.current,
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      formRef.current,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );

  }, []);

  return (

    <div className="login-page" ref={containerRef}>

      <div className="login-card">

        <div className="login-left">

          <h1 ref={titleRef}>
            ShopVerse
          </h1>

          <p>
            Everything you love,
            all in one place.
          </p>

        </div>


        <div className="login-right" ref={formRef}>

          <h2>Welcome Back</h2>

          <p>Login to your account</p>

          <form>

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <button type="submit">
              Login
            </button>

          </form>

          <p>
            Don't have an account?{" "}

            <Link to="/register">
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;