import { Contract, Wallet, JsonRpcProvider } from "ethers";
import abi from "../abi/Recommendoor.js";

const flareContract = new Contract(
  process.env.FLARE_RECOMMENDOOR_CONTRACT_ADDRESS,
  abi
);
const goerliProvider = new JsonRpcProvider(undefined, "goerli");
const sbtContract = new Contract(
  "0xfaA7e7F14a2dCAD537d0141533bB58D62dD8022c",
  [
    {
      stateMutability: "view",
      type: "function",
      inputs: [{ name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
    },
  ],
  goerliProvider
);

const flareProvider = new JsonRpcProvider(
  "https://coston2-api.flare.network/ext/C/rpc"
);
const wallet = new Wallet(process.env.PRIVATE_KEY, flareProvider);

export async function uploadData(user, ipfsHash, channel) {
  try {
    const tx = await flareContract
      .connect(wallet)
      .uploadData(user, ipfsHash, channel);
    const receipt = await tx.wait();
    return receipt;
  } catch (e) {
    console.log(e);
  }
}

export async function interactContent(user, ipfsHash, action) {
  try {
    const tx = await flareContract
      .connect(wallet)
      .interactContent(user, ipfsHash, action);
    const receipt = await tx.wait();
    return receipt;
  } catch (e) {
    console.log(e);
  }
}

export async function hasProofOfHumanity(address) {
  try {
    const tx = await sbtContract.balanceOf(address);
    return tx && tx > 0n;
  } catch (e) {
    console.log(e);
  }
}
