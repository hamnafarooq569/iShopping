"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login({ onSubmit, isLoading }) {
  const [passwordType, setPasswordType] = useState("password");
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const formData = {
      email: e.target.email.value.trim(),
      password: e.target.password.value,
    };

    try {
      await onSubmit(formData);

   toast.success("login succesfull")
      // ✅ success only
      router.push("/");

    } catch (err) {
      console.error("Login error:", err);

      const msg = err.message || "Login failed";
      const errorList = msg.includes(",") ? msg.split(",") : [msg];

      setErrors(errorList);
      toast.error(msg);
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap">
          <div className="left">
            <div className="heading">
              <h4>Login</h4>
            </div>

            <form onSubmit={handleSubmit} className="form-login form-has-password">

              {/* ❌ ERRORS */}
              {errors.length > 0 && (
                <div style={{
                  background: "#ffe6e6",
                  color: "#b42318",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "6px"
                }}>
                  <ul style={{ margin: 0, paddingLeft: "18px" }}>
                    {errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <fieldset className="d-flex">
                <input type="email" name="email" placeholder="Email address*" required />
              </fieldset>

              <fieldset className="mt-2 mb-2 d-flex position-relative password-item">
                <input type={passwordType} name="password" placeholder="Password*" required />
                <span className="eye-ball" onClick={() =>
                  setPasswordType(prev => prev === "password" ? "text" : "password")
                }>👁</span>
              </fieldset>

              <div className="button-submit">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>

            </form>
          </div>

          <div className="right">
            <h4>New Customer ?</h4>
            <p>Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</p>
            <Link className="tf-btn btn-fill" href="/register">
            <span className="text text-button">
              Register
            </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}