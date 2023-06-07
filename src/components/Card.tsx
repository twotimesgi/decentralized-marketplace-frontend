import React from 'react';
import Styles from './styles/Card.module.css';
import { convertToUsd, formatBalance, getShortAddress } from '../utils/functions';
import { Listing } from '../utils/entities';


function Card(props: {listing: Listing}) {
    // const { push } = useRouter();

  return (
    <div className={Styles.borderContainer}>
  <div className={Styles.innerContainer}>
    <div className={Styles.imageContainer}>
    {/* TODO: ADD IMAGE HERE */}
    </div>
    <div className={Styles.infoContainer}>
        {/* <h4 onClick={() => {push(`/listing/${props.listing.id}`)}>{props.listing.title}}</h4> */}
        <h4 onClick={() => {}}>{props.listing.title}</h4>
        <span>{`${formatBalance(props.listing.price)} VENOM (${convertToUsd(props.listing.price)} USD)` }</span>
        <span>{`${getShortAddress(props.listing.seller)}`}</span>
        </div>
  </div>
</div>
  );
}
  
export default Card;