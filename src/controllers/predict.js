const automl = require('@google-cloud/automl')
const Predict = require('../models/predict')
const ENVS = require('../config/env')

const self = this

exports.getPredict = async (req, res) => {
    const predicts = await Predict.find({})
    return res.json(predicts)
}

exports.postPredict = async (req, res) => {
    const {messages} = req.body
    let predicts = []
    
    for (const message of messages) {
        console.log("index/key: ", messages.indexOf(message))
        
        let text = message.text
        console.log("text: ", text);
        
        let actMessage = message.act
        console.log("act: ", actMessage);
        
        let classifierId = ENVS.classifierId[actMessage]
        console.log("classifierId: ", classifierId);
        
        let sendlerId = message.sendlerId 
        let name = message.name 
        let sentOn = message.sentOn 
        let teamGameId = message.teamGameId

        let predict = (await self.predictText(text, classifierId))[0]
        delete predict.annotationSpecId
        delete predict.detail
        console.log("label", predict.displayName);
        console.log("score", predict.classification.score);
        predict = await Predict.create({
            sendlerId, 
            text, 
            name, 
            sentOn, 
            act: actMessage, 
            teamGameId,
            predict
        })

        predicts.push({
            message,
            predict
        })
    }
    return res.json(predicts)
}


exports.predictText = async (text, classifierId) => {
    const client = new automl.v1beta1.PredictionServiceClient({
        credentials: ENVS.credentials
    });
    
    const formattedName = client.modelPath('analyze-service', 'us-central1', classifierId);
    
    const payload = {
        "textSnippet": {
            "content": text,
            "mime_type": "text/plain"
        }
    };
    
    const request = {
        name: formattedName,
        payload,
    };
    
    try {
        const response = await client.predict(request)
        return response[0].payload
    } catch (error) {
        console.error(error)
        return error
    }
}















