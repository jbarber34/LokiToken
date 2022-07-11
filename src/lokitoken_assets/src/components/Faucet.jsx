import React, { useState } from "react";
import { LokiToken, canisterId, createActor } from "../../../declarations/LokiToken";
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {

  const [isDisabled, setDisable] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisable(true);
    // Identify the user by their authClient
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    // Create an actor with the users identity
    const authenticatedCanister = createActor(canisterId, {
      // Set options for canister
      agentOptions: {
        identity,
      },
    });

    // Trigger payOut function for the authenticated user
    // const result = await authenticatedCanister.payOut(); // Only use this if deployed on live IC Blockchain
    const result = await LokiToken.payOut(); // For use locally

    setButtonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DLoki tokens here! Claim 10,000 LOKI tokens to your account.</label>
      <p className="trade-buttons">
        <button
          id="btn-payout"
          onClick={handleClick}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
