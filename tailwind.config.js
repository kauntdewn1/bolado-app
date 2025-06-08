export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'flex',
    'space-x-8',
    'md:flex',
    'md:hidden',
    'hover:text-gray-600',
    'bg-red-500',
    'text-white',
    'text-3xl',
    'p-4',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['FKGrotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
