import React, { useState, useEffect } from 'react';
import { useWallet } from 'use-wallet'
import { utils } from 'ethers'
import {balanceDecimal, shortedWalletAccount}  from '../utils/index'

const Account: React.FC = () => {
  const wallet = useWallet()

  useEffect(() => {
    console.log('wallet', wallet)
  }, [wallet])

  return (
    <div style={{ padding: 20 }}>
      <h1>Wallet</h1>
      {wallet.status === 'connected' ? (
        <div>
          <div>Account: {wallet.account}</div>
          <div>Account: {shortedWalletAccount(wallet.account)}</div>
          <div>Balance: {wallet.balance}</div>
          <div>Balance: { utils.formatUnits(wallet.balance, 18) }</div>
          <div>Balance: { balanceDecimal(utils.formatUnits(wallet.balance, 18), 3) }</div>
          <button onClick={() => wallet.reset()}>disconnect</button>
        </div>
      ) : (
        <div>
          Connect:
          <button onClick={() => wallet.connect()}>MetaMask</button>
        </div>
      )}
    </div>
  );
}

export default Account;
