import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAccount, useMutation } from "wagmi";
import { goerli } from "wagmi/chains";
import { MetaHeader } from "~~/components/MetaHeader";
import { useErc721BalanceOf } from "~~/lib/generated";

const GOERLI_SBT_ADDRESS = "0xfaA7e7F14a2dCAD537d0141533bB58D62dD8022c";

async function createUserIfNotExists(username: string, email: string, address: string) {
  const response = await fetch("/api/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      address,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return await response.json();
}

export async function getStaticProps() {
  return {
    props: {
      hideHeader: true,
    },
  };
}

const Authenticate: NextPage = () => {
  const { address } = useAccount();
  const { data: session } = useSession();
  const discordUser = session?.user;

  const { data: databaseUser, mutateAsync } = useMutation(["createUser", discordUser, address], () =>
    createUserIfNotExists(discordUser!.name!, discordUser!.email!, address!),
  );
  const { data } = useErc721BalanceOf({
    address: GOERLI_SBT_ADDRESS,
    chainId: goerli.id,
    args: [address!],
    enabled: Boolean(address),
  });
  const proofOfHumanityExists = data !== undefined && data > 0n;

  // if user has been logged in with an address, we create an entry in DB
  useEffect(() => {
    if (discordUser && address && databaseUser === undefined) {
      mutateAsync();
    }
  }, [address, databaseUser, discordUser, mutateAsync]);

  if (!session) {
    return (
      <>
        <MetaHeader />
        <div className="flex items-center flex-col flex-grow pt-10 h-full justify-center">
          <h1 className="font-bold text-4xl pb-4">Please Sign in with Discord</h1>
          <button className="btn btn-primary" onClick={() => signIn()}>
            Sign In with Discord
          </button>
        </div>
      </>
    );
  }

  if (!address) {
    return (
      <>
        <MetaHeader />
        <div className="flex items-center flex-col flex-grow pt-10 h-full justify-center">
          <h1 className="font-bold text-4xl pb-4">Please Login with your Wallet</h1>
          <ConnectButton />

          <button className="mt-6 btn btn-primary" onClick={() => signOut()}>
            Sign Out of Discord
          </button>
        </div>
      </>
    );
  }

  if (!proofOfHumanityExists) {
    return (
      <>
        <MetaHeader />
        <div className="flex items-center flex-col flex-grow pt-10 h-full justify-center">
          <h1 className="font-bold text-4xl pb-4">
            Please register your PoH here. Come back to this site once you&apos;re done!
          </h1>
          <ConnectButton />
          <a
            href="https://robotornot.mainnet-beta.rarimo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-4"
          >
            Prove your Humanity
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10 h-full justify-center">
        <h1 className="font-bold text-4xl pb-4">Authenticated!</h1>
        <a href={process.env.NEXT_PUBLIC_BOT_URL + "/linked-role"} className="link pb-4">
          Click here to get access to Discord
        </a>
        <ConnectButton />
      </div>
    </>
  );
};

export default Authenticate;
