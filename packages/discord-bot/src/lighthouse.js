import { strings } from "@helia/strings";
import lighthouse from "@lighthouse-web3/sdk";
import { JsonRpcProvider, Wallet } from "ethers";
import { createHelia } from "helia";
import fetch from "node-fetch";
import { encrypt } from "./custom-encryption.js";
import { CID } from "multiformats/cid";

const helia = await createHelia();
const s = strings(helia);

const publicKey = "0xA4a1D8dBE482DC14EbADC702E13989e0bdE36dC2";
const provider = new JsonRpcProvider(
  "https://goerli.infura.io/v3/71b56d4c42e24a859ed97faf317b3e24",
  "goerli"
);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

export async function uploadEvent(event) {
  try {
    const message = JSON.stringify(event);
    if (process.env.ENCRYPT_SOCIAL_EVENTS) {
      const messageRequested = await lighthouse.getAuthMessage(publicKey);
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
      return response;
    }
    // const response = await lighthouse.uploadText(
    //   message,
    //   process.env.LIGHTHOUSE_API_KEY,
    //   `recommendoor/${event.guildId}/${event.channelId}/${event.author}`
    // );
    const cid = await s.add(encrypt(message));

    // {Name: string; Hash: string; Size: string; }
    // return response.data;
    return { Hash: cid };
  } catch (e) {
    console.log(e);
  }
}

export async function getEvents(channelId) {
  // Lighthouse query for encrypted data to be decrypted
  // return (await lighthouse.getUploads(process.env.LIGHTHOUSE_API_KEY)).data;

  // Envio graphql query for hashes
  /**
  const response = await fetch(process.env.GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        UploadData(where: {channel: "${channelId}"}) {
          id
          user
          ipfsHash
        }
      }`,
    }),
  });
  if (!response.ok) {
    throw new Error("Error querying station events " + channelId);
  }
  const data = await response.json();
  return data;
   * 
   */

  // hardcoded hashes
  return {
    fileList: [],
  };
}

export async function getSocialObjectsData() {
  const fileList = (await getEvents()).fileList;
  const ipfsCids = fileList.map((file) => file.cid);
  const results = [];

  for await (const cid of ipfsCids) {
    try {
      const result = await s.get(CID.parse(cid));
      results.push(result);
    } catch (e) {
      console.log(e);
    }
  }

  console.log(JSON.stringify(results));

  return "";
}
