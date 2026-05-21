"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register({ onSubmit, isLoading }) {
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const formData = {
      name: e.target.name?.value.trim(),
      email: e.target.email.value.trim(),
      password: e.target.password.value,
      password_confirmation: e.target.confirmPassword.value,
    };

    // ✅ validation
    if (formData.password !== formData.password_confirmation) {
      return setErrors(["Passwords do not match"]);
    }

    try {
      await onSubmit(formData);

      // ✅ success
      router.push("/login");

    } catch (err) {
      console.error("Register error:", err);

      const msg = err.message || "Something went wrong";

      const errorList = msg.includes(",") ? msg.split(",") : [msg];

      setErrors(errorList);
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap">
          <div className="left">
            <div className="heading">
              <h4>Register</h4>
            </div>

            <form onSubmit={handleSubmit} className="form-login form-has-password">
              <div className="wrap">

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

                <fieldset>
                  <input type="text" name="name" placeholder="Name*" required />
                </fieldset>

                <fieldset>
                  <input type="email" name="email" placeholder="Email address*" required />
                </fieldset>

                <fieldset className="position-relative d-flex password-item">
                  <input type={passwordType} name="password" placeholder="Password*" required />
                  <span className="eye-ball" onClick={() =>
                    setPasswordType(prev => prev === "password" ? "text" : "password")
                  }>👁</span>
                </fieldset>

                <fieldset className="position-relative d-flex password-item">
                  <input type={confirmPasswordType} name="confirmPassword" placeholder="Confirm Password*" required />
                  <span className="eye-ball" onClick={() =>
                    setConfirmPasswordType(prev => prev === "password" ? "text" : "password")
                  }>👁</span>
                </fieldset>

              </div>

              <div className="button-submit">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Register"}
                </button>
              </div>
            </form>
          </div>

          <div className="right">
            <h4>Already have an account?</h4>
            <Link className="tf-btn btn-fill" href="/login">
            <span className="text text-button">
              Login
            </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}