const {Schema, model} = require('mongoose')

const PredictSchema= new Schema({
    classifierId: {
        type: String,
        required: true
    },
    text: {
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