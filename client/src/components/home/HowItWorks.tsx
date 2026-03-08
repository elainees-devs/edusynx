// src/components/how-it-works.tsx
import React from "react";
import { steps } from "../../constants";

const HowItWorks: React.FC = () => {
  return (
    <section className="px-4 py-16 bg-white md:px-12" id="how-it-works">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
        <p className="mb-12 text-gray-600">
          Simple steps to get your school running smarter and faster.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="p-6 transition shadow bg-gray-50 rounded-2xl hover:shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default HowItWorks
