// src/shared/layout/footer.tsx
import { quickLinks, resourcesLinks } from "../../constants/";

const Footer = () => {
  return (
    <footer className="px-4 py-12 bg-dark">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 */}
          <div>
            <h4
              className="text-white mb-4 text-lg font-semibold inline-block relative
             after:absolute after:left-0 after:bottom-0 after:translate-y-[2px]
             after:w-full after:h-[2px] after:bg-secondary after:content-['']"
            >
              Edusynx
            </h4>

            <p className="text-gray">
              Modern Administrative & Financial Efficiency for Schools
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4
              className="text-white mb-4 text-lg font-semibold inline-block relative
             after:absolute after:left-0 after:bottom-0 after:translate-y-[2px]
             after:w-full after:h-[2px] after:bg-secondary after:content-['']"
            >
              Quick Links
            </h4>

            <ul className="space-y-2 list-none">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="transition-colors duration-300 text-gray hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h4
              className="text-white mb-4 text-lg font-semibold inline-block relative
             after:absolute after:left-0 after:bottom-0 after:translate-y-[2px]
             after:w-full after:h-[2px] after:bg-secondary after:content-['']"
            >
              Resources
            </h4>

            <ul className="space-y-2 list-none">
              {resourcesLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="transition-colors duration-300 text-gray hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-sm text-center border-t border-white/10 text-gray">
          &copy; 2024 Edusynx | Smart School Management System
        </div>
      </div>
    </footer>
  );
};
export default Footer;
