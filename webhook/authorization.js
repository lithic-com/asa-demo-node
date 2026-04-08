const APPROVED_RESULT = "APPROVED";
const UNAUTHORIZED_RESULT = "UNAUTHORIZED_MERCHANT";
// 5933: Pawn shops
// 5945: Game, Toy and Hobby Shops
const DISALLOWED_MCCS = ["5933", "5945"];

// For some reason, we are going to disallow Connecticut
const DISALLOWED_MERCHANT_STATES = ["CT"];

/**
 * Dummy function showing some potential auth logic around merchant logic
 * @param  {import('lithic').Shared.Merchant} merchantInfo  Merchant Detail included in ASA request
 * @return {Boolean} Whether the merchant is valid
 */
const authorizeMerchant = (merchantInfo) => {
  const isValidMcc = !DISALLOWED_MCCS.includes(merchantInfo.mcc);
  const isValidState = !DISALLOWED_MERCHANT_STATES.includes(merchantInfo.state);
  return isValidMcc && isValidState;
};

/**
 * Performs authorization logic, returning the authorization result
 * @param  {import('lithic').CardAuthorizationApprovalRequestWebhookEvent} asaRequest ASA request to authorize
 * @return {String} Authorization result
 */
const authorize = (asaRequest) => {
  const isAuthorizedMerchant = authorizeMerchant(asaRequest.merchant);
  return isAuthorizedMerchant ? APPROVED_RESULT : UNAUTHORIZED_RESULT;
};

module.exports = { authorize, APPROVED_RESULT, UNAUTHORIZED_RESULT };
