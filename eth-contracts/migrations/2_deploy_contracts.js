// migrating the appropriate contracts
var Verifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async (deployer) => {
  await deployer.deploy(Verifier);
  await deployer.deploy(SolnSquareVerifier, Verifier.address, "PracticeToken" , "PTOK");
};
