import axios from 'axios'

const baseURL = '/api/notes'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => (
    axios.get(baseURL).then(response => response.data.concat({
        id: 1000,
        content: 'Fake Note',
        important: true
    }))
)

const create = async newObject => {
    const config = { 
        headers: { Authorization: token }
     }
    const response = await axios.post(baseURL, newObject, config)
    return response.data
}

const update = (id, newObject) => (
    axios.put(`${baseURL}/${id}`, newObject).then(response => response.data)
)

const defaultExports = {getAll, create, update, setToken}

export default defaultExports