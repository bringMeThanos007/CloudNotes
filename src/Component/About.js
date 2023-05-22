
import React,{useContext} from 'react';
import { useEffect } from 'react';
import noteContext from '../context/note/noteContext';

export default function About() {
  // const a = useContext(noteContext);
  // useEffect(()=>{
  //   a.update();
  // },[]);
  return (
    
    <div>
      <div className="container my-3 mx-3">
        <h1> CLoudNotes backend and React frontend setup 
Till now, we have created the frontend of the two applications and have used the API for the backend purpose.
 Now, we would create our own API with the help of the MERN stack. Therefore,
 let’s begin by creating our New React Application named iNotebook.  </h1>
      </div>
    </div>
  )
}
