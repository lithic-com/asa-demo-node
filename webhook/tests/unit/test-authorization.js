const authorization = require("../../authorization.js");
const chai = require("chai");
const expect = chai.expect;

const VALID_STATE = "NY";
const VALID_MCC = "5961";

describe("Tests authorization", function () {
  it("approves valid merchant", async () => {
    const merchantInfo = {
      merchant: {
        state: VALID_STATE,
        mcc: VALID_MCC,
      },
    };
    result = authorization.authorize(merchantInfo);
    expect(result).to.be.equal("APPROVED");
  });

  it("rejects disallowed state", async () => {
    const merchantInfo = {
      merchant: {
        state: "CT",
        mcc: VALID_MCC,
      },
    };
    result = authorization.authorize(merchantInfo);
    expect(result).to.be.equal("UNAUTHORIZED_MERCHANT");
  });

  it("rejects disallowed mcc", async () => {
    const merchantInfo = {
      merchant: {
        state: VALID_STATE,
        mcc: "5933",
      },
    };
    result = authorization.authorize(merchantInfo);
    expect(result).to.be.equal("UNAUTHORIZED_MERCHANT");
  });
});
