const express = require("express")
const predict = require('./controllers/predict')

const routes = express.Router()

//routes.get("/devs", predict.index)
routes.post("/predict", predict.postPredict)

module.exports = routes