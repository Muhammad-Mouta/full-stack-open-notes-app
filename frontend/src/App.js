import { useState, useEffect } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'new note ...'
  )
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(
    () => {
      noteService
        .getAll()
        .then(initNotes => {
          setNotes(initNotes)
        })
    }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    noteService
      .create(noteObject)
      .then(
        newNote => {
          setNotes(notes.concat(newNote))
          setNewNote('')
        }
      )
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const toggleImportanceOf = (id) => () => {
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}
    noteService
      .update(id, changedNote)
      .then(
        updatedNode => {
          setNotes(notes.map(note => note.id === id? updatedNode : note))
        }
      )
      .catch(error => {
        setErrorMessage(`the note '${note.content} was already deleted from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })  
  }
  
  const notesToShow = showAll? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>Notes: </h1>
      <Notification message={errorMessage}/>
      <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll? 'important' : 'all'}
          </button>
        </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={toggleImportanceOf(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App