const EduPoints = artifacts.require("EduPoints");
const EntityManagement = artifacts.require("Ecosystem");

module.exports = function(deployer) {
  deployer.deploy(EduPoints, 1000000).then(function(eduPointsInstance) {
    console.log("EduPoints deployed at: ", eduPointsInstance.address);
    return deployer.deploy(EntityManagement, eduPointsInstance.address);
  });
};