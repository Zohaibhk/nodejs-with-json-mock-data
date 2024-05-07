const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')

const app = new express()
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.end('Greetings from server...')
})

app.route('/api/users')
.get((req, res) => {
    res.json(users)
}).post((req, res) => {
    let user = {id:users.length + 1, ...req.body}
    users.push(user)
    res.end(`User with id ${user.id} added successfully.`)
})

app.route('/api/users/:id')
.get((req, res) => {
    const id = parseInt(req.params.id)
    let user = users.filter(user => {
        return user.id === id
    })
    return res.json(user)
})
.patch((req, res) => {
    //TODO: update user here
    const id = parseInt(req.params.id)
    let userUpdatedData = {id:id, ...req.body}

    //Find index of specific object using findIndex method.    
    existingUser = users.findIndex(user => user.id == id);

    users[existingUser] = userUpdatedData

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
        res.json('User updated successfully.')
    })
})
.delete((req, res) => {
    //TODO: update user here
    const id = parseInt(req.params.id)
    updatedUsers = users.filter(user => user.id != id);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedUsers), () => {
        res.json('User deleted successfully.')
    })
})

app.listen(8000, () => {'Server started on port 8000'})