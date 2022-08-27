import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
// import NoteState from '../context/notes/NoteState'

const About = () => {
    const a=useContext(noteContext)
    useEffect(()=>{
      a.update();
      // eslint-disable-next-line
    },[])
  return (
    <div>
      This is About {a.state.name} and his age is {a.state.age}
    </div>
  )
}

export default About
