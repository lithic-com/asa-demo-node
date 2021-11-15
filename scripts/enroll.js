const axios = require("axios");
const util = require("./util.js");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const enrollAsa = (apiKey, webhookUrl) => {
  axios
    .post(
      "https://sandbox.lithic.com/v1/authstream/enroll",
      {
        webhook_url: webhookUrl,
      },
      {
        headers: {
          Authorization: `api-key ${apiKey}`,
          "Content-type": "application/json",
        },
      }
    )
    .then(function (_) {
      console.log("\033[92m", "Successfully enrolled", "\033[0m");
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};

const main = () => {
  const apiKey = util.readApiKey();
  const argv = yargs(hideBin(process.argv)).option("webhook-url", {
    type: "string",
    demandOption: "Webhook URL is required.",
    nargs: 1,
  }).argv;

  const { webhookUrl } = argv;
  enrollAsa(apiKey, webhookUrl);
};

main();
