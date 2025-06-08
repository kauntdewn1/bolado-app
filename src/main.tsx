import { createRoot } from 'react-dom/client';
import App from './App';

const el = document.getElementById('root');
if (!el) throw new Error("Root container doesn't exist");

createRoot(el).render(<App />);
