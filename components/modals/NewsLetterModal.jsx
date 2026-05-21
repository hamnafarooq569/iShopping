"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSubscribe } from "@/app/hooks/useForms";
import { useSiteSettings } from "@/app/hooks/useSiteSettings";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function NewsLetterModal() {
  const pathname = usePathname();
  const modalElement = useRef();



  useEffect(() => {
    const showModal = async () => {
      if (pathname === "/") {
        const bootstrap = await import("bootstrap"); // dynamically import bootstrap
        const myModal = new bootstrap.Modal(
          document.getElementById("newsletterPopup"),
          {
            keyboard: false,
          }
        );

        // Show the modal after a delay using a promise
        await new Promise((resolve) => setTimeout(resolve, 2000));
        myModal.show();

        modalElement.current.addEventListener("hidden.bs.modal", () => {
          myModal.hide();
        });
      }
    };

    showModal();
  }, [pathname]);
    const [success, setSuccess] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const { mutate, isPending } = useSubscribe();
    const {isLoading,data,error} = useSiteSettings();
    const [emailError, setEmailError] = useState("");

    const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendEmail = (e) => {
  e.preventDefault();

  const email = e.target.email.value.trim();

  // REQUIRED VALIDATION
  if (!email) {
    setEmailError("Email is required");
    setSuccess(false);
    handleShowMessage();
    return;
  }

  // EMAIL FORMAT VALIDATION
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(email)) {
    setEmailError("Please enter a valid email address");
    setSuccess(false);
    handleShowMessage();
    return;
  }

  // BLOCK TEMP EMAILS (OPTIONAL)
  const blockedDomains = [
    "tempmail.com",
    "10minutemail.com",
    "mailinator.com",
  ];

  const domain = email.split("@")[1]?.toLowerCase();

  if (blockedDomains.includes(domain)) {
    setEmailError("Temporary email addresses are not allowed");
    setSuccess(false);
    handleShowMessage();
    return;
  }

  // CLEAR ERROR
  setEmailError("");

  const payload = { email };

  mutate(payload, {
    onSuccess: () => {
      setSuccess(true);
      handleShowMessage();
      e.target.reset();
    },

    onError: (error) => {
      setSuccess(false);

      setEmailError(
        error?.message || "Something went wrong"
      );

      handleShowMessage();
    },
  });
};

  return (
    <div
      className="modal modalCentered fade auto-popup modal-newleter"
      id="newsletterPopup"
      ref={modalElement}
    >
      <div className="modal-dialog modal-dialog-centered">
        {isLoading ? (
          <div> <Skeleton width={500}
          height={400}/></div>
        ):data? (
          <div className="modal-content">
          <div className="modal-top">
            <Image
              className="lazyload"
              data-src={data.newsletter_image}
              alt="/images"
              src={data.newsletter_image}
              width={460}
              height={140}
            />
            <span
              className="icon icon-close btn-hide-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-bottom text-center">
            <p className="text-btn-uppercase fw-4 font-2">
              Subscribe To Our Newletter!
            </p>
            <h5>
              {data.newsletter_text}
            </h5>
            <div
              className={`tfSubscribeMsg  footer-sub-element ${
                showMessage ? "active" : ""
              }`}
            >
              {success ? (
                <p style={{ color: "rgb(52, 168, 83)" }}>
                  You have successfully subscribed.
                </p>
              ) : (
                <p style={{ color: "red" }}>Something went wrong</p>
              )}
            </div>
            <form
              id="subscribe-form"
              onSubmit={(e) => {
                e.preventDefault();
                sendEmail(e);
              }}
              className="form-newsletter-subscribe"
            >
              <div id="subscribe-content">
                <input
                  type="email"
                  name="email"
                  id="subscribe-email"
                  placeholder="Enter your e-mail"
                  required
                />
                {isPending ? (
                  <button
                  type="submit"
                  id="subscribe-button"
                  disabled
                  className="btn-style-2 radius-12 w-100 justify-content-center"
                >
                  <span className="text text-btn-uppercase">Sending...</span>
                </button>
                ):(
                  <button
                  type="submit"
                  id="subscribe-button"
                  className="btn-style-2 radius-12 w-100 justify-content-center"
                >
                  <span className="text text-btn-uppercase">SUBSCRIBE</span>
                </button>
                )}
              </div>
              <div id="subscribe-msg" />
            </form>
            <ul className="tf-social-icon style-default justify-content-center">
              <li>
                <a href="#" className="social-facebook">
                  <i className="icon icon-fb" />
                </a>
              </li>
              <li>
                <a href="#" className="social-twiter">
                  <i className="icon icon-x" />
                </a>
              </li>
              <li>
                <a href="#" className="social-instagram">
                  <i className="icon icon-instagram" />
                </a>
              </li>
              <li>
                <a href="#" className="social-pinterest">
                  <i className="icon icon-pinterest" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        ):error}
      </div>
    </div>
  );
}
