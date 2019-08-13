const express = require('express')
//const mongoose = require('mongoose')
//const cors = require('cors');

const routes = require('./routes')

const server = express()

//ongoose.connect('mongodb+srv://fbueno:Huddle2018@cluster0-aw3dc.mongodb.net/text?retryWrites=true&w=majority', { useNewUrlParser: true })
//server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3333)
console.log('Servidor rodando na porta 3333')
