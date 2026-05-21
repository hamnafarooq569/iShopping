"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ToolbarBottom from "../headers/ToolbarBottom";
import ScrollTop from "../common/ScrollTop";

import { footerLinks, socialLinks } from "@/data/footerLinks";
import { useSiteSettings } from "@/app/hooks/useSiteSettings";

import Skeleton from "react-loading-skeleton";
import { useSubscribe } from "@/app/hooks/useForms";

export default function Footer1({
  border = true,
  dark = false,
  hasPaddingBottom = false,
}) {
  const pathname = usePathname();

  const [success, setSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [emailError, setEmailError] = useState("");

  const { mutate, isPending } = useSubscribe();
  const { isLoading, data } = useSiteSettings();


  useEffect(() => {
    setEmailError("");
    setShowMessage(false);
    setSuccess(false);
  }, [pathname]);

  const handleShowMessage = () => {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();

    if (!email) {
      setEmailError("Email is required");
      setShowMessage(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      setSuccess(false);
      handleShowMessage();
      setShowMessage(true);
      return;
    }

    setEmailError("");

    const payload = { email };

    mutate(payload, {
      onSuccess: () => {
        setSuccess(true);
        handleShowMessage();
        e.target.reset();
      },

      onError: () => {
        setSuccess(false);
        handleShowMessage();
      },
    });
  };

  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []);

  return (
    <>
      <footer
        id="footer"
        className={`footer ${dark ? "bg-main" : ""} ${
          hasPaddingBottom ? "has-pb" : ""
        }`}
      >
        <div className={`footer-wrap ${!border ? "border-0" : ""}`}>
          <div className="footer-body">
            <div className="container">
              <div className="row">

                {/* LEFT */}
                <div className="col-lg-4">
                  {isLoading ? (
                    <div>
                      <Skeleton baseColor="gray" width={100} height={30} />
                    </div>
                  ) : data ? (
                    <div className="footer-infor">

                      <div className="footer-logo">
                        <Link href={`/`}>
                          <Image
                            alt="footer-logo"
                            src={`${data.logo_light}`}
                            width={127}
                            height={24}
                            style={{ width: "160px", height: "160px" }}
                          />
                        </Link>
                      </div>

                      <div className="footer-address">
                        <p>{data.address}</p>

                        <a
                          href="https://www.google.com/maps?cid=9640393341422900353&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=US&source=embed"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`tf-btn-default fw-6 ${
                            dark ? "style-white" : ""
                          }`}
                        >
                          GET DIRECTION
                          <i className="icon-arrowUpRight" />
                        </a>
                      </div>

                      <ul className="footer-info">
                        <li>
                          <i className="icon-mail" />

                          <a
                            className="text-gray"
                            href={`mailto:${data.email}`}
                          >
                            {data.email}
                          </a>
                        </li>

                        <li>
                          <i className="icon-phone" />

                          <a href={`tel:${data.phone}`}>
                            {data.phone}
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <p>Error loading footer data</p>
                  )}
                </div>

                {/* MIDDLE */}
                <div className="col-lg-4">
                  <div className="footer-menu">
                    {footerLinks.map((section, sectionIndex) => (
                      <div className="footer-col-block" key={sectionIndex}>

                        <div className="footer-heading text-button footer-heading-mobile">
                          {section.heading}
                        </div>

                        <div className="tf-collapse-content">
                          <ul className="footer-menu-list">

                            {section.items.map((item, itemIndex) => (
                              <li
                                className="text-caption-1"
                                key={itemIndex}
                              >
                                {item.isLink ? (
                                  <Link
                                    href={item.href}
                                    className="footer-menu_item"
                                  >
                                    {item.label}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.href}
                                    className="footer-menu_item"
                                  >
                                    {item.label}
                                  </a>
                                )}
                              </li>
                            ))}

                          </ul>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                {/* NEWSLETTER */}
                <div className="col-lg-4">
                  <div className="footer-col-block">

                    <div className="footer-heading text-button footer-heading-mobile">
                      Newsletter
                    </div>

                    <div className="tf-collapse-content">

                      <div className="footer-newsletter">

                        <p className="text-caption-1">
                          Sign up for our newsletter to get our updates!
                        </p>

                        {/* MESSAGE AREA */}
                        <div
                          className={`tfSubscribeMsg footer-sub-element ${
                            showMessage ? "active" : ""
                          }`}
                        >

                          {/* VALIDATION ERROR */}
                          {showMessage && emailError && (
                            <p
                              style={{
                                color: "red",
                                marginBottom: "8px",
                              }}
                            >
                              {emailError}
                            </p>
                          )}

                          {/* SUCCESS MESSAGE */}
                          {showMessage && success && (
                            <p
                              style={{
                                color: "rgb(52, 168, 83)",
                              }}
                            >
                              You have successfully subscribed.
                            </p>
                          )}

                        </div>

                        <form
                          onSubmit={sendEmail}
                          className={`form-newsletter subscribe-form ${
                            dark ? "style-black" : ""
                          }`}
                        >

                          <div className="subscribe-content">

                            <fieldset className="email">
                              <input
                                type="email"
                                name="email"
                                className="subscribe-email"
                                placeholder="Enter your e-mail"
                                tabIndex={0}
                                aria-required="true"
                              />
                            </fieldset>

                            <div className="button-submit">
                              <button
                                className="subscribe-button"
                                type="submit"
                                disabled={isPending}
                              >
                                {isPending ? (
                                  "..."
                                ) : (
                                  <i className="icon icon-arrowUpRight" />
                                )}
                              </button>
                            </div>

                          </div>

                          <div className="subscribe-msg" />

                        </form>

                      </div>
                    </div>

                    {/* SOCIAL LINKS */}
                    <ul
                      className={`tf-social-icon d-flex justify-content-center mt-3 ${
                        dark ? "style-white" : ""
                      }`}
                    >
                      {socialLinks.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className={link.className}
                          >
                            <i className={`icon ${link.iconClass}`} />
                          </a>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="footer-bottom">
            <div className="container">
              <div className="row">

                <div className="col-12">
                  <div className="footer-bottom-wrap">

                    <div className="left d-flex">
                      <p className="text-caption-1">
                        ©{new Date().getFullYear()} Ishop. All Rights Reserved.
                      </p>

                      <p className="text-caption-1">
                        Developed and Maintained by LiveBits
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </footer>

      <ScrollTop hasPaddingBottom={hasPaddingBottom} />
      <ToolbarBottom />
    </>
  );
}