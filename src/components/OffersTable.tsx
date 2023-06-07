import React from "react";
import Styles from "./styles/OffersTable.module.css";
import {
  convertToUsd,
  formatBalance,
  getShortAddress,
  getValueForSend,
} from "../utils/functions";
import {  Offer } from "../utils/entities";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { EXPLORER } from "../public-env";
import Loader from "./Loader";
import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import Abi from "../abis/Marketplace.abi.json";


import { CONTRACT_ADDR } from "../public-env";
import toast, { Toaster } from "react-hot-toast";
function OfferTable(props: {
  address?: Address;
  offers?: Offer[];
  isSeller: boolean;
  listingId: string | undefined;
  userProvider: ProviderRpcClient | undefined;
}) {
    
  const acceptOffer = async (
    _offerId: number
  ) => {
    const toastId = toast.loading('Accepting offer...'); 
    try {
        if(!props.userProvider || !props.listingId == undefined || !_offerId == undefined|| !props.address) return;
        const contract = new props.userProvider!.Contract(Abi, new Address(CONTRACT_ADDR));    
        const result = await contract.methods
          .acceptOffer({
            _listingId: props.listingId,
            _offerId: _offerId,
          } as never)
          .send({ from: props.address, amount: getValueForSend(1), bounce: true });


        if (result?.id?.lt && result?.endStatus === 'active') {
            toast.dismiss(toastId);
            toast.success("Offer accepted.");
        }else{
            toast.dismiss(toastId);
            toast.error("Offer not accepted. Try again.");

        }
      } catch (e : any) {
        toast.dismiss(toastId);
        toast.error(e.message);
    }
}

const declineOffer = async (
    _offerId: number
  ) => {
    const toastId = toast.loading('Declining offer...'); 
    try {
        console.log("userProvider", props.userProvider)
        console.log("listingId", props.listingId)
        console.log("_offerId", _offerId)
        console.log("address", props.address)
        if(!props.userProvider || !props.listingId == undefined || !_offerId == undefined|| !props.address) return;
        const contract = new props.userProvider!.Contract(Abi, new Address(CONTRACT_ADDR));     
        const result = await contract.methods
          .acceptOffer({
            _listingId: props.listingId,
            _offerId: _offerId,
          } as never)
          .send({ from: props.address, amount: getValueForSend(1), bounce: true });
        if (result?.id?.lt && result?.endStatus === 'active') {
            toast.dismiss(toastId);

            toast.success("Offer declined.");
        }else{
            toast.dismiss(toastId);

            toast.error("Offer not declined. Try again.");
        }
      } catch (e : any) {
        toast.dismiss(toastId);
        toast.error(e.message);
    }
}

  if (props.offers) {
    return (
      <>
      <Toaster/>
        <table className={Styles.rwdTable}>
          <thead>
            <tr>
              <th>Bidder</th>
              <th>Amount</th>
              {props.isSeller && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {props.offers.map((offer) => (
              
                <tr key={offer.id} >
                  <td data-th="Bidder">
                    <a
                      target="_blank"
                      href={`${EXPLORER}/accounts/${offer.buyer.toString()}`} rel="noreferrer"
                    >
                      {getShortAddress(offer.buyer)}
                    </a>
                  </td>
                  <td data-th="Amount">
                    <span
                      data-tooltip-content={`~${convertToUsd(
                        offer.amount
                      )} USD`}
                      data-tooltip-id={"amount-tooltip"}
                    >{`${formatBalance(offer.amount)} VENOM`}</span>
                  </td>
                  {props.isSeller && (
                    <td>
                      <button
                        onClick={() =>
                          acceptOffer(Number(offer.id!))
                        }
                        className={Styles.green}
                      >
                        Accept
                      </button>{" "}
                      <button className={Styles.red} onClick={() =>
                         declineOffer(Number(offer.id!))
                        }>Decline</button>
                    </td>
                  )}
                </tr>
            ))}
          </tbody>
        </table>
        <ReactTooltip id={"amount-tooltip"} place="bottom" />
        {props.offers.length == 0 && (
          <div className={Styles.noOffers}>
This listing has no pending bids.
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <table className={Styles.rwdTable}>
          <thead>
            <tr>
              <th>Bidder</th>
              <th>Amount</th>
              {props.isSeller && <th>Actions</th>}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <Loader isLoading={true} />
      </>
    );
  }
}

export default OfferTable;
