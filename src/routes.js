const express = require("express")
const predict = require('./controllers/predict')

const routes = express.Router()

routes.post("/predict", predict.postPredict)

module.exports = routes