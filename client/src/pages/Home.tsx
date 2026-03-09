// client/src/pages/Home.tsx
import { Benefits, Hero, HowItWorks,  KeyFeatures,  NavBar,  PricingSection } from "../components";
import Footer from "../shared/layout/Footer";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <KeyFeatures />
      <Benefits />
      <HowItWorks />
      <PricingSection />
      <Footer />
    </>
  );
};

export default HomePage;
