import React, { useState } from "react";
import { LokiToken } from "../../../declarations/LokiToken";

function Faucet() {

  const [isDisabled, setDisable] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisable(true);
    // Trigger payOut function from the front end - user trigger
    const result = await LokiToken.payOut();
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
