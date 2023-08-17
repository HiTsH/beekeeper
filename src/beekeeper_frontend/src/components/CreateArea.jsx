import React, { useState } from "react";
import AddCircleIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';


function CreateArea(props) {

    const [note, setNote] = useState({
      title: '',
      content: ''
    });

    const [isClicked, setClicked] = useState(false);

    function handleChange(event){
      const {name, value} = event.target;
      
      setNote((prevNote)=>{
        return {
          ...prevNote,
          [name]: value
        }
      });
    }

    function submitNote(event){
      event.preventDefault();
      props.onAdd(note);
      setNote({
        title: '',
        content: ''
      })
    }

    function expand(){
      return setClicked(true);
    }


  return (
    <div>
      <form className="create-note">

        {isClicked &&
          <input 
          onChange={handleChange}
          name="title" 
          value={note.title} 
          placeholder="Title" 
        />}

        <textarea  
          onChange={handleChange}
          onClick={expand}
          name="content" 
          value={note.content} 
          placeholder="Take a note..." 
          rows={isClicked ? 3 : 1} 
        />
        <Zoom in={isClicked}>
          <Fab onClick={submitNote}>
            <AddCircleIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;