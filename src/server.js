const express = require('express')
const mongoose = require('mongoose')
const ENVS = require('./config/env')
const routes = require('./routes')

const server = express()
const dbConnect = ENVS.dbConnect


mongoose.connect(dbConnect, { useNewUrlParser: true })
server.use(express.json())
server.use(routes)

server.listen(3333)
console.log('Servidor rodando')
