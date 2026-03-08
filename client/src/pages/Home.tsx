// client/src/pages/home.tsx
import { Benefits, Hero, HowItWorks,  KeyFeatures,  NavBar,  PricingSection } from "../components";

import Footer from "../shared/layout/footer";

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
