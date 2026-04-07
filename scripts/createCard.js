const util = require("./util.js");

const main = async () => {
  const client = util.createClient();
  try {
    const card = await client.cards.create({ type: "UNLOCKED" });
    console.log(card);
  } catch (error) {
    console.error(error.message);
  }
};

main();
