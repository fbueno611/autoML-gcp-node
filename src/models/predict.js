const {Schema, model} = require('mongoose')

const PredictSchema= new Schema({
    sendlerId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sentOn: {
        type: String,
        required: true
    },
    act: {
        type: String,
        required: true
    },
    teamGameId: {
        type: String,
        required: true
    },
    predict: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Predict', PredictSchema)