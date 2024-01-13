import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const queryClient = new QueryClient();

  const isAuthUrl = router.pathname === '/login' || router.pathname === '/register';

  useEffect(() => {
    if (localStorage.getItem('token') && isAuthUrl) {
      router.replace('/');
    } else if (!localStorage.getItem('token') && !isAuthUrl) {
      router.replace('/login');
    }
  }, [router, isAuthUrl]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
