import { Navbar } from '@/components/common';
import AuthProvider from '@/provider/AuthProvider';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
