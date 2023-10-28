import lighthouse from "@lighthouse-web3/sdk";
import { Contract, Wallet, JsonRpcProvider } from "ethers";
import { createHelia } from "helia";
import { strings } from "@helia/strings";
import { CID } from "multiformats/cid";

const helia = await createHelia();
const s = strings(helia);

const publicKey = "0xA4a1D8dBE482DC14EbADC702E13989e0bdE36dC2";
const provider = new JsonRpcProvider(
  "https://goerli.infura.io/v3/71b56d4c42e24a859ed97faf317b3e24",
  "goerli"
);
// const contract = new Contract(process.env.FLARE_RECOMMENDOOR_CONTRACT_ADDRESS);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

export async function uploadEvent(event) {
  try {
    const messageRequested = await lighthouse.getAuthMessage(publicKey);
    const message = JSON.stringify(event);
    const signedMessage = await wallet.signMessage(
      messageRequested.data.message
    );
    const response = await lighthouse.textUploadEncrypted(
      message,
      process.env.LIGHTHOUSE_API_KEY,
      publicKey,
      signedMessage,
      `recommendoor/${event.guildId}/${event.channelId}/${event.author}`
    );
    // const response = await lighthouse.uploadText(
    //   message,
    //   process.env.LIGHTHOUSE_API_KEY,
    //   `recommendoor/${event.guildId}/${event.channelId}/${event.author}`
    // );

    // {Name: string; Hash: string; Size: string; }
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// Note: events are JSON-stringified before being uploaded to IPFS
// TODO: retrieve from subgraph / envio
export async function getEvents() {
  return (await lighthouse.getUploads(process.env.LIGHTHOUSE_API_KEY)).data;
}

export async function getSocialObjectsData() {
  const fileList = (await getEvents()).fileList;
  const ipfsCids = fileList.map((file) => file.cid);

  const promises = ipfsCids.map((cid) => s.get(CID.parse(cid)));

  const results = await Promise.allSetted(promises);

  const socialEvents = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
  console.log({ socialEvents });
  return "";
}
