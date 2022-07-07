import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Env "Env";

actor Token {
    // Create the Owner, Supply, and Symbol for the token
    var owner : Principal = Principal.fromText(Env.PRINCIPAL_ID);
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "LOKI"; 
    // Create the Ledger data store - saves Id of a canister and the amount of tokens possessed

}