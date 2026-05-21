"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "@/public/css/banner.css"

const slides = [
  {
    id: 1,
    title: "Wear your Style with Comfort",
    image: "https://pngimg.com/uploads/airPods/airPods_PNG1.png",
  },
  {
    id: 2,
    title: "Run Faster, Feel Better",
    image: "https://pngimg.com/uploads/headphones/headphones_PNG7639.png",
  },
  {
    id: 3,
    title: "Step Into the Future",
    image: "https://pngimg.com/uploads/iphone17/iphone17_PNG42.png",
  },
];

export default function AnimatedBanner() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const angle = useMotionValue(Math.PI / 2);

  const radiusX = 240;
  const radiusY = 100;
  const step = (Math.PI * 2) / slides.length;

  const autoPlayRef = useRef(null);

  const goToSlide = (i) => {
    const newIndex = (i + slides.length) % slides.length;
    setIndex(newIndex);

    animate(angle, -newIndex * step - Math.PI / 2, {
      type: "spring",
      stiffness: 70,
      damping: 14,
    });
  };

  useEffect(() => {
    if (isHovered) return;

    autoPlayRef.current = setInterval(() => {
      goToSlide(index + 1);
    }, 6000);

    return () => clearInterval(autoPlayRef.current);
  }, [index, isHovered]);

  return (
    <section
      className="banner-section d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow */}
      <div className="glow-circle"></div>

      {/* Title */}
      <div className="text-white text-center custom-banner-title position-relative z-2">
        <motion.h1
          key={slides[index].id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fw-bold text-white display-5"
        >
          {slides[index].title}
        </motion.h1>
      </div>

      {/* Orbit */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={(e, info) => {
          angle.set(angle.get() + info.delta.x * 0.005);
        }}
        onDragEnd={() => {
          const raw = (-angle.get() - Math.PI / 2) / step;
          const snapped = Math.round(raw);
          goToSlide(snapped);
        }}
        className="orbit-container position-relative d-flex justify-content-center align-items-center"
      >
        <div className="orbit-ring"></div>
        <div className="orbit-ring ring-2"></div>

        {slides.map((slide, i) => {
          const theta = i * step;

          const x = useTransform(angle, (a) =>
            radiusX * Math.cos(a + theta)
          );
          const y = useTransform(angle, (a) =>
            radiusY * Math.sin(a + theta)
          );

          const current = useTransform(
            angle,
            (a) => a + theta + Math.PI / 2
          );

          const scale = useTransform(current, (c) => {
            const d = Math.abs(Math.atan2(Math.sin(c), Math.cos(c)));
            return Math.max(0.6, 1.1 - d);
          });

          const zIndex = useTransform(current, (c) =>
            Math.round(Math.cos(c) * 100)
          );

          const blur = useTransform(current, (c) => {
            const d = Math.abs(Math.atan2(Math.sin(c), Math.cos(c)));
            return `blur(${Math.min(d * 3, 8)}px)`;
          });

          const opacity = useTransform(current, (c) => {
            const d = Math.abs(Math.atan2(Math.sin(c), Math.cos(c)));
            return Math.max(0.4, 1 - d / 2);
          });

          return (
            <motion.div
              key={slide.id}
              style={{ x, y, scale, zIndex }}
              className="position-absolute d-flex justify-content-center align-items-center"
            >
              <motion.img
                src={slide.image}
                style={{ filter: blur, opacity }}
                className={`orbit-img ${
                  i === index ? "active-img" : ""
                }`}
              />
            </motion.div>
          );
        })}

        <div className="orbit-shadow"></div>
      </motion.div>

      {/* Dots */}
      <div className="position-absolute bottom-0 mb-4 d-flex gap-2 z-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`dot ${i === index ? "active-dot" : ""}`}
          ></button>
        ))}
      </div>
    </section>
  );
}