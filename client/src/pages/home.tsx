// src/pages/home.tsx
import { Benefits, Hero, HowItWorks, KeyFetures, NavBar, PricingSection } from "../components";
("../components/index");
import Footer from "../shared/layout/footer";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <KeyFetures />
      <Benefits />
      <HowItWorks />
      <PricingSection />
      <Footer />
    </>
  );
};

export default HomePage;
