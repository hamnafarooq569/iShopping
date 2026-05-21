"use client";
import { slides } from "@/data/singleProductSliders";
import Drift from "drift-zoom";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import React, { useEffect, useRef, useState } from "react";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Slider1({
  images = [],
  activeColor = "gray",
  setActiveColor = () => {},
  firstItem,
  slideItems = slides,
  colorImageMap={},
  selectedImageUrl = null,
  thumbSlidePerView = 6,
  thumbSlidePerViewOnMobile = 6,
}) {
const items = React.useMemo(() => {
  return images.map((img, index) => ({
    id: index + 1,
    src: typeof img === "string" ? img : img.src,
    alt: "product image",
    width: 800,
    height: 800,
    color: typeof img === "object" ? img.color : null,
  }));
}, [images]);

const imageKey = React.useMemo(() => {
  return items.map((item) => item.src).join("|");
}, [items]);

useEffect(() => {
  if (!swiperRef.current) return;
  swiperRef.current.update();
}, [imageKey]);

  useEffect(() => {
    // Function to initialize Drift
    const imageZoom = () => {
      const driftAll = document.querySelectorAll(".tf-image-zoom");
      const pane = document.querySelector(".tf-zoom-main");

      driftAll.forEach((el) => {
        new Drift(el, {
          zoomFactor: 2,
          paneContainer: pane,
          inlinePane: false,
          handleTouch: false,
          hoverBoundingBox: true,
          containInline: true,
        });
      });
    };
    imageZoom();
    const zoomElements = document.querySelectorAll(".tf-image-zoom");

    const handleMouseOver = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.add("zoom-active");
      }
    };

    const handleMouseLeave = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.remove("zoom-active");
      }
    };

    zoomElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Empty dependency array to run only once on mount

  const lightboxRef = useRef(null);
  useEffect(() => {
    // Initialize PhotoSwipeLightbox
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started",
      children: ".item",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    // Store the lightbox instance in the ref for later use
    lightboxRef.current = lightbox;

    // Cleanup: destroy the lightbox when the component unmounts
    return () => {
      lightbox.destroy();
    };
  }, []);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);


  useEffect(() => {
    if (!swiperRef.current) return;

    if (selectedImageUrl) {
      const selectedIndex = items.findIndex((item) => item.src === selectedImageUrl);

      if (selectedIndex !== -1) {
        swiperRef.current.slideTo(selectedIndex);
        setActiveIndex(selectedIndex);
      }

      return;
    }

    if (!activeColor?.id) return;

    const imagesForColor = colorImageMap?.[activeColor.id];

    if (imagesForColor && imagesForColor.length > 0) {
      const firstImage = imagesForColor[0];

      const index = items.findIndex((item) => item.src === firstImage);

      if (index !== -1) {
        swiperRef.current.slideTo(index);
        setActiveIndex(index);
      }
    }
  }, [selectedImageUrl, activeColor?.id, colorImageMap, imageKey]);
  return (
    <div className="thumbs-slider">
      <Swiper
        className="swiper tf-product-media-thumbs other-image-zoom"
        dir="ltr"
        direction="vertical"
        spaceBetween={10}
        slidesPerView={thumbSlidePerView}
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        
        initialSlide={0}
        breakpoints={{
          0: {
            direction: "horizontal",
            slidesPerView: thumbSlidePerViewOnMobile,
          },
          820: {
            direction: "horizontal",
            slidesPerView:
              thumbSlidePerViewOnMobile < 4
                ? thumbSlidePerViewOnMobile + 1
                : thumbSlidePerViewOnMobile,
          },
          920: {
            direction: "horizontal",
            slidesPerView:
              thumbSlidePerViewOnMobile < 4
                ? thumbSlidePerViewOnMobile + 2
                : thumbSlidePerViewOnMobile,
          },
          1020: {
            direction: "horizontal",
            slidesPerView:
              thumbSlidePerViewOnMobile < 4
                ? thumbSlidePerViewOnMobile + 2.5
                : thumbSlidePerViewOnMobile,
          },
          1200: {
            direction: "vertical",
            slidesPerView: thumbSlidePerView,
          },
        }}
      >
          {items.map((slide, index) => (
          <SwiperSlide
            className={`swiper-slide stagger-item ${activeIndex === index ? "active-thumb" : ""}`}
            data-color={slide.color}
            key={index}
          >
            <div
              className="item"
              onClick={() => {
                setActiveIndex(index);
                swiperRef.current?.slideTo(index);
              }}
              style={{
                border: activeIndex === index ? "2px solid #111" : "1px solid transparent",
                borderRadius: "6px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <Image
                className="lazyload"
                data-src={slide.src}
                alt={slide.alt}
                src={slide.src}
                width={slide.width}
                height={slide.height}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        dir="ltr"
        className="swiper tf-product-media-main"
        id="gallery-swiper-started"
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
       onSlideChange={(swiper) => {
  setActiveIndex(swiper.activeIndex);
}}
      >
        {items.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide" data-color="gray">
            <a
              href={slide.src}
              target="_blank"
              className="item"
              data-pswp-width={slide.width}
              data-pswp-height={slide.height}
              //   onClick={() => openLightbox(index)}
            >
              <Image
                className="tf-image-zoom lazyload"
                data-zoom={slide.src}
                data-src={slide.src}
                alt=""
                src={slide.src}
                width={slide.width}
                height={slide.height}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
