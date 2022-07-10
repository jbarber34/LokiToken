import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Env "Env";
import HashMap "mo:base/HashMap";

actor Token {
    // Create the Owner, Supply, and Symbol for the token
    var owner : Principal = Principal.fromText(Env.PRINCIPAL_ID);
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "LOKI"; 

    // Create the Ledger data store - saves Id of a canister and the amount of tokens possessed
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash); 

    // Add owner to ledger as first entry
    balances.put(owner, totalSupply);

    // Create a check balance method
    public query func balanceOf(who: Principal) : async Nat {

        // Switch statement to avoid a ?Nat type if the user has a balance, if not, return 0, if so, return the balance
        let balance : Nat = switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };
        
        return balance; 
    };

    // Get token symbol to display on frontend
    public query func getSymbol() : async Text {
        return symbol;
    };

    // Free 10,000 tokens //
    // Create faucet function to payout tokens to the user
    public shared(msg) func payOut() : async Text {
        // Debug.print(debug_show(msg.caller));
        // Check to see if user has already claimed free tokens
        if(balances.get(msg.caller) == null){
            let amount = 10000; // Set amount of free tokens
            // Transfer funds from the canister supply to the user claiming the tokens
            let result = await transfer(msg.caller, amount);
            return result;
        } else{
            return "Already Claimed";
        }
        
    };

    // Transfer Tokens //
    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
        let fromBalance = await balanceOf(msg.caller);
        // Check to ensure the user balance is great then the amount being transfered
        if(fromBalance > amount){
            let newFromBalance : Nat = fromBalance - amount; // Needs ': Nat' to let Motoko know the value cannot go below 0
            // Update the transfer user to reflect new balance
            balances.put(msg.caller, newFromBalance);
            // Find balance of the receiving user and update their balance post-transfer
            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);

            return "Success";
        } else {
            return "Insufficient Funds"
        }
    }
};