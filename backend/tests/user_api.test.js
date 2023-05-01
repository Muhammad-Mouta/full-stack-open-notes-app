const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('When there is initially one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({
            username: 'root',
            passwordHash
        })

        await user.save()
    })

    test('Creation succeeds with a fresh username', async () => {
        const usersAtStart = helper.usersInDb()

        const newUser = {
            username: 'mouta',
            name: 'Muhammad Mouta',
            password: 'Serry'
        }

        await api
            .post('/api/users')
            .send((newUser))
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        expect(usersAtEnd.map(u => u.username)).toContain('mouta')
    })

    test('Creation fails with the proper status code and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const sameUser = {
            username: 'root',
            name: 'Superuser',
            password: 'Serry'
        }

        await api
            .post('/api/users')
            .send(sameUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})
