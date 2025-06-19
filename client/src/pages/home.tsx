// src/pages/home.tsx
import { Hero, NavBar, PricingSection } from "../components"; "../components/index";
import Footer from "../shared/layout/footer";

const HomePage = () => {
  return (
    <>
    <NavBar />
    <Hero />
    <PricingSection />
    <Footer />
    </>
  );
};

export default HomePage;
