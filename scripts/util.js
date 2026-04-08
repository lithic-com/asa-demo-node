const { Lithic } = require("lithic");
const prompt = require("prompt-sync")();

const createClient = () => {
  let apiKey = process.env.LITHIC_SANDBOX_KEY;
  if (!apiKey) {
    console.log(
      "\033[93m",
      "You can set the LITHIC_SANDBOX_KEY environment variable to avoid entering this each time!",
      "\033[0m",
    );
    apiKey = prompt("Enter your Lithic Sandbox API Key: ");
  }
  return new Lithic({ apiKey, environment: "sandbox" });
};

module.exports = { createClient };
