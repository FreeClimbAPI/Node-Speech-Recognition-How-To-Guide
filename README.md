# Node - Speech Recognition Tutorial

This project serves as a guide to help you build an application with FreeClimb. Specifically, the project will:

- Make an outgoing Call
- Prompt the participant for a response
- Host a grammar file for speech recognition
- Use the users response

## Setting up your new app within your FreeClimb account

To get started using a FreeClimb account, follow the instructions [here](https://docs.freeclimb.com/docs/getting-started-with-freeclimb).

## Setting up the Tutorial

1. Install the node packages necessary using command:

   ```bash
   $ yarn install
   ```

2. Configure environment variables (this tutorial uses the [dotenv package](https://www.npmjs.com/package/dotenv)).

   | ENV VARIABLE            | DESCRIPTION                                                                                                                                                                             |
   | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | ACCOUNT_ID              | Account ID which can be found under [API Keys](https://www.freeclimb.com/dashboard/portal/account/authentication) in Dashboard                                                         |
   | AUTH_TOKEN              | Authentication Token which can be found under [API Keys](https://www.freeclimb.com/dashboard/portal/account/authentication) in Dashboard                                               |
   | APPLICATION_ID | Appliction IDs can be found under [Apps](https://www.freeclimb.com/dashboard/portal/applications) |
   | HOST | The url of where your app is being hosted (e.g. yourHostedApp.com) |

3. Provide a value for the variables `to` and `from` in makeARecording.js. The `to` number is any phone number you wish to call. This number must be [verified](https://docs.freeclimb.com/docs/using-your-trial-account#section-verifying-outbound-numbers) (for trial users) and in E.164 format. `from` is a FreeClimb number that makes the call ([Incoming Numbers](https://www.freeclimb.com/dashboard/portal/numbers)).

## Runnning the Tutorial

1. Run the application using command:

   ```bash
   $ node speechRecognition.js
   ```

