// src/constants/footer-links.ts
type FooterLink = {
  label: string;
  href: string;
};

export const quickLinks: FooterLink[] = [
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Demo", href: "#demo" },
  { label: "Testimonials", href: "#testimonials" },
];

export const resourcesLinks: FooterLink[] = [
  { label: "Documentation", href: "#" },
  { label: "Support", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Privacy Policy", href: "#" },
];
