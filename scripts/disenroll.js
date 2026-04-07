const util = require("./util.js");

const main = async () => {
  const client = util.createClient();
  try {
    await client.responderEndpoints.delete({ type: "AUTH_STREAM_ACCESS" });
    console.log("\033[92m", "Successfully disenrolled", "\033[0m");
  } catch (error) {
    console.error(error.message);
  }
};

main();
