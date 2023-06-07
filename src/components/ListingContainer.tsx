import { useEffect, useState } from "react";
import Styles from "./styles/Listing.module.css";
import {
  Address,
  ProviderRpcClient,
} from "everscale-inpage-provider";
import { CONTRACT_ADDR, EXPLORER } from "../public-env";
import Abi from "../abis/Marketplace.abi.json";
import { VenomConnect } from 'venom-connect';
import "react-loading-skeleton/dist/skeleton.css";
import OffersTable from "./OffersTable";
import "react-tooltip/dist/react-tooltip.css";
import { formatBalance, getShortAddress } from "../utils/functions";
import BiddingContainer from "./BiddingContainer";
import { Listing } from "../utils/entities";

function ListingContainer(props: {
  venomConnect: VenomConnect | undefined;
  userProvider: ProviderRpcClient | undefined;
  userAddress: Address | undefined;
  id: string | string[];
}) {

  const initProvider = async () => {
    const _provider = await props.venomConnect?.getStandalone("venomwallet");
    setProvider(_provider);
  };

  const [provider, setProvider] = useState<any>(undefined);
  const [listing, setListing] = useState<Listing | undefined>(undefined);
  const [offers, setOffers] = useState<any[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    if (!provider) {
      initProvider();
    } else {
      fetchListing(provider);
      fetchOffers(provider);
    }
  }, [props.venomConnect, provider]);

  
  const fetchListing = async (
    provider: ProviderRpcClient
  ): Promise<string | undefined> => {
    try {
      setIsLoading(true);
      const contract = new provider.Contract(Abi, new Address(CONTRACT_ADDR));
      const _listing = (await contract.methods
        .getListing({ _listingId: props.id } as never)
        .call()) as any;
      if (!_listing) return undefined;
      setListing(_listing);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  const fetchOffers = async (
    provider: ProviderRpcClient
  ): Promise<string | undefined> => {
    try {
      setIsLoading(true);
      const contract = new provider.Contract(Abi, new Address(CONTRACT_ADDR));
      const rawOffers = (await contract.methods
        .getListingOffers({ _listingId: props.id } as never)
        .call()) as any;
      if (!rawOffers) return undefined;
      let _offers: any[] = [];
      rawOffers["offers"].filter((offer: any) => offer[1]['status'] == "0").forEach((offer: any) => {
        offer[1]["id"] = offer[0];
        _offers.push(offer[1]);
      });

      console.log(_offers);
      setOffers(_offers);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };


  if (listing && offers && !isLoading) {
    return (
      <div className={Styles.listingContainer}>
        <div className={Styles.left}>
          <div className={Styles.card}>
            <div className={Styles.imgBox}>{/* TODO: Add image here */}</div>
            <div className={Styles.infoBox}>
              <h2>{listing.title}</h2>
              <div>{formatBalance(listing.price)} VENOM</div>
                <div>Owned by <a href={`${EXPLORER}/accounts/${listing.seller.toString()}`}>{getShortAddress(listing.seller, 7,7)}</a></div>
              <div>This listing received {listing.offersCounter} {parseInt(listing.offersCounter) !== 1 ? "offers" : "offer"}</div>
            </div>
            <div className={Styles.descBox}>
              <h3>Description</h3>
              <p>{listing.description}</p>
            </div>
          </div>
          { listing.seller !== props.userAddress && <BiddingContainer listing={listing} isClosed={listing.sold} userProvider={props.userProvider} listingId={props.id as string} address={props.userAddress}/>}
          </div>
        <div className={Styles.right}>
          <OffersTable address={props.userAddress} userProvider={props.userProvider} listingId={props.id as string} isSeller={true} offers={offers} />
        </div>
      </div>
    );
  } else {
    return <></>
    }
}
export default ListingContainer;
