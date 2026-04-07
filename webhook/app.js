const { Lithic } = require("lithic");
const authorization = require("./authorization.js");

const client = new Lithic({
  apiKey: process.env.LITHIC_SANDBOX_KEY || "",
  environment: "sandbox",
});

exports.handler = async (event, context) => {
  try {
    const payload = event.body;
    const headers = event.headers || {};

    let asaRequest;
    // Verify webhook signature if secret is configured this is
    // highly recommended in a production setting
    if (client.webhookSecret) {
      asaRequest = client.webhooks.unwrap(payload, headers);
    } else {
      asaRequest = JSON.parse(payload);
    }

    console.log("Received request", asaRequest);
    const result = authorization.authorize(asaRequest);
    const responseBody = {
      result,
      token: asaRequest.token,
      avs_result: "MATCH",
      balance: { amount: 0, available: 0 },
    };
    console.log("Returning response", responseBody);
    return {
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
