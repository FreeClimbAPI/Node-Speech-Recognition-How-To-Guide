const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const persephonySDK = require('@persephony/sdk')

const port = process.env.PORT || 3000
const host = process.env.HOST
const accountId = process.env.accountId
const authToken = process.env.authToken
const applicationId = process.env.accountId
const persephony = persephonySDK(accountId, authToken)

//Invoke create method to initiate the asynchronous outdial request
persephony.api.calls.create(to, from, applicationId).catch(err => {/** Handle Errors */ })

// Handles incoming calls. Set with 'Call Connect URL' in App Config
app.post('/incomingCall', (req, res) => {
  const say = persephony.percl.say("Please select a color. Select green, red, or yellow.")
  const options = {
    grammarType: persephony.enums.grammarType.URL,
    prompts: [say]
  }
  const getSpeech = persephony.percl.getSpeech(`${host}/colorSelectDone`, `${host}/grammarFile`, options)
  const percl = persephony.percl.build(getSpeech)
  // Convert PerCL container to JSON and append to response
  res.status(200).json(percl)
})

app.post('/colorSelectDone', (req, res) => {
  const getSpeechActionResponse = req.body
  // Check if recognition was successful
  if (getSpeechActionResponse.reason === persephony.enums.getSpeechReason.RECOGNITION) {
    // Get the result
    const color = getSpeechActionResponse.recognitionResult
    say = persephony.percl.say(`Selected color was ${color}`)
  } else {
    say = persephony.percl.say('There was an error in selecting a color')
  }
  const hangup = persephony.percl.hangup()
  const percl = persephony.percl.build(say, hangup)
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