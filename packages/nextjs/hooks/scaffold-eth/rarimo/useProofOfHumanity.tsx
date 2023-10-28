import { useQuery } from "wagmi";

const query = `query info($address: String!) {
  users(where:{senderAddr: $address}){
      id
  }
}`;

async function checkHasProofOfHumanity(chainId: number, address: string) {
  // TODO: figure out if there are other subgraphs :(
  const response = await fetch(
    "https://api.thegraph.com/subgraphs/name/volodymyrzolotukhin/sbtidentityverifier-polygon",
    {
      headers: {
        accept: "application/graphql-response+json, application/json, multipart/mixed",
      },
      body: JSON.stringify({
        query,
        operationName: "info",
        variables: {
          address,
        },
      }),
      method: "POST",
    },
  );
  if (!response.ok) {
    console.log(response.body);
    throw new Error("Failed to check proof of humanity");
  }

  const data = await response.json();

  return data as { data: { users: [{ id: string }] } };
}

export const useProofOfHumanity = (chainId: number, address: string) => {
  return useQuery(["proofOfHumanity", address, chainId], () => checkHasProofOfHumanity(chainId, address!), {
    enabled: Boolean(address),
  });
};
