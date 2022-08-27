import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const NotesItem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote}=context;
 const {note}=props;
  return (
    <div className='col-md-3'>
        <div className="card my-3" >
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-eraser mx-3" onClick={()=>{deleteNote(note._id)}}> Delete The Note </i>
                {/* <i className="fa-solid fa-pen mx-3"></i>---- this is used for edit option in my notes */}
            </div>
        </div>
    </div>
  )
}

export default NotesItem
