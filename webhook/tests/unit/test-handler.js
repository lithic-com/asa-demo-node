"use strict";

const app = require("../../app.js");
const chai = require("chai");
const expect = chai.expect;
var context;

const SAMPLE_ASA_REQUEST = {
  token: "7842e70e-2b17-47ca-8541-869636bedf6a",
  status: "AUTHORIZATION",
  pos: {
    terminal: {
      attended: false,
      operator: "CARDHOLDER",
      on_premise: true,
      card_retention_capable: false,
      pin_capability: "UNSPECIFIED",
      type: "ECOMMERCE",
      partial_approval_capable: false,
    },
    entry_mode: {
      pan: "KEY_ENTERED",
      pin_entered: false,
      cardholder: "MAIL_ORDER",
      card: "NOT_PRESENT",
    },
  },
  settled_amount: 0,
  created: "2021-11-14T15:20:08Z",
  amount: 52,
  acquirer_fee: 0,
  authorization_amount: 52,
  card: {
    token: "76b9f589-8935-4e78-8809-7f583bf0fb89",
    hostname: "",
    last_four: "3860",
    state: "OPEN",
    type: "UNLOCKED",
    memo: "UNLOCKED card",
    spend_limit: 0,
    spend_limit_duration: "TRANSACTION",
  },
  merchant: {
    descriptor: "coffee shop",
    city: "NEW YORK",
    state: "NY",
    country: "USA",
    acceptor_id: "174030075991",
    mcc: "5812",
  },
  avs: { zipcode: "33090", address: null },
  events: [],
  funding: [],
};

describe("Tests index", function () {
  it("returns valid auth response", async () => {
    const event = {};
    event["body"] = JSON.stringify(SAMPLE_ASA_REQUEST);
    const result = await app.handler(event, context);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an("string");

    let response = JSON.parse(result.body);
    expect(response).to.be.an("object");
    expect(response["result"]).to.be.equal("APPROVED");
    expect(response["token"]).to.be.equal(SAMPLE_ASA_REQUEST["token"]);
  });
});
