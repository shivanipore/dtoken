import React from "react";
import {dtoken} from "../../../declarations/dtoken";
import {AuthClient}  from "@dfinity/auth-client";
import {createActor,dtoken,canisterId} from "../../../declarations/dtoken";

function Faucet(props) {

const [isDisabled,setDisable]=React.useState(false);
const [buttonText,setText] = React.useState("Gimme Gimme");

  async function handleClick(event) {
    setDisable(true);
    const authClient =await AuthClient.create();
    const identity=await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions:{
        identity,
      },
    });

    const result = await  authenticatedCanister.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to {props.userPrincipal}</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled ={isDisabled}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
