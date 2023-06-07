import React, { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';


function Loader(props: {isLoading: boolean}) {
    const override: CSSProperties = {
        display: "block",
        margin: "50px auto",
        borderWidth: 3
      };

  return (
    <ClipLoader
        color={"#34398D"}
        loading={props.isLoading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={override}
      />
  );
}
  
export default Loader;