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
    }

};