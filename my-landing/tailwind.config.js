/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#08090A',
        bgSecondary: '#0F1114',
        bgElevated: '#161A1F',
        borderColor: 'rgba(255, 255, 255, 0.07)',
        textPrimary: '#F0EDE8',
        textSecondary: '#7A7873',
        accentGold: '#C9922A',
        accentGoldLight: '#E8B84B',
        accentGreen: '#16A869',
        accentRed: '#D94F3D',
        glowGold: 'rgba(201, 146, 42, 0.15)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        heading: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 60px rgba(201, 146, 42, 0.12)',
      }
    },
  },
  plugins: [],
}
