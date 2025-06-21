// src/components/pricing-section.tsx
import React, { useState } from "react";
import { pricingPlans } from "../constants/pricingPlans";

const PricingSection: React.FC = () => {
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const PAYBILL_SHORTCODE = "174379"; 

  return (
    <section className="px-4 py-16 bg-gray-50 md:px-12" id="pricing">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="mb-4 text-4xl font-bold">Simple, Transparent Pricing</h2>
        <p className="mb-12 text-gray-600">
          Choose the right plan for your school. Scale as you grow.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.title}
              className={`relative rounded-2xl shadow-md p-8 border ${
                plan.popular
                  ? "border-blue-600 bg-white"
                  : "border-gray-200 bg-gray-100"
              }`}
            >
              {plan.popular && (
                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="mb-2 text-2xl font-bold">{plan.title}</h3>
              <p className="mb-4 text-xl font-semibold text-blue-600">
                {plan.price}/month
              </p>
              <p className="mb-6 text-gray-500">{plan.description}</p>
              <ul className="mb-6 space-y-2 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-500">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2 px-4 rounded-xl font-semibold ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
                onClick={() =>
                  setOpenPopoverIndex(openPopoverIndex === index ? null : index)
                }
              >
                {plan.cta}
              </button>

              {/* Popover with Paybill instructions */}
              {openPopoverIndex === index && (
                <div className="absolute z-50 p-4 mt-2 mb-2 text-sm text-left transform -translate-x-1/2 bg-white border shadow-2xl w-80 rounded-xl top-[10%] left-1/2">
                  <p className="mb-2 font-semibold text-gray-800">
                    Pay via M-Pesa to subscribe to <strong>{plan.title}</strong>
                  </p>
                  <ul className="mb-4 text-sm text-gray-700 list-disc list-inside">
                    <li>Go to M-Pesa on your phone</li>
                    <li>
                      Select <strong>Lipa na M-Pesa</strong>
                    </li>
                    <li>
                      Select <strong>Paybill</strong>
                    </li>
                    <li>
                      Enter Business Number:{" "}
                      <strong>{PAYBILL_SHORTCODE}</strong>
                    </li>
                    <li>
                      Enter Account Number: <strong>{plan.title}</strong>
                    </li>
                    <li>
                      Enter Amount: <strong>{plan.price}</strong>
                    </li>
                    <li>Enter your M-Pesa PIN and confirm</li>
                  </ul>
                  <p className="mb-2 text-sm text-blue-600">
                    Once payment is received, your subscription will be
                    activated.
                  </p>
                  <button
                    className="w-full mt-2 text-xs text-gray-500 underline"
                    onClick={() => setOpenPopoverIndex(null)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
