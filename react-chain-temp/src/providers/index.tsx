import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { UseWalletProvider } from 'use-wallet'

import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from '../theme'
import { store } from '../store/index';

let persistor = persistStore(store);

const Providers: React.FC = ({ children }) => {
  return (
    <StrictMode>
      <Provider store={store}>
        <UseWalletProvider
          chainId={97}
          connectors={{}}
        >
          <PersistGate loading={null} persistor={persistor}>
            <FixedGlobalStyle />
            <ThemeProvider>
              <ThemedGlobalStyle />
              {children}
            </ThemeProvider>
          </PersistGate>
        </UseWalletProvider>
      </Provider>
    </StrictMode>
  )
}

export default Providers