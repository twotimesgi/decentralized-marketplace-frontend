import { useEffect, useState } from "react";
import Card from "./Card";
import Styles from "./styles/Card.module.css";
import {
  Address,
  ProviderRpcClient,
} from "everscale-inpage-provider";
import { CONTRACT_ADDR } from "../public-env";
import Abi from "../abis/Marketplace.abi.json";
import { VenomConnect } from "venom-connect";
import Loader from "./Loader";
import { Listing } from "../utils/entities";

function CardContainer(props: { venomConnect: VenomConnect | undefined, address?: Address | undefined}) {

    const initProvider = async () => {
        const _provider = await props.venomConnect?.getStandalone("venomwallet");
        setProvider(_provider);
    };

  const [provider, setProvider] = useState<any>(undefined);
  const [listings, setListings] = useState<any[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [showSold, setShowSold] = useState<boolean>(false);

  useEffect(() => {
        if(!provider){
            initProvider();
        }else{
            fetchListings(provider);
        }
  }, [props.venomConnect, provider]);

  const fetchListings = async (
    provider: ProviderRpcClient
  ): Promise<string | undefined> => {
    try {
      setIsLoading(true);
      const contract = new provider.Contract(Abi, new Address(CONTRACT_ADDR));
      const rawListings = (await contract.methods
        .listings({} as never)
        .call()) as any;
      if (!rawListings) return undefined;
      let _listings: any[] = [];
      rawListings["listings"].forEach((listing: any) => {
        listing[1]["id"] = listing[0];
        _listings.push(listing[1]);
      });
      setListings(_listings);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };
  return (
    <div className={Styles.cardContainer}>
      <div className={Styles.inner}>
      {!props.address && !isLoading && <h1 className="w100">Logyq Marketplace</h1>}
        { !props.address && !isLoading && <div className={Styles.searchBar}>
          <input type="text" placeholder="Search title or seller" onChange={(e) => setQuery(e.target.value)}/>
          <label><input type="checkbox" onChange={(e) => setShowSold(e.target.checked)}/> Show sold items</label>
          </div>}
        {props.address && !isLoading && <h1 className="w100">Your listings</h1>}
        <Loader isLoading={isLoading} />
        {listings?.filter((listing) => !listing.sold).length == 0 && !isLoading && (
            <div className="center">There are no listings.</div>
        )}
        {listings &&
          !isLoading &&
          listings.length > 0 &&
          listings.filter((listing : Listing) => {
            if(props.address){
                return listing.seller.toString().toLowerCase() == props.address.toString().toLowerCase();
            }
            if(showSold){
                return listing.title.toLowerCase().includes(query.toLowerCase()) || listing.seller.toString().toLowerCase().includes(query.toLowerCase());
            }else{
                return !listing.sold && (listing.title.toLowerCase().includes(query.toLowerCase()) || listing.seller.toString().toLowerCase().includes(query.toLowerCase()));
            }
          }).length == 0 && (
          <div className="center">There are no listings with this criteria.</div>
          )}
        {listings &&
          !isLoading &&
          listings.filter((listing : Listing) => {
            if(props.address){
                return listing.seller.toString().toLowerCase() == props.address.toString().toLowerCase();
            }
            if(showSold){
                return listing.title.toLowerCase().includes(query.toLowerCase()) || listing.seller.toString().toLowerCase().includes(query.toLowerCase());
            }else{
                return !listing.sold && (listing.title.toLowerCase().includes(query.toLowerCase()) || listing.seller.toString().toLowerCase().includes(query.toLowerCase()));
            }
          }).map((listing: Listing) => (
            <Card key={listing.id} listing={listing} />
          ))}
      </div>
    </div>
  );
}
export default CardContainer;
