"use client";
import React, { useRef, useState } from "react";
import { useContact } from "@/app/hooks/useForms";

export default function Contact3() {
  const formRef = useRef();

  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const { mutate, isPending } = useContact();

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    mutate(payload, {
      onSuccess: () => {
        setSuccess(true);
        handleShowMessage();
        formRef.current.reset();
      },
      onError: () => {
        setSuccess(false);
        handleShowMessage();
      },
    });
  };

  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading">Get In Touch</h3>
          <p className="subheading">
            Use the form below to get in touch with the sales team
          </p>
        </div>

        {/* Message */}
        <div
          className={`tfSubscribeMsg footer-sub-element ${
            showMessage ? "active" : ""
          }`}
        >
          {success ? (
            <p style={{ color: "rgb(52, 168, 83)" }}>
              Message Sent Successfully
            </p>
          ) : (
            <p style={{ color: "red" }}>Something went wrong</p>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={sendMail}
          ref={formRef}
          id="contactform"
          className="form-leave-comment"
        >
          <div className="wrap">
            <div className="cols">
              <fieldset>
                <input
                  type="text"
                  placeholder="Your Name*"
                  name="name"
                  required
                />
              </fieldset>

              <fieldset>
                <input
                  type="email"
                  placeholder="Your Email*"
                  name="email"
                  required
                />
              </fieldset>
            </div>

            <fieldset>
              <textarea
                name="message"
                rows={4}
                placeholder="Your Message*"
                required
              />
            </fieldset>
          </div>

          <div className="button-submit send-wrap">
            <button
              className="tf-btn btn-fill"
              type="submit"
              disabled={isPending}
            >
              <span className="text text-button">
                {isPending ? "Sending..." : "Send message"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}