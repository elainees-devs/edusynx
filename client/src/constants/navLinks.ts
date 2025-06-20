// src/constants/navLinks.ts

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#features", label: "Features" },
  { href: "#benefits", label: "Benefits" },
  { href: "#demo", label: "Demo" },
  { href: "#contact", label: "Contact" },
  { href: "/signup", label: "SignUp" },
  { href: "/signin", label: "SignIn" },
];
