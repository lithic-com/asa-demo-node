const util = require("./util.js");

const main = async () => {
  const client = util.createClient();
  try {
    const transactions = [];
    for await (const txn of client.transactions.list()) {
      transactions.push(txn);
    }
    console.log(JSON.stringify(transactions, null, 2));
  } catch (error) {
    console.error(error.message);
  }
};

main();
