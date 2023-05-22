import React, { useContext } from 'react';
import { useState } from 'react';
import noteContext from '../context/note/noteContext';
import alertContext from '../context/alert/alertContext';

const AddNotes = () => {

    // using context 
    const alertcontext = useContext(alertContext);
    const {showAlert} = alertcontext;

  // using context 
  const context = useContext(noteContext);
  const {addNote} = context;

  // after adding fields , it automatically clear the field and put value field in title and desciption
  const [note,setNote] = useState({title:"", desc:""});

  // ADD a note function
  const handleClick=(e)=>{
    e.preventDefault()
     addNote(note.title,note.desc);
     
     setNote({title: "", desc: ""});
      showAlert("Added a new note" , "success");
  }
  const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" name='title' id="title" value={note.title} placeholder="Enter Title " minLength={5} required onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <textarea className="form-control" id="desc" rows="2" value={note.desc} name='desc' minLength={5} required onChange={onChange}></textarea>
        </div>
        {/* validation */}
        <button disabled={note.title.length<5 || note.desc.length<5} type="button" className="btn btn-info" onClick={handleClick}>SUBMIT</button>

      </div>
    </>
  )
}

export default AddNotes;
