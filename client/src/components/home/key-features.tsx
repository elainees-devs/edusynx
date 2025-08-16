// src/components/key-features.tsx
import React from "react";
import { keyFeatures } from "../../constants";


interface FeatureSection {
  title: string;
  features: string[];
}

const KeyFeatures: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50" id="key-features">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
          Key Features
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {keyFeatures.map((section: FeatureSection, index: number) => (
            <div
              key={index}
              className="p-6 transition bg-white shadow-md rounded-xl hover:shadow-lg"
            >
              <h3 className="mb-4 text-xl font-semibold">{section.title}</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {section.features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
