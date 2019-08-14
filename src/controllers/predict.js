const automl = require('@google-cloud/automl')
const Predict = require('../models/predict')
const credentials = require('../config/env')

const self = this

exports.postPredict = async (req, res) => {
    const { texts, classifierId } = req.body
    let predicts = []
    for (const text of texts) {
        console.log("index/key: ", texts.indexOf(text))
        let predict = (await self.predictText(text, classifierId))[0]
        delete predict.annotationSpecId
        delete predict.detail
        predict = await Predict.create({
            text,
            predict
        })


        predicts.push({
            text,
            predict
        })
    }
    return res.json(predicts)
}

exports.predictText = async (text, classifierId) => {
    const client = new automl.v1beta1.PredictionServiceClient({
        credentials
    });
    console.log({text});
    
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















