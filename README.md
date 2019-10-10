# Node Speech Recognition Tutorial

This project serves as a guide to help you build an application with Persephony. Specifically, the project will:

- Make an outgoing Call
- Prompt the participant for a response
- Host a grammar file for speech recognition
- Use the users response

## Setting up your new app within your Persephony account

To get started using a persephony account, follow the instructions [here](https://persephony-docs.readme.io/docs/getting-started-with-persephony).

## Setting up the Speech Recognition Tutorial

1. Install the node packages necessary using command:

   ```bash
   $ yarn install
   ```

2. Configure environment variables (this tutorial uses the [dotenv package](https://www.npmjs.com/package/dotenv)).

   | ENV VARIABLE            | DESCRIPTION                                                                                                                                                                             |
   | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | accountId              | Account ID which can be found under [API Keys](https://www.persephony.com/dashboard/portal/account/authentication) in Dashboard                                                         |
   | authToken              | Authentication Token which can be found under [API Keys](https://www.persephony.com/dashboard/portal/account/authentication) in Dashboard                                               |
   | applicationId | Appliction IDs can be found under [Apps](https://www.persephony.com/dashboard/portal/applications) |
   | HOST | The url of where your app is being hosted (e.g. yourHostedApp.com) |

3. Provide a value for the variables `to` and `from` in makeARecording.js. The `to` number is any phone number you wish to call. This number must be [verified](https://docs.persephony.com/docs/using-your-trial-account#section-verifying-outbound-numbers). `from` is a persephony number that makes the call ([Incoming Numbers](https://www.persephony.com/dashboard/portal/numbers)).

## Runnning the Tutorial

1. Run the application using command:

   ```bash
   $ node speechRecognition.js
   ```

