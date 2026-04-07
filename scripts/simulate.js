const util = require("./util.js");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const VALID_ACTIONS = ["authorize", "clearing", "return", "void"];

const requireArg = (name, value) => {
  if (!value) {
    console.error(
      "\u001b[31m",
      `A ${name} is required for this simulation action`,
      "\033[0m",
    );
    return false;
  }
  return true;
};

const main = async () => {
  const client = util.createClient();
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
      type: "string",
      nargs: 1,
    }).argv;

  const { action } = argv;
  if (!VALID_ACTIONS.includes(action)) {
    console.error(
      "\u001b[31m",
      `${action} is an invalid option. Must be one of ${VALID_ACTIONS}`,
      "\033[0m",
    );
    return;
  }

  try {
    let result;
    switch (action) {
      case "authorize":
      case "return":
        if (!requireArg("PAN", argv.pan)) return;
        result = await client.transactions[
          action === "authorize" ? "simulateAuthorization" : "simulateReturn"
        ]({
          amount: argv.amount,
          descriptor: argv.descriptor,
          pan: argv.pan,
        });
        break;
      case "clearing":
      case "void":
        if (!requireArg("transaction token", argv.token)) return;
        result = await client.transactions[
          action === "clearing" ? "simulateClearing" : "simulateVoid"
        ]({
          token: argv.token,
          ...(argv.amount && { amount: argv.amount }),
        });
        break;
    }
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};

main();
