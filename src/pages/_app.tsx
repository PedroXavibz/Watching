import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '@/store';

import '@/styles/globals.css';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session} >
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </SessionProvider >
);

export default App;
