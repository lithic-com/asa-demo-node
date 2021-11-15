const axios = require("axios");
const util = require("./util.js");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const VALID_ACTIONS = ["authorize", "clearing", "return", "void"];

const _constructClearingVoidBody = (args) => {
  const { token, amount } = args;
  if (!token) {
    console.error(
      "\u001b[31m",
      "A transaction token is required when simulating a clearance or a void",
      "\033[0m"
    );
    return;
  }
  const requestBody = { token };

  if (amount) {
    requestBody.amount = amount;
  }
  return requestBody;
};

const _constructAuthorizeReturnBody = (args) => {
  const { descriptor, amount, pan } = args;
  if (!pan) {
    console.error(
      "\u001b[31m",
      "A PAN is required when simulating an authorization or a return",
      "\033[0m"
    );
    return;
  }

  return {
    descriptor,
    amount,
    pan,
  };
};

const simulate = (apiKey, action, requestBody) => {
  axios
    .post(`https://sandbox.lithic.com/v1/simulate/${action}`, requestBody, {
      headers: {
        Authorization: `api-key ${apiKey}`,
        "Content-type": "application/json",
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};

const main = () => {
  const apiKey = util.readApiKey();
  const argv = yargs(hideBin(process.argv))
    .command("* [action]")
    .positional("action", {
      type: "string",
      nargs: 1,
    })
    .option("token", {
      type: "string",
      nargs: 1,
    })
    .option("descriptor", {
      type: "string",
      default: "Sample descriptor",
      nargs: 1,
    })
    .option("amount", {
      type: "number",
      default: 0,
      nargs: 1,
    })
    .option("pan", {
      type: "number",
      nargs: 1,
    }).argv;

  const { action } = argv;
  if (!VALID_ACTIONS.includes(action)) {
    console.error(
      "\u001b[31m",
      `${action} is an invalid option. Must be on of ${VALID_ACTIONS}`,
      "\033[0m"
    );
    return;
  }
  let requestBody;
  if (["clearing", "void"].includes(action)) {
    requestBody = _constructClearingVoidBody(argv);
  } else {
    requestBody = _constructAuthorizeReturnBody(argv);
  }
  if (!requestBody) return;
  simulate(apiKey, action, requestBody);
};

main();
