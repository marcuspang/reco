import { ethers } from "hardhat";
import { SimpleFtsoExample__factory } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const simpleFtsoExample = await new SimpleFtsoExample__factory(deployer).deploy();
  console.log("SimpleFtsoExample deployed to:", simpleFtsoExample);
  // try {
  //   const result = await run("verify:verify", {
  //     address: simpleFtsoExample.address,
  //     constructorArguments: args,
  //   });

  //   console.log(result);
  // } catch (e: any) {
  //   console.log(e.message);
  // }
  console.log("Deployed contract at:", simpleFtsoExample.address);
}
main().then(() => process.exit(0));
