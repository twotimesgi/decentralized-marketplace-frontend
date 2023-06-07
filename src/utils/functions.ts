import { Address } from "everscale-inpage-provider";
import BigNumber from 'bignumber.js';

const formatBalance = (balance: string) => {
    return (parseFloat(balance) /  (10 ** 9)).toFixed(2);
}

const getShortAddress = (address: Address, before : number = 6, after: number = 4) => {
   const _address = address.toString();
    return `${_address.slice(0, before)}...${_address.slice(-after)}`;
  };

  const convertToUsd = (balance: string) => {
    return (parseFloat(balance) /  (10 ** 9) * 4).toFixed(2);
  }

 const getValueForSend = (value: string | number): string => {
    return new BigNumber(value).multipliedBy(10 ** 9).toString();
  };
export { formatBalance, getShortAddress, convertToUsd, getValueForSend };