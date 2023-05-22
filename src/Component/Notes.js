import React, { useContext, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import noteContext from '../context/note/noteContext';
import AddNotes from './AddNotes';
import NotesItem from './NotesItem';
import alertContext from '../context/alert/alertContext';

const Notes = () => {

    let nav = useNavigate();
    
    // using context 
  const alertcontext = useContext(alertContext);
  const {showAlert} = alertcontext;

    // using context 
    const context = useContext(noteContext);
    const { notes, getNote,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            
            getNote();
            // eslint-disable-next-line
        }
        else{
            nav("/login");
        }
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note,setNote] = useState({id:"",etitle:"", edesc:""});

    const update = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle : currentNote.title , edesc : currentNote.desc });
    }
    // edit a note function
    const handleClick = (e) => {
        e.preventDefault()
        editNote(note.id,note.etitle, note.edesc);
        refClose.current.click();
        showAlert("Note updated","info");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNotes />
            {/* modal */}
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit your Notes</h5>
                            <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" name='etitle' id="etitle" value={note.etitle} placeholder="Enter Title " onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label">Description</label>
                                <textarea className="form-control" id="edesc" rows="2" name='edesc' value={note.edesc} onChange={onChange}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-3  ">
                <div className="row">
                    <div className="col">
                    <h2>Your Notes</h2>
                    {notes.length===0 && 'No Notes To Display'}
                        {notes.map((note) => {
                            return <NotesItem key={note._id} update={update} note={note} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes
