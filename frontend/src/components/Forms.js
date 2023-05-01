import { useState } from 'react'

const LoginForm = ({ handleCredentials }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (event) => {
        event.preventDefault()
        await handleCredentials({
            username,
            password
        })
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={submitHandler}>
            <h2>Login</h2>
            <div>
                <label htmlFor='username-input'>username</label>
                <input id='username-input' type='text' value={username} onChange={event => setUsername(event.target.value)}/>
            </div>
            <div>
                <label htmlFor='password-input'>password</label>
                <input id='password-input' type='text' value={password} onChange={event => setPassword(event.target.value)}/>
            </div>
            <button id='login-button' type='submit'>login</button>
        </form>
    )
}

const NoteForm = ({ createNode }) => {
    const [newNote, setNewNote] = useState('')

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        createNode({
            content: newNote,
            important: true
        })
        setNewNote('')
    }

    return (
        <form onSubmit={addNote}>
            <input id='new-note-input' type='text' placeholder='new note...' value={newNote} onChange={handleNoteChange}/>
            <button type="submit">save</button>
        </form>
    )
}

const defaultExports = {
    LoginForm,
    NoteForm
}
export default defaultExports