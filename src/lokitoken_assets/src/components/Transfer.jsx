import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { LokiToken } from "../../../declarations/LokiToken";

function Transfer() {

  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setDisable] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    setHidden(true);
    setDisable(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);
    const result = await LokiToken.transfer(recipient, amountToTransfer);
    setStatusText(result);
    setHidden(false);
    setDisable(false);
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
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
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
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button
            id="btn-transfer"
            onClick={handleClick}
            disabled={isDisabled}
          >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>
          {statusText}
        </p>
      </div>
    </div>
  );
}

export default Transfer;
