import { Contract, Wallet, JsonRpcProvider } from "ethers";
import abi from "../abi/Recommendoor.json" assert { type: "json" };

const contract = new Contract(
  process.env.FLARE_RECOMMENDOOR_CONTRACT_ADDRESS,
  abi.abi
);
const provider = new JsonRpcProvider(
  "https://coston2-api.flare.network/ext/C/rpc"
);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

export async function uploadData(user, ipfsHash, channel) {
  try {
    const tx = await contract
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
    const tx = await contract
      .connect(wallet)
      .interactContent(user, ipfsHash, action);
    const receipt = await tx.wait();
    return receipt;
  } catch (e) {
    console.log(e);
  }
}
