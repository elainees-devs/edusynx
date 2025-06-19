// src/components/benefits.tsx
import React from "react";
import { benefits } from "../constants";

const Benefits: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50" id="benefits">
      <div className="max-w-6xl px-4 mx-auto text-center">
        <h2 className="mb-12 text-3xl font-bold md:text-4xl">
          Who Benefits from Edusynx?
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 transition-shadow bg-white rounded-lg shadow hover:shadow-lg"
            >
              <h4 className="mb-2 text-xl font-semibold text-primary">
                {benefit.title}
              </h4>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
