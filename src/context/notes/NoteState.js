
import { useState } from "react";
import noteContext from "./noteContext";


const NoteState =(props)=>{
  const host="http://localhost:8000";
    const note =[]
    
    const [notes,setNotes] = useState(note);

    // Get a note
    const fetchnotes= async ()=>{
      // Api Call for fetch Note 
      const response = await fetch(`${host}/api/notes/fetchnotes`, {

        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      
        headers: {
        'Content-Type': 'application/json' , // 'Content-Type': 'application/x-www-form-urlencoded',
        'auth-token': localStorage.getItem('token')
      }
    });
      const json= await response.json(); // parses JSON response into native JavaScript objects
      // console.log(json);
      setNotes(json)
    }

    
    // Add a note
      const addNote= async (title ,description , tag)=>{
        // Api Call for ADD Note 
        const response = await fetch(`${host}/api/notes/addnote`, {

          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        
          headers: {
          'Content-Type': 'application/json' , // 'Content-Type': 'application/x-www-form-urlencoded',
          'auth-token': localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
      const json= await response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
      setNotes(notes.concat(json))
      }


    // Delete a note
      const deleteNote=async (id)=>{
        // API Call to delete the note

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
          'Content-Type': 'application/json' , // 'Content-Type': 'application/x-www-form-urlencoded',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json= await response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
      console.log("deleting with id"+id)
      const newNotes= notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
    }
    //   // Edit a note
      
      // const editNote=async (id,title,description,tag)=>{
  
    // Api CAll
  
  //       const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  
  //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
        
  //         headers: {
  //         'Content-Type': 'application/json' , // 'Content-Type': 'application/x-www-form-urlencoded',
  //         'auth-token': localStorage.getItem('token')
  
  //       },
  //       body:JSON.stringify({title,description,tag})
  //     });
  //       // const json= response.json(); // parses JSON response into native JavaScript objects
      
  // // Logic to edit in client
  //       for (let index = 0; index < notes.length; index++) {
  //         const element = notes[index];
  //         if(element._id===id){
  //           element.title=title;
  //           element.description=description;
  //           element.tag=tag;
  //         }
  //       }
  
  //     }
          




    return(
        <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,fetchnotes}}>
            {props.children}
        </noteContext.Provider>
    )
    
    }
export default NoteState;

