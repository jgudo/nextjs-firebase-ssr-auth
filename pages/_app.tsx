import AuthProvider from '@/provider/AuthProvider';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
