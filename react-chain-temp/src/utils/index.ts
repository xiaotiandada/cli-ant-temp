/**
 * 短钱包账号
 * @param account
 * @returns
 */
export const shortedWalletAccount = (account: string | null) => {
  if (!account) return '';
  return account.slice(0, 6) + '...' + account.slice(-4);
};



/**
 * 余额小数处理
 * @param amount
 * @param decimal
 * @returns
 */
export const balanceDecimal = (amount: string, decimal: number) => {
  // utils.formatUnits 是 0.0
  if (amount === '0.0') return '0';

  let point = amount.indexOf('.');
  if (~point) {
    return amount.slice(0, point + 1 + decimal);
  }
  return amount;
};
