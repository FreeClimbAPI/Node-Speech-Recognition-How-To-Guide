require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const freeclimbSDK = require('@freeclimb/sdk')

const port = process.env.PORT || 3000
const host = process.env.HOST
const accountId = process.env.ACCOUNT_ID
const authToken = process.env.AUTH_TOKEN
const applicationId = process.env.APPLICATION_ID
const freeclimb = freeclimbSDK(accountId, authToken)

//Invoke create method to initiate the asynchronous outdial request
freeclimb.api.calls.create(to, from, applicationId).catch(err => {/** Handle Errors */ })

// Handles incoming calls. Set with 'Call Connect URL' in App Config
app.post('/incomingCall', (req, res) => {
  const say = freeclimb.percl.say("Please select a color. Select green, red, or yellow.")
  const options = {
    grammarType: freeclimb.enums.grammarType.URL,
    prompts: [say]
  }
  const getSpeech = freeclimb.percl.getSpeech(`${host}/colorSelectDone`, `${host}/grammarFile`, options)
  const percl = freeclimb.percl.build(getSpeech)
  // Convert PerCL container to JSON and append to response
  res.status(200).json(percl)
})

app.post('/colorSelectDone', (req, res) => {
  const getSpeechActionResponse = req.body
  // Check if recognition was successful
  if (getSpeechActionResponse.reason === freeclimb.enums.getSpeechReason.RECOGNITION) {
    // Get the result
    const color = getSpeechActionResponse.recognitionResult
    say = freeclimb.percl.say(`Selected color was ${color}`)
  } else {
    say = freeclimb.percl.say('There was an error in selecting a color')
  }
  const hangup = freeclimb.percl.hangup()
  const percl = freeclimb.percl.build(say, hangup)
  res.status(200).json(percl)
})

app.get('/grammarFile', function (req, res) {
  const file = `${__dirname}/colorGrammar.xml`
  res.download(file)
})

// Specify this route with 'Status Callback URL' in App Config
app.post('/status', (req, res) => {
  // handle status changes
  res.status(200)
})

app.listen(port, () => {
  console.log(`Starting server on port ${port}`)
})