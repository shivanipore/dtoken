import React from "react";
import {Principal} from "@dfinity/principal";
import {dtoken} from "../../../declarations/dtoken";
import {AuthClient}  from "@dfinity/auth-client";
import {createActor,dtoken,canisterId} from "../../../declarations/dtoken";

function Transfer() {

  const [recipientId,setId] = React.useState("");
  const [amount,setamount] = React.useState("");
  const [isDisabled,setDisabled]=React.useState(false);
  const [feedback , setFeedback]= React.useState("");
  
  async function handleClick() {
    setDisabled(true);
    const authClient =await AuthClient.create();
    const identity=await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions:{
        identity,
      },
    });
    const result=await authenticatedCanister.transfer(Principal.fromText(recipientId),Number(amount));
    setFeedback(result);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value ={recipientId}
                onChange={(e)=>setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>setamount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick}
          disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
