import { ethers } from "hardhat";
import { Recommendoor__factory, SimpleFtsoExample__factory } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const simpleFtsoExample = await new SimpleFtsoExample__factory(deployer).deploy();
  console.log("SimpleFtsoExample deployed to:", simpleFtsoExample);
  // 0x6BA1ae2F50f4b2E4671B9269A9a3606a4EfE0266
  console.log("Deployed contract at:", simpleFtsoExample.address);

  const recommendoor = await new Recommendoor__factory(deployer).deploy();
  console.log("Recommendoor deployed to:", recommendoor);
  // 0xe36b6801d5F5248f4bDB239b6abC340EdBd48c9D
  console.log("Deployed contract at:", recommendoor.address);
}
main().then(() => process.exit(0));
