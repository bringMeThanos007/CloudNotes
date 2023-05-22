import React, { useContext} from 'react';
import noteContext from '../context/note/noteContext';
import alertContext from '../context/alert/alertContext';

const NotesItem = (props) => {
    const { note,update } = props;
    const mystyle = {
        cursor: "pointer"
    };

    // using context 
  const alertcontext = useContext(alertContext);
  const {showAlert} = alertcontext;

    // using context 
    const context = useContext(noteContext);
    const { deleteNote } = context;

    
    return (
        <div className="card  ">
            <div className="card-body">
                <div className='d-flex' >
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); showAlert("Note Deleted","info"); }} style={mystyle} ></i>
                    <i className="fa-solid fa-pen-to-square  mx-2" onClick={()=>{update(note); }} style={mystyle} ></i>
                </div>
                <p className="card-text">{note.desc}</p>
            </div>
        </div>
    )
}

export default NotesItem;
