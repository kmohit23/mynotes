import React, {  useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context=useContext(noteContext);
    const{addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const submitClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }
    const onInput=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3">

      <h1>My Notes</h1>

      <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"  onChange={onInput} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onInput} />
                </div>

                <div className='my-3'>
                    <button type="submit" className="btn btn-primary" onClick={submitClick}>Submit</button>
                </div>
        </form>

    </div>

  )
}

export default AddNote
