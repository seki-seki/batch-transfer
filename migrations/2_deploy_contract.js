var BatchTransferWallet = artifacts.require("./BatchTransferWallet.sol");
var ExampleToken = artifacts.require("./ExampleToken.sol");
module.exports = function(deployer){
	deployer.deploy(BatchTransferWallet);
    deployer.deploy(ExampleToken);
};
