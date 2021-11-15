const axios = require("axios");
const util = require("./util.js");

const createCard = (apiKey) => {
  axios
    .post(
      "https://sandbox.lithic.com/v1/card",
      {
        type: "UNLOCKED",
      },
      {
        headers: {
          Authorization: `api-key ${apiKey}`,
          "Content-type": "application/json",
        },
      }
    )
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};

const main = () => {
  const apiKey = util.readApiKey();
  createCard(apiKey);
};

main();
