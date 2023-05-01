import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisibleStyle = { display: visible? 'none' : '' }
    const showWhenVisibleStyle = { display: visible? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hideWhenVisibleStyle}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisibleStyle} className={'togglableContent'}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable