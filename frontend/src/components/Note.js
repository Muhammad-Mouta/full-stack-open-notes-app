const Note = ({ note, toggleImportance }) => (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{note.important? 'make not important' : 'make important'}</button>
    </li>
  )

  export default Note