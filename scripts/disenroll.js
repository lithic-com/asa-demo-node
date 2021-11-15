const axios = require("axios");
const util = require("./util.js");

const disenrollAsa = (apiKey) => {
  axios
    .post(
      "https://sandbox.lithic.com/v1/authstream/disenroll",
      {},
      {
        headers: {
          Authorization: `api-key ${apiKey}`,
          "Content-type": "application/json",
        },
      }
    )
    .then(function (_) {
      console.log("\033[92m", "Successfully disenrolled", "\033[0m");
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};

const main = () => {
  const apiKey = util.readApiKey();
  disenrollAsa(apiKey);
};

main();
