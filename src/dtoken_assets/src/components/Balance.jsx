import React from "react";
import {Principal } from "@dfinity/principal";
import {dtoken} from "../../../declarations/dtoken";
import { tokenToString } from "../../../../node_modules/typescript/lib/typescript";

function Balance() {
  
  const [inputValue,setInput] = React.useState("");
  const [balanceResult,setBalance] =React.useState("");
  const [sym,setSym]= React.useState("");
  const [isHidden, setHidden] = React.useState(true);

  async function handleClick() {
    // console.log("Balance Button Clicked");
    const principal = Principal.fromText(inputValue);
    const balance = await dtoken.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSym(await dtoken.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange = {(e)=>setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden ={isHidden}>This account has a balance of {balanceResult} {sym}</p>
    </div>
  );
}

export default Balance;
