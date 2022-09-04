import Welcome  "canister:welcome";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Iter "mo:base/Iter";

actor {
    stable var currentValue: Nat = 0;

    public func increment(): async () {
        currentValue += 1;
    };

    public query func getValue(): async Nat {
        currentValue;
    };

    // Get query for hello world
    public query func hello() : async Text {
        return "Hello world from Internet Computer!";
    };
    // Get message for greeting
    public func greet(msg : Text) : async Text {
        return msg;
    };

    public func sayHiFromAnotherCanister() : async Text {
        let hi : Text = await Welcome.greetBack();
        return hi;
    };

    // Remove items from an array
    // Pass an array [Text] and remove items from array a
    let a : [Text] = ["a", "b", "c"];
    public func removeFromArray (y : [Text]) : async [Text] {
         
         let res = Buffer.Buffer<Text>(0);
       
         for( thisItem in a.vals()){
            var add = true;
            label search for(thatItem in y.vals()){
                if(thisItem == thatItem){
                    add := false;
                    break search;
                }; 
            };
            if(add == true){
                res.add(thisItem);
            };
        };
        
        return res.toArray();
    };

    // Add array items to array b without duplication
    // Pass an array [Text] and add items to array a
    let b : [Text] = ["a", "b", "c"];
    public func addArrayItemsToArray (y : [Text]) : async [Text] {
          
         let res = Buffer.Buffer<Text>(0);
         for(i in b.vals()){
            res.add(i);
         };
         for( thisItem in y.vals()){
            var add = true;
            label search for(thatItem in b.vals()){
                if(thisItem == thatItem){
                    add := false;
                    break search;
                }; 
            };
            if(add == true){
                res.add(thisItem);
            };
        };
        
        return res.toArray();
    };
    
    // Filter array
    // Pass an array [Text] to filter from array c
    let c : [Text] = ["a", "b", "c"];
    // Predicate function from filter function
    let f = func (t : Text) : Bool {
         var r = false;
        for(item in c.vals()){
            if(item == t){
                r := true;
            }
        };
        return r;
    };

    public query func filter(y : [Text]) : async [Text] {
        let m = Array.filter<Text>(y , f );
        return m;
    };

    // Triemap 
    stable var _entries : [(Principal, Int)] = [];
    var _triemap = TrieMap.TrieMap<Principal,Int>(Principal.equal, Principal.hash);

    // Add a Principal to Triemap without duplication
    public func addToTriemap(new_principal : Principal) : async Text {
        var msg : Text = "";
        var found : ?Int = _triemap.get(new_principal);
        if(found == null){
            msg := " Not present, added ";
            _triemap.put(new_principal,Time.now());
        }else{
            msg := " This is a duplicate, not added ";
        };
        return msg;
    };

    // Show Triemap as a Vector
    public func showTrieMap() : async [(Principal, Int)] {
        _entries := Iter.toArray(_triemap.entries());
        return _entries;
    };

    // Remove a Principal from TrieMap
    public func removeFromTrieMap(key : Principal) : async ?Int {
        _triemap.remove(key);
    };

    var todoDesc : [Text] = ["Create a Motoko function that returns a list of things to do", 
    "Create a view component with React and show the list", 
    "With React filter the list with any attribute you prefer", 
    "Add functionality to the project to work with Typescript", 
    "Do the project challenge in Typescript"];
    var todoState : [Bool] = [true, true, true, false, false];

    public func loadTodoList (y: Text) : async [Text] {
        let desc = Buffer.Buffer<Text>(0);
        let state = Buffer.Buffer<Bool>(0);

        for(i in todoDesc.vals()){
            desc.add(i);
        };

        for(j in todoState.vals()){
            state.add(j);
        };

        if(y != "") {
            desc.add(y);
            state.add(false);
        };

        let arrayDesc = desc.toArray();
        todoDesc := arrayDesc;

        let arrayState = state.toArray();
        todoState := arrayState;

        return arrayDesc;
    };

    public func loadTodoListState () : async [Bool] {
        return todoState;
    };
};
