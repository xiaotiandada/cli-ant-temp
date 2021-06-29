import React, { useState, useEffect } from 'react';
import { useWallet } from 'use-wallet'
import { utils } from 'ethers'
import {balanceDecimal, shortedWalletAccount}  from '../../utils/index'
import TokenListSelect from '../../components/TokenListSelect/index'
import { StandardTokenProfile } from '../../typing/TokenList'

const Account: React.FC = () => {
  const wallet = useWallet()

  useEffect(() => {
    console.log('wallet', wallet)
  }, [wallet])

  const handlerSelectCurrentToken = (token: StandardTokenProfile) => {
    console.log('token', token);
  };

  // modal 显示/隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);

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

          <hr />

          <button onClick={ () => setIsModalVisible(true) }>Select</button>

          <TokenListSelect
          setCurrentToken={handlerSelectCurrentToken}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}></TokenListSelect>
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
