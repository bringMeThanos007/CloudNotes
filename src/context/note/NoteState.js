import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const initialNotes = []  

  const [notes, setNotes] = useState(initialNotes);


  
  // get all note
  const getNote = async () => {
    console.log("getting all new note");
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      // body: JSON.stringify(title,desc) // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  // add a note
  const addNote = async (title, desc) => {
    console.log("adding a new note");
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
            },
      // destructure the stringify methods paramenter
      body: JSON.stringify({"title":title ,"desc":desc}) // body data type must match "Content-Type" header
    });

    // logic to add a note
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  // delete a note
  const deleteNote = async (id) => {
    console.log("delete");
    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
           },
       // body data type must match "Content-Type" header
    });
    const json = response.json();
    console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // edit a note
  const editNote = async (id, title, desc) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({id, title, desc}) // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json)
    // to change in ui
    let newNotes = JSON.parse(JSON.stringify(notes))

    // logic to edit
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].desc = desc;
        break;
      }
      
    }
    setNotes(newNotes);
  }

  // time update method
  // const update =() =>{
  //     setTimeout(() =>{
  //         setState({
  //             "name" : "zyx",
  //             "age":"19"
  //         })
  //     },1000)
  // }    
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote,getNote,editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;