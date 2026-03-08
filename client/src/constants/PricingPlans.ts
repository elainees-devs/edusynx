export const pricingPlans = [
  {
    title: "Starter",
    price: "KES 2,500",
    description: "Perfect for small schools with up to 100 students.",
    cta: "Start Free Trial",
    popular: false,
    featureGroups: [
      {
        group: "Student & Attendance",
        features: [
          "Student Management",
          "Attendance Tracking"
        ]
      },
      {
        group: "Finance",
        features: [
          "Manual Invoicing",
          "Basic Reports"
        ]
      }
    ]
  },
  {
    title: "Professional",
    price: "KES 6,500",
    description: "Best for growing schools with up to 500 students.",
    cta: "Get Started",
    popular: true,
    featureGroups: [
      {
        group: "All Starter Features",
        features: [
          "Student Management",
          "Attendance Tracking",
          "Manual Invoicing",
          "Basic Reports"
        ]
      },
      {
        group: "Advanced Features",
        features: [
          "M-Pesa Integration",
          "Email & SMS Alerts",
          "Real-Time Dashboards"
        ]
      }
    ]
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For large institutions or school networks.",
    cta: "Contact Sales",
    popular: false,
    featureGroups: [
      {
        group: "All Professional Features",
        features: [
          "Student Management",
          "Attendance Tracking",
          "Manual Invoicing",
          "Basic Reports",
          "M-Pesa Integration",
          "Email & SMS Alerts",
          "Real-Time Dashboards"
        ]
      },
      {
        group: "Enterprise Features",
        features: [
          "Multi-Branch Support",
          "Advanced Reporting",
          "Custom API Access"
        ]
      }
    ]
  }
];
