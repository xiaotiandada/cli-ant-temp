import React from 'react';
import { UseWalletProvider } from 'use-wallet';

const Providers: React.FC = ({ children }) => (
  <UseWalletProvider chainId={97}>
    {children}
  </UseWalletProvider>
);

export default Providers;
