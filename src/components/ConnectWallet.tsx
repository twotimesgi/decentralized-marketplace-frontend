import { useEffect, useState } from 'react';
import { VenomConnect } from 'venom-connect';
import Styles from './styles/ConnectWallet.module.css';
import {formatBalance, getShortAddress} from '../utils/functions';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';

function ConnectWallet(props: { venomConnect: VenomConnect | undefined, onConnect: (provider: ProviderRpcClient | undefined, address: Address | undefined) => void }) {
  const login = async () => {
    if (!props.venomConnect) return;
    await props.venomConnect.connect();
  };

  const [venomProvider, setVenomProvider] = useState<any>();
  const [address, setAddress] = useState<Address | undefined>();
  const [balance, setBalance] = useState<string | undefined>();
  // This method allows us to gen a wallet address from inpage provider
  
  const getAddress = async (provider: any) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address;
  };

  const getBalance = async (provider: any) => {
    const providerState = await provider?.getProviderState?.();
    const _address : Address = providerState?.permissions.accountInteraction?.address;
    return (await provider?.getBalance?.(_address));
  };

  // Any interaction with venom-wallet (address fetching is included) needs to be authentificated
  const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth){
      await getAddress(_venomConnect);
      await getBalance(_venomConnect);
    }
  };
  // This handler will be called after venomConnect.login() action
  // connect method returns provider to interact with wallet, so we just store it in state
  const onConnect = async (provider: any) => {
    setVenomProvider(provider);
    await onProviderReady(provider);
  };

  useEffect(() => {
    props.onConnect(venomProvider, address);
  }, [venomProvider, address, props]);

    
  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setAddress(undefined);
    setBalance(undefined);
  };
  // When our provider is ready, we need to get address and balance from.
  const onProviderReady = async (provider: any) => {
    const venomWalletAddress = provider ? await getAddress(provider) : undefined;
    setAddress(venomWalletAddress);
    const venomWalletBalance = provider ? await getBalance(provider) : undefined;
    setBalance(venomWalletBalance);
  };

  useEffect(() => {
    // connect event handler
    const off = props.venomConnect?.on('connect', onConnect);
    if (props.venomConnect) {
      checkAuth(props.venomConnect);
    }
    return () => {
      off?.();
    };
  }, [props.venomConnect]);

  return (
    <>
        {!address && <button className={Styles.btn} onClick={login}>
          Connect wallet
        </button>}
        {address && balance && <div className={Styles.walletContainer}>
            <span className={Styles.balance}>{formatBalance(balance)} VENOM</span>
            <span className={Styles.address}>{getShortAddress(address)}</span>
            <button className={Styles.btn} onClick={onDisconnect}>Log out</button>
            </div>
        }
      </>
  );
}
  
export default ConnectWallet;