import Styles from './styles/Nav.module.css';
import navLogo from '../navLogo.svg';
import ConnectWallet from './ConnectWallet';
import VenomConnect from 'venom-connect';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';

function Nav(props: {venomConnect: VenomConnect | undefined, onConnect: (provider: ProviderRpcClient | undefined, address: Address | undefined) => void}) {
    // const router = useRouter();
    return (
    <div className={Styles.nav}>
        <div className={Styles.inner}>
        <div className={Styles.logo}>
            {/* <img onClick={() => router.push("/")}src={navLogo} alt="logyq's logo"/> */}
            <img onClick={() => {}}src={navLogo} alt="logyq's logo"/>

        </div>
        <ConnectWallet venomConnect={props.venomConnect} onConnect={(provider, address) => props.onConnect(provider, address)}/>
        </div>
    </div>
  );
}
export default Nav;