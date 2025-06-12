// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1d4ed8',
        secondary: '#f59e0b',
        dark: '#1e293b',
        light: '#f8fafc',
        gray: '#94a3b8',
        success: '#10b981',
      },
    },
  },
  plugins: [],
};
