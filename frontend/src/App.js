import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Forms from './components/Forms'

import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    const noteFormRef = useRef()

    useEffect(
        () => {
            noteService
                .getAll()
                .then(initNotes => {
                    setNotes(initNotes)
                })
        }, [])

    useEffect(
        () => {
            const savedUser = window.localStorage.getItem('loggedNoteAppUser')
            if (savedUser) {
                const loggedUser = JSON.parse(savedUser)
                setUser(loggedUser)
                noteService.setToken(loggedUser.token)
            }
        }
        , [])

    const addNote = (noteObject) => {
        noteService
            .create(noteObject)
            .then(
                newNote => {
                    setNotes(notes.concat(newNote))
                }
            )
        noteFormRef.current.toggleVisibility()
    }

    const toggleImportanceOf = (id) => () => {
        const note = notes.find(note => note.id === id)
        const changedNote = { ...note, important: !note.important }
        noteService
            .update(id, changedNote)
            .then(
                updatedNode => {
                    setNotes(notes.map(note => note.id === id? updatedNode : note))
                }
            )
            .catch(() => {
                setErrorMessage(`the note '${note.content} was already deleted from the server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(note => note.id !== id))
            })
    }

    const handleCredentials = async (credentials) => {
        try {
            const returnedUser = await loginService.login(credentials)
            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(returnedUser))
            noteService.setToken(returnedUser.token)
            setUser(returnedUser)
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedNoteAppUser')
        setUser(null)
        noteService.setToken(null)
    }

    const notesToShow = showAll? notes : notes.filter((note) => note.important)

    return (
        <div>
            <h1>Notes: </h1>
            {
                user !== null && (
                    <p>
                        logged in as {user.username}
                        <button onClick={handleLogout}>logout</button>
                    </p>
                )
            }
            <Notification message={errorMessage}/>
            {
                user === null
                    ? <Togglable key={'login'} buttonLabel={'login'}>
                        <Forms.LoginForm
                            handleCredentials={handleCredentials}
                        />
                    </Togglable>
                    : <Togglable key={'note'} buttonLabel={'create a new note'} ref={noteFormRef}>
                        <Forms.NoteForm
                            createNode={addNote}
                        />
                    </Togglable>
            }
            <br/>
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
            <Footer/>
        </div>
    )
}

export default App