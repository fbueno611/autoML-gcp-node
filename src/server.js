const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')

const server = express()

mongoose.connect('mongodb+srv://fbueno:Huddle2018@cluster0-aw3dc.mongodb.net/predict?retryWrites=true&w=majority', { useNewUrlParser: true })
server.use(express.json())
server.use(routes)

server.listen(3333)
console.log('Servidor rodando na porta 3333')
