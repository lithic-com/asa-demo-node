const axios = require("axios");
const util = require("./util.js");

const listTransactions = (apiKey) => {
  axios
    .get("https://sandbox.lithic.com/v1/transaction", {
      headers: {
        Authorization: `api-key ${apiKey}`,
        "Content-type": "application/json",
      },
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data, null, 2));
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};

const main = () => {
  const apiKey = util.readApiKey();
  listTransactions(apiKey);
};

main();
