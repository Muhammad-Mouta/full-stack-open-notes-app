import axios from 'axios'

const baseURL = 'api/notes'

const getAll = () => (
    axios.get(baseURL).then(response => response.data.concat({
        id: 1000,
        content: 'Fake Note',
        important: true
    }))
)

const create = newObject => (
    axios.post(baseURL, newObject).then(response => response.data)
)

const update = (id, newObject) => (
    axios.put(`${baseURL}/${id}`, newObject).then(response => response.data)
)

const defaultExports = {getAll, create, update}

export default defaultExports