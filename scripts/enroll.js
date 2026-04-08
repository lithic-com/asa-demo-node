const util = require("./util.js");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const main = async () => {
  const client = util.createClient();
  const argv = yargs(hideBin(process.argv)).option("webhook-url", {
    type: "string",
    demandOption: "Webhook URL is required.",
    nargs: 1,
  }).argv;

  try {
    await client.responderEndpoints.create({
      type: "AUTH_STREAM_ACCESS",
      url: argv.webhookUrl,
    });
    console.log("\033[92m", "Successfully enrolled", "\033[0m");
  } catch (error) {
    console.error(error.message);
  }
};

main();
