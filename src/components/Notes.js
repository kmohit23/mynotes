import React, { useEffect } from 'react'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NotesItem from './NotesItem';

const Notes = () => {
    const context=useContext(noteContext);
    let navigate=useNavigate()
    const{notes,fetchnotes}=context;
    // console.log(notes)
    useEffect(()=>{
      if(localStorage.getItem('token')){
        fetchnotes()             
      }
      else{
        navigate('/login')
      }
      // eslint-disable-next-line
    },[])

  return (
    <>
      <AddNote/>
      <div className="row  my-3">
        <h1>Your Notes</h1>
        {notes.map((note)=>{
          return <NotesItem key={note._id} note={note}/>;
        })}
      </div> 
    </>
  )
}

export default Notes
