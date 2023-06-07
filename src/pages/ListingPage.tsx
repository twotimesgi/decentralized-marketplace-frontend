import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import VenomConnect from 'venom-connect';
import { initVenomConnect } from '../venom-connect/configure';
import ListingContainer from '../components/ListingContainer';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";


export async function loader({ params } : LoaderFunctionArgs) {
  const id = (params.listingId);
  return { id };
}

function ListingPage() {
  const  {id}   = useLoaderData() as {id: string};

  
  const onConnect = (provider: ProviderRpcClient | undefined, address: Address | undefined) => {
    setAddress(address);
    setProvider(provider);
  };

  const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>();
  const [provider, setProvider] = useState<any>(undefined);
  const [address, setAddress] = useState<any>(undefined);

  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
  };
  useEffect(() => {
    init();
  }, []);

  if(id){
  return (
    <>
    <Nav onConnect={(provider, address) => onConnect(provider, address)} venomConnect={venomConnect}/>
    <ListingContainer userProvider={provider} userAddress={address} venomConnect={venomConnect} id={id}/>
    </>
  );
  }else{
    return <></>
  }
}
export default ListingPage;