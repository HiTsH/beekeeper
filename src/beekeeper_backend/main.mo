import List "mo:base/List";
import Debug "mo:base/Debug";

actor Beekeeper {
  // declare data type 'Note'
  public type Note = {
    title : Text;
    content : Text;
  };

  // create var note which is a list of datatype "Note" and keep it stable
  //regardless of redeploy
  stable var notes : List.List<Note> = List.nil<Note>();

  //publick function to create notes
  public func createNote(titleText : Text, contentText : Text) {
    let newNote : Note = {
      title = titleText;
      content = contentText;
    };

    // push method adds to index 0
    notes := List.push(newNote, notes);
    //Debug.print(debug_show (notes));

  };

  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  public func removeNote(id : Nat) {
    //take drop append
    let listFront = List.take(notes, id);
    let listBack = List.drop(notes, id + 1);
    notes := List.append(listFront, listBack);
  };

};
