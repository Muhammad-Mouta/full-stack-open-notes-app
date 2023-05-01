const noteReducer = (state = [], action) => {
    switch(action.type) {
    case 'NEW_NOTE':
        return state.concat(action.payload)
    case 'TOGGLE_IMPORTANCE': {
        const noteToChange = state.find(n => n.id === action.payload.id)
        const changedNote = { ...noteToChange, important: !noteToChange.important }
        return state.map(n => n.id === action.payload.id? changedNote : n)
    }
    default:
        return state
    }
}

export default noteReducer