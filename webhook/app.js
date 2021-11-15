const authorization = require("./authorization.js");

let response;

exports.handler = async (event, context) => {
  try {
    const asaRequest = JSON.parse(event["body"]);
    console.log(`Received request: ${JSON.stringify(asaRequest)}`);
    const result = authorization.authorize(asaRequest);
    const responseBody = {
      result: result,
      token: asaRequest["token"],
      avs_result: "MATCH",
      balance: { amount: 0, available: 0 },
    };
    console.log(`Returning response: ${JSON.stringify(responseBody)}`);
    response = {
      statusCode: 200,
      body: JSON.stringify(responseBody),
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    };
  } catch (err) {
    console.error(err);
    return err;
  }

  return response;
};
