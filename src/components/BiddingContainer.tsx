import React from "react";
import Styles from "./styles/Listing.module.css";
import {
  formatBalance,
  getValueForSend,
} from "../utils/functions";
import { Listing } from "../utils/entities";
import "react-tooltip/dist/react-tooltip.css";
import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import Abi from "../abis/Marketplace.abi.json";


import { CONTRACT_ADDR } from "../public-env";
import toast, { Toaster } from "react-hot-toast";
function BiddingContainer(props: {
  address?: Address;
  listingId: string | undefined;
  userProvider: ProviderRpcClient | undefined;
  isClosed: boolean;
  listing: Listing;
}) {

    const [amount, setAmount] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    
  const validateInput = () => {
    if(amount === ""){
        setError("Please enter a valid amount.");
        return;
    }
    if(parseFloat(amount) < 0.1){
        //Offer too low should be at least 0.1
        setError("Offer too low. Should be at least 0.1 VENOM");
        return;
  }
  makeOffer(parseFloat(amount));
}

const makeOffer = async (
    _amount: number
     ) => {
    const toastId = toast.loading('Placing bid...');     
    try {
        if(!props.userProvider || !props.listingId == undefined || !props.address) return;
        const contract = new props.userProvider!.Contract(Abi, new Address(CONTRACT_ADDR)); 
        const result = await contract.methods
          .makeOffer({
            _amount: 1,
            _listingId: props.listingId
          } as never)
          .send({ from: props.address, amount: getValueForSend(1), bounce: true });
        if (result?.id?.lt && result?.endStatus === 'active') {
            toast.dismiss(toastId);
            toast.success("Bid placed.");
        }else{
            toast.dismiss(toastId);
            toast.error("Bid not placed. Try again.");
        }
      } catch (e : any) {
        toast.dismiss(toastId);
        toast.error(e.message);
    }
}


if(!props.isClosed){
    return (<>
    <Toaster />
      <div className={Styles.card}>
      <div className={`${Styles.card} ${Styles.noWrap}` }>
        <input
          type="number"
          placeholder="VENOM"
          onChange={(e) => setAmount(e.target.value)}
          className={Styles.input}></input>
          <button className={Styles.btn} onClick={validateInput}>
            Place bid
            </button>
            
            <button className={`${Styles.btn} ${Styles.btnOutlined}`} onClick={() => makeOffer(parseInt(props.listing.price))}>
             Buy now ({formatBalance(props.listing.price)} VENOM)
             </button>
      </div>
      <div className="errorBox center">{error}</div>

      </div>
        </>
    );
    }else{
        return (
            <div className={Styles.card}>
            This listing is closed.
            </div>
        )
    }
}

export default BiddingContainer;
