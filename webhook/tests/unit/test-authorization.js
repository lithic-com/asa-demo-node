const authorization = require("../../authorization.js");
const chai = require("chai");
const expect = chai.expect;

const VALID_STATE = "NY";
const VALID_MCC = "5961";

describe("Tests authorization", function () {
  it("approves valid merchant", async () => {
    const asaRequest = {
      merchant: {
        state: VALID_STATE,
        mcc: VALID_MCC,
      },
    };
    const result = authorization.authorize(asaRequest);
    expect(result).to.be.equal(authorization.APPROVED_RESULT);
  });

  it("rejects disallowed state", async () => {
    const asaRequest = {
      merchant: {
        state: "CT",
        mcc: VALID_MCC,
      },
    };
    const result = authorization.authorize(asaRequest);
    expect(result).to.be.equal(authorization.UNAUTHORIZED_RESULT);
  });

  it("rejects disallowed mcc", async () => {
    const asaRequest = {
      merchant: {
        state: VALID_STATE,
        mcc: "5933",
      },
    };
    const result = authorization.authorize(asaRequest);
    expect(result).to.be.equal(authorization.UNAUTHORIZED_RESULT);
  });
});
