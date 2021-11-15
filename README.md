[overview]: #overview
[prerequisites]: #prerequisites
[local]: #local
[deploy]: #deploy
[logs]: #logs
[scripts]: #scripts
[enroll]: #enroll
[simulate]: #simulate
[authorizeandreturns]: #authorizeandreturns
[clearingandvoid]: #clearingandvoid
[listtransactions]: #listtransactions
[createcard]: #createcard
[testing]: #testing

# ASA Webhook Example

## Table of Contents

- [Overview][overview]
- [Pre-requisites](prerequisites)
- [Running locally](local)
- [Deploying](deploy)
- [Logs](logs)
- [Scripts](scripts)
  - [Enrolling in ASA](enroll)
  - [Simulate Events](simulate)
    - [Authorize and Returns](authorizeandreturns)
    - [Clearing and Void](clearingandvoid)
  - [List Transactions](listtransactions)
  - [Create a Card](createcard)
- [Testing](testing)

## Overview

This is a sample application for creating an auth stream access webhook with [AWS API Gateway](https://aws.amazon.com/api-gateway/) and [Lambda](https://aws.amazon.com/lambda/), managed via [AWS Serverless Application Model (SAM)](https://aws.amazon.com/serverless/sam/).

By default, the endpoint is configured to authorize all transactions except those where the merchant is registered in the state of Connecticut (CT), or in which the merchants' category code is "5933" or "5945". These were randomly selected to demonstrate a "deny" workflow. If you wish to modify the behavior, edit the files `webhook/app.js` and `webhook/authorization.js` to your needs.

## Pre-requisites

- This repository uses Node, and requires that you use Node 14.x. The Lambda uses a runtime of Node 14.x.
- You must have the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) and [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) installed.
- Configure your local AWS environment (run `aws configure`).

* Make sure you have a Sandbox API Key. You can get your API Key by navigating to your [account](https://lithic.com/account) page. After enabling the API, you will have access to both a production and sandbox API key. Be sure to use the **Sandbox** key for this demo. For more information, please refer to our [documentation](https://docs.lithic.com/docs/auth-stream-access-asa).

## Running locally

To start the API locally run the following command:

```bash
sam local start-api
```

The API will start on port 3000. You can perform an authorized request against the local API as follows:

```bash
curl -XPOST http://localhost:3000/webhook -d '{"token": "abcdefgh", "merchant": {"state": "NY", "mcc": "5922"}}'
```

In this example, the lambda will respond with an "authorize" response and echo the token in the response.

## Deploy

To deploy the application, run the following commands:

```bash
sam build
sam deploy --guided
```

Once complete, your new API endpoint will be output to your terminal.

If you make any modifications to the lambda or the template, re-run these two commands to re-deploy your application.

## Application Logs

Once deployed, you can fetch logs with the following command:

```bash
sam logs -n ASAWebhookFunction --stack-name lithic-asa-demo-node --tail
```

## Cleanup

To delete the sample application that you created, run the following:

```bash
aws cloudformation delete-stack --stack-name lithic-asa-demo-node
```

## Scripts

This respository includes some scripts for interacting with the Lithic Sandbox API. Before running these scripts, be sure to install the dev dependencies:

```bash
npm install
```

It may be helpful to store your Lithic Sandbox API key in your `~/.bashrc` or equivalent so that you do not need to include it in each script command:

```bash
echo 'export LITHIC_SANDBOX_KEY={your_key} >> ~/.bashrc`
```

Alternatively, if you do not have the Sandbox API Key set as an environment variable, the scripts will prompt you to enter one when run.

### Enroll your endpoint in ASA

Using the API Gateway endpoint URL (this URL is output to the terminal after you run the deploy), run the following script to enroll in ASA:

```bash
npm run enroll -- --webhook-url {your_api_endpoint}
```

If you need to change the enrolled endpoint, disenroll before re-enrolling your new endpoint:

```bash
npm run disenroll
```

### Simulate Events

This repository provides a script for simulating any of the following events:

- authorize
- return
- clearing
- void

To do so, run the following script:

```bash
npm run simulate -- {action}
```

Depending on which action you are simulating, different arguments are required. See below for additional details.

#### Authorize and Returns

- **required** `pan`: A valid PAN; if you need to quickly create a card for testing, see [Create a Card](#createcard).
- `amount`: An amount (in cents) to authorize or return. Defaults to 0.
- `descriptor`: Merchant descriptor. Defaults to "Sample descriptor".

Example request:

```bash
npm run simulate -- authorize --pan 4111111289144142 --amount 52 --descriptor 'coffee shop'
```

#### Clearing and Void

- **required** `token`: a transaction token returned from an `authorize` response.
- `amount`: Amount (in cents) to clear or void. Typically this will match the original authorization, but may be more or less. If no amount is supplied, the amount of the transaction will be cleared or voided. Any transaction that has any amount completed at all do not have access to this behavior.

Example request:

```bash
npm run simulate -- clearing --token {uuid} --amount 20
```

#### Listing Transactions

Now that you've processed a bunch of transactions, you can list them with:

```bash
npm run list-transactions
```

### Create a Card

If you need to create a card for testing, you can use the following script:

```bash
npm run create-card
```

This creates an unlocked card in an open state that can be used for testing.

## Testing

This demo application includes unit tests for testing the endpoint and authorization logic. To run the test suite, from within your virtual environment, install the test dependencies:

```bash
npm install
npm run test
```
