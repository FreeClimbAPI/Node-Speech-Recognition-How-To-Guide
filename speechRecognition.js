require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const freeclimbSDK = require('@freeclimb/sdk')
const { PerclScript, GetSpeech, GrammarType, Say, GetSpeechReason, Hangup } = require('@freeclimb/sdk')

const port = process.env.PORT || 80
const host = process.env.HOST
const accountId = process.env.ACCOUNT_ID
const apiKey = process.env.API_KEY
const to = 'YOUR_TO_NUMBER'
const from = 'YOUR_FROM_NUMBER'
const applicationId = process.env.APPLICATION_ID
const configuration = freeclimbSDK.createConfiguration({ accountId, apiKey })
const freeclimb = new freeclimbSDK.DefaultApi(configuration)

freeclimb.makeACall({ to, from, applicationId, callConnectUrl: `${host}/incomingCall` }).catch(err => { console.log(err) })

app.post('/incomingCall', (req, res) => {
  res.status(200).json(new PerclScript({
    commands: [
      new GetSpeech({
        actionUrl: `${host}/colorSelectDone`,
        grammarFile: `${host}/grammarFile`,
        grammarType: GrammarType.URL,
        prompts: [
          new Say({ text: "Please select a color. Select green, red, or yellow." })
        ]
      })
    ]
  }).build())
})

app.post('/colorSelectDone', (req, res) => {
  if (req.body.reason === GetSpeechReason.RECOGNITION) {
    res.status(200).json(new PerclScript({
      commands: [
        new Say({ text: `Selected color was ${req.body.recognitionResult}` }),
        new Hangup({})
      ]
    }).build())
  } else {
    res.status(200).json(new PerclScript({
      commands: [
        new Say({ text: "There was an error in selecting a color" }),
        new Hangup({})
      ]
    }).build())
  }
})

app.get('/grammarFile', function (req, res) {
  const file = `${__dirname}/colorGrammar.xml`
  res.download(file)
})

// Specify this route with 'Status Callback URL' in App Config
app.post('/status', (req, res) => {
  res.status(200)
})

app.listen(port, () => {
  console.log(`Starting server on port ${port}`)
})