import { ReactNode } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';

interface Props {
  Component: React.ComponentType<any>;
  pageProps: any;
}

function App({ Component, pageProps }: Props) {
  return (
    <div className="relative min-h-screen">
      <div 
        className="fixed top-0 left-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/travel-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3,
          zIndex: -1,
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default App;