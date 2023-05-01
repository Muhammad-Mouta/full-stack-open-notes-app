import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Forms from './Forms'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNode = jest.fn()
    const user = userEvent.setup()

    render(
        <Forms.NoteForm createNode={createNode}/>
    )

    const input = screen.getByPlaceholderText('new note...')
    const sendButton = screen.getByText('save')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)

    expect(createNode.mock.calls).toHaveLength(1)
    expect(createNode.mock.calls[0][0].content).toBe('testing a form...')
})