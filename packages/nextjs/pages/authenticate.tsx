import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAccount, useMutation, useQuery, useQueryClient } from "wagmi";
import { goerli } from "wagmi/chains";
import { MetaHeader } from "~~/components/MetaHeader";
import prisma from "~~/lib/db";
import { useErc721BalanceOf } from "~~/lib/generated";
import { useGlobalState } from "~~/services/store/store";

const GOERLI_SBT_ADDRESS = "0xfaA7e7F14a2dCAD537d0141533bB58D62dD8022c";

async function createUser(discordId: string, username: string, address: string) {
  const response = await fetch("/api/create-user", {
    method: "POST",
    body: JSON.stringify({
      discordId,
      username,
      address,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return await response.json();
}

async function getUser(discordId: string) {
  const user = await prisma.discordUser.findFirst({ where: { discordId } });

  if (!user) {
    throw new Error("Failed to get user");
  }
  return user;
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
  const discordUser = useGlobalState(state => state.discordUser);

  const { mutateAsync } = useMutation(["createUser", discordUser], () =>
    createUser(discordUser!.id, discordUser!.name!, address!),
  );
  const { data: dbUser } = useQuery(["getUser", discordUser?.id], () => getUser(discordUser!.id), {
    enabled: Boolean(discordUser),
    onSuccess: user => {
      useGlobalState.setState({ discordUser: user });
    },
  });
  const queryClient = useQueryClient();

  const { data } = useErc721BalanceOf({
    address: GOERLI_SBT_ADDRESS,
    chainId: goerli.id,
    args: [address!],
    enabled: Boolean(address),
  });
  const proofOfHumanityExists = data !== undefined && data > 0n;

  // if user has been logged in with an address, we create an entry in DB
  useEffect(() => {
    if (discordUser && dbUser === undefined && address) {
      mutateAsync().then(() => {
        queryClient.invalidateQueries(["getUser", discordUser!.id]);
      });
    }
  }, [address, dbUser, discordUser, mutateAsync, queryClient]);

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
          <a
            href="https://robotornot.mainnet-beta.rarimo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
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
        <a href={process.env.NEXT_PUBLIC_BOT_URL + "/linked-role"} className="link">
          Click here to get access to Discord
        </a>
      </div>
    </>
  );
};

export default Authenticate;
