// src/components/navbar.tsx
import React, { useState } from "react";
import { NAV_LINKS } from "../constants";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-[1000]">
      <nav className="flex justify-between items-center max-w-[1200px] mx-auto px-5 py-5">
        {/* Logo */}
        <a href="#" className="text-[1.8rem] font-bold text-primary">
          Edu<span className="text-secondary">synx</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
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

        {/* Hamburger Toggle (only on small screens) */}
        <button
          className="text-2xl md:hidden text-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu (only shown when open) */}
      {isMenuOpen && (
        <div className="px-5 py-4 bg-white shadow-md md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block font-semibold transition-colors duration-300 px-4 py-2 rounded ${
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
        </div>
      )}
    </header>
  );
};

export default NavBar;
