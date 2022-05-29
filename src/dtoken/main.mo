import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor DToken{
    //owner identity token
    var owner :Principal = Principal.fromText("zvthb-3fz2g-uva2l-iszfw-bzh5x-ljbug-mhkyd-qtaf2-n2ad7-ffebu-6qe");
   //no. of total tokens
    var totalSupply:Nat = 1000000000;
   //name of the token
    var symbol : Text = "VANI";


//expensive data type
private stable var balanceEntries: [(Principal,Nat)] = [];


// A dictionary to store balance and token of a user with id. -> A ledger
   private  var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
   if(balances.size() < 1 ){
            //all tokens given to owner ie yourself
            balances.put(owner,totalSupply);
        };



    public query func balanceOf (who:Principal): async Nat {

        //check using null safe option.
        let balance : Nat = switch (balances.get(who)){
            case null 0;//if null return 0
            case (?result) result;//else return result
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text{

        if (balances.get(msg.caller) == null){
            let amount = 10000;
         let result =  await transfer(msg.caller,amount);
        Debug.print(debug_show(msg.caller));
        return result;
        }
        else{
            return "Already Claimed";
        }
        
    };

    public shared(msg) func transfer(to:Principal,amount:Nat) : async Text{
        let fromBalance = await balanceOf(msg.caller);
        if (fromBalance > amount){
            let newFromBalance :Nat = fromBalance - amount;
            balances.put(msg.caller,newFromBalance);

            let toBalance = await  balanceOf(to);
            let newtToBalance = toBalance + amount;
            balances.put(to, newtToBalance);
            return "Success";
        }
        else{
            return "Insufficient Funds";
        }

    };

    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    
    system func postupgrade(){
        balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(), 1,Principal.equal,Principal.hash);
        if(balances.size() < 1 ){
            //all tokens given to owner ie yourself
            balances.put(owner,totalSupply);
        }
    };
}