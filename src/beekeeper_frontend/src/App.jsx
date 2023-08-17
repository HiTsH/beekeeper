import React, { useState } from "react";
import Header from './components/Header';
import Note from './components/Note';
import Footer from './components/Footer';
import CreateArea from './components/CreateArea';
import { beekeeper_backend } from "../../declarations/beekeeper_backend/index";

function App(){

    const [notes, setNotes] = useState([]);



    function addNote(newNote){
        setNotes(prevNotes => {
            //create note in the backend
            beekeeper_backend.createNote(newNote.title, newNote.content);
            return [newNote, ...prevNotes]
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    //fetch notes from the backend 
    async function fetchData() {
        const notesArray = await beekeeper_backend.readNotes();
        setNotes(notesArray);
    }

    function deleteNote(id){
        beekeeper_backend.removeNote(id);
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            })
        })
    }

    return (
        <div>
            <Header />
            <CreateArea
                onAdd={addNote}
            />

            {notes.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        id={index}  
                        title={noteItem.title} 
                        content={noteItem.content}
                        onDelete={deleteNote} 
                    />
                )
            })}
            
            <Footer />
        </div>
    );
}



export default App;