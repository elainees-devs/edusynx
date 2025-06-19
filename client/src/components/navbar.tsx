// src/components/navbar.tsx
import React from "react";
import { NAV_LINKS } from "../constants";

const NavBar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-[1000]">
      <nav className="flex justify-between items-center max-w-[1200px] mx-auto px-5 py-5">
        <a href="#" className="text-[1.8rem] font-bold text-primary">
          Edu<span className="text-secondary">synx</span>
        </a>
        <ul className="flex list-none">
  {NAV_LINKS.map((link) => (
    <li key={link.href} className="ml-8">
      <a
        href={link.href}
        className={`font-semibold transition-colors duration-300 px-4 py-2 rounded ${
          link.label === "SignUp"
            ? "bg-primary text-white hover:bg-primary/90"
            : "text-dark hover:text-primary"
        }`}
      >
        {link.label}
      </a>
    </li>
  ))}
</ul>

        <button
          className="block text-2xl md:hidden text-dark"
          aria-label="Open mobile menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
