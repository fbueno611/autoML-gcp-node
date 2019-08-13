const express = require('express')
//Usar qnd salvar no bd
//const mongoose = require('mongoose')

const routes = require('./routes')

const server = express()

//Usar qnd salvar no bd
//mongoose.connect('mongodb+srv://fbueno:Huddle2018@cluster0-aw3dc.mongodb.net/text?retryWrites=true&w=majority', { useNewUrlParser: true })
server.use(express.json())
server.use(routes)

server.listen(3333)
console.log('Servidor rodando na porta 3333')
