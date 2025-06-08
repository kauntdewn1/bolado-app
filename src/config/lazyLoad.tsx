import * as React from 'react';
import LoadingFallback from '../components/LoadingFallback';

// Componentes que serão carregados sob demanda
export const lazyLoad = {
  Gallery: React.lazy(() => import('../components/Gallery')),
  PreSale: React.lazy(() => import('../components/PreSale')),
  Footer: React.lazy(() => import('../components/Footer')),
  CallToAction: React.lazy(() => import('../components/CallToAction')),
};

export const withLoading = (Component: React.ComponentType<any>) => {
  return function WithLoading(props: any) {
    return (
      <React.Suspense fallback={<LoadingFallback />}>
        <Component {...props} />
      </React.Suspense>
    );
  };
};

export { LoadingFallback }; 