/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B1220",
        surface: "#111827",
        panel: "#020617",
        primary: "#38BDF8",
        primaryHover: "#0EA5E9",
        secondary: "#A78BFA",
        textMain: "#F8FAFC",
        textBody: "#CBD5E1",
        textMuted: "#94A3B8",
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}