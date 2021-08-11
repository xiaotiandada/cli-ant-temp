import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  StandardTokenList,
  StandardTokenProfile,
  tokenListTypeProps,
} from '../typing/TokenList';
import { utils } from 'ethers';
import { currentChainId, ZERO_ADDRESS } from '../constant/index';
// import { useERC20Single } from './useERC20Single';
import { list as UnisaveList } from '../constant/unisave-list@1.1.10'
import { list as UnisaveMatatakiList } from '../constant/unisave-mattataki@1.3.0'

export const TokenListURL = {
  // 'https://unpkg.com/@lychees/default-token-list@1.1.10/build/uniscam-default.tokenlist.json'
  Unisave: UnisaveList,
  // https://unpkg.com/@lychees/matataki-token-list@1.3.0/build/unisave-matataki.tokenlist.json
  MatatakiBsc: UnisaveMatatakiList
}

// token 列表类型 用户用户选择
const tokenListType: tokenListTypeProps[] = [
  {
    logoURI:
      'https://ipfs.io/ipfs/QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir',
    name: 'Unisave Default List',
    key: 'Unisave',
    value: 'unisave',
  },
  {
    logoURI:
      'https://raw.githubusercontent.com/Matataki-io/Matataki-FE/master/assets/img/matataki_logo_small.png',
    name: 'Unisave Matataki List',
    key: 'MatatakiBsc',
    value: 'matataki',
  },
];

export default function useTokenList() {
  // token 列表
  const [tokenList, setTokenList] = useState<StandardTokenProfile[]>([]);
  // token all 信息
  const [tokens, setTokens] = useState<StandardTokenList>(
    {} as StandardTokenList
  );
  const [searchInput, setSearchInput] = useState<string>('');
  // 是否为合约地址
  const isContractAddress = useMemo(() => utils.isAddress(searchInput), [
    searchInput,
  ]);
  // const { tokenProfile } = useERC20Single(isContractAddress ? searchInput : '');
  const { tokenProfile }: any = { tokenProfile: {  } }

  // 请求 token 列表
  const tokenListFetch = useCallback(({ tokens }: { tokens: any }) => {


    const list = (tokens as StandardTokenList).tokens.filter(
      i => Number(i.chainId) === Number(currentChainId)
    );

    setTokenList(list);

    setTokens(tokens);

  }, []);

  // 切换 token 列表
  const toggleTokenList = async (key: 'Unisave' | 'MatatakiBsc') => {
    await tokenListFetch({ tokens: TokenListURL[key] });
  };

  // 设置搜索内容
  const setSearchInputFn = (val: string) => setSearchInput(val);

  // 执行一次 默认获取一次 token 列表
  useEffect(() => {
    tokenListFetch({ tokens: TokenListURL.Unisave });
  }, []);

  // 当前 token 列表，筛选后
  const tokenListCurrent = useMemo(() => {
    if (searchInput === '') {
      return tokenList;
    } else if (isContractAddress) {
      // 如果地址在 列表里面
      const findInList = tokenList.find(
        t => utils.getAddress(t.address) === utils.getAddress(searchInput)
      );
      if (findInList) return [findInList];

      // 如果是 ZERO_ADDRESS
      if (tokenProfile.tokenAddress === ZERO_ADDRESS) return [];

      // other token address
      return [
        {
          chainId: currentChainId,
          address: searchInput,
          logoURI:
            'https://raw.githubusercontent.com/ant-design/ant-design-icons/master/packages/icons-svg/svg/outlined/question-circle.svg',
          name: tokenProfile.name,
          symbol: tokenProfile.symbol,
          decimals: tokenProfile.decimals,
        },
      ] as StandardTokenProfile[];
    } else {
      // name search
      return tokenList.filter(i =>
        i.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
      );
    }
  }, [tokenList, searchInput, tokenProfile, isContractAddress]);

  return {
    tokens,
    tokenListCurrent,
    tokenListType,
    toggleTokenList,
    setSearchInputFn,
    isContractAddress,
  };
}
