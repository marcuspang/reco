import lighthouse from "@lighthouse-web3/sdk";
import { Contract, Wallet } from "ethers";

// const signedMessage = "";
// const publicKey = "0xA4a1D8dBE482DC14EbADC702E13989e0bdE36dC2";

const contract = new Contract(process.env.FLARE_RECOMMENDOOR_CONTRACT_ADDRESS);
const wallet = new Wallet(process.env.PRIVATE_KEY);

export async function uploadEvent(event) {
  try {
    const message = JSON.stringify(event);

    // TODO: figure out why encrypted version doesn't work
    const response = await lighthouse.uploadText(
      message,
      process.env.LIGHTHOUSE_API_KEY,
      `recommendoor/${event.guildId}/${event.channelId}/${event.author}`
    );

    // {data: {Name: string; Hash: string; Size: string;}}
    return response;
  } catch (e) {
    console.log(e);
  }
}
