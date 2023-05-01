const Note = ({ note, toggleImportance }) => (
    <li className='note'>
        <span>{note.content}</span>
        <button onClick={toggleImportance}>{note.important? 'make not important' : 'make important'}</button>
    </li>
)

export default Note