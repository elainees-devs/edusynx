// src/pages/home.tsx
import { Hero, HowItWorks, NavBar, PricingSection } from "../components";
("../components/index");
import Footer from "../shared/layout/footer";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <HowItWorks />
      <PricingSection />
      <Footer />
    </>
  );
};

export default HomePage;
