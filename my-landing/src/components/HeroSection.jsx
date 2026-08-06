import { useEffect, useState } from "react";
import API from "../api";

export default function HeroSection() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    API.get("/hero")
      .then(res => {
        if (res.data) setHero(res.data);
      })
      .catch(err => console.error("Hero fetch error", err));
  }, []);

  const scrollToSection = (id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!hero) return null;

  return (
    <section
      className="min-h-screen flex items-center justify-center px-6 text-center bg-white"
    >
      <div className="max-w-4xl">

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          {hero.heading}
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          {hero.subheading}
        </p>

        {/* CTA */}
        {hero.ctaText && (
          <button
            onClick={() => scrollToSection(hero.ctaTarget)}
            className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-xl shadow hover:scale-105 transition"
          >
            {hero.ctaText}
          </button>
        )}
      </div>
    </section>
  );
}
