import { lazy } from 'react';
import LoadingFallback from '../components/LoadingFallback';

// Componentes que serão carregados sob demanda
export const lazyComponents = {
  Gallery: lazy(() => import('../components/Gallery')),
  PreSale: lazy(() => import('../components/PreSale')),
  Footer: lazy(() => import('../components/Footer')),
  CallToAction: lazy(() => import('../components/CallToAction')),
};

export { LoadingFallback }; 