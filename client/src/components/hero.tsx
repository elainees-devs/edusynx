// src/components/hero.tsx
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="flex items-center min-h-screen hero-section pt-44">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Hero Text */}
          <div className="flex-1 text-center md:pr-12 md:text-left">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
              Streamline School Operations with{" "}
              <span className="text-teal-400">Edusynx</span>
            </h1>
            <p className="max-w-xl mx-auto mb-8 text-lg md:text-xl md:mx-0">
              Automate, Centralize, and Optimize Your School's Management with
              AI-Driven Features
            </p>
            <div className="flex justify-center gap-5 md:justify-start">
              <a
                href="#"
                className="px-6 py-3 font-semibold text-white transition duration-300 bg-teal-600 hover:bg-teal-200 hover:text-gray rounded-xl"
              >
                Get Started
              </a>
              <a
                href="#"
                className="px-6 py-3 font-semibold text-teal-600 transition duration-300 border border-teal-600 hover:bg-teal-600 hover:text-gray rounded-xl"
              >
                Request Demo
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 mt-12 text-center md:mt-0">
            <img
              src="/images/graph.webp"
              alt="Bar Graph Analytics - School Dashboard"
              className="max-w-full rounded-[20px] shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
