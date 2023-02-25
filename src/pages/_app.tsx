import type { AppProps } from 'next/app';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import SnackbarProvider from '@/contexts/useSnackbar.context';
import { Provider } from 'react-redux';
import store from '@/store';

import '@/styles/globals.css';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <Provider store={store}>
      <SnackbarProvider>
        <Script
          src="https://www.youtube.com/player_api"
          strategy="lazyOnload"
        />
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  </SessionProvider>
);

export default App;
