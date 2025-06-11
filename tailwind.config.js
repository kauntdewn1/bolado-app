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
    'fixed', 'inset-0', 'bg-black/50', 'flex', 'items-center', 'justify-center', 'z-50',
    'bg-white', 'p-6', 'rounded-2xl', 'shadow-xl', 'max-w-md', 'w-full',
    'text-xl', 'font-semibold', 'mb-4', 'space-y-4',
    'w-full', 'px-4', 'py-2', 'rounded', 'border', 'border-gray-300',
    'focus:outline-none', 'focus:ring-2', 'focus:ring-yellow-400',
    'flex', 'justify-end', 'gap-2',
    'bg-gray-300', 'hover:bg-gray-400',
    'bg-yellow-400', 'hover:bg-yellow-300', 'font-bold'
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
