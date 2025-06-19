// src/constants/pricingPlans.ts
export const pricingPlans = [
  {
    title: "Starter",
    price: "KES 2,500",
    description: "Perfect for small schools with up to 100 students.",
    features: [
      "Student & Attendance Management",
      "Manual Invoicing",
      "Basic Reports",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    title: "Professional",
    price: "KES 6,500",
    description: "Best for growing schools with up to 500 students.",
    features: [
      "All Starter Features",
      "M-Pesa Integration",
      "Email & SMS Alerts",
      "Real-Time Dashboards",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For large institutions or school networks.",
    features: [
      "All Pro Features",
      "Multi-Branch Support",
      "Advanced Reporting",
      "Custom API Access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];