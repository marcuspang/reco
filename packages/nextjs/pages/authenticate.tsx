import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { goerli } from "wagmi/chains";
import { MetaHeader } from "~~/components/MetaHeader";
import { useErc721BalanceOf } from "~~/lib/generated";

const GOERLI_SBT_ADDRESS = "0xfaA7e7F14a2dCAD537d0141533bB58D62dD8022c";

const Authenticate: NextPage = () => {
  const { address } = useAccount();

  const { data } = useErc721BalanceOf({
    address: GOERLI_SBT_ADDRESS,
    chainId: goerli.id,
    args: [address!],
    enabled: Boolean(address),
  });
  const proofOfHumanityExists = data !== undefined && data > 0n;

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        {!address ? (
          <h1 className="font-bold text-2xl">Please login</h1>
        ) : !proofOfHumanityExists ? (
          <>
            <h1 className="font-bold text-2xl">
              Please register your PoH here. Come back to this site once you&apos;re done!
            </h1>
            <a href="https://robotornot.mainnet-beta.rarimo.com" className="btn btn-primary">
              Prove your Humanity
            </a>
          </>
        ) : (
          <>
            <h1 className="font-bold text-2xl">Authenticated!</h1>
            <a href={process.env.NEXT_PUBLIC_BOT_URL + "/linked-role"} className="link">
              Click here to get access to Discord
            </a>
          </>
        )}
      </div>
    </>
  );
};

export default Authenticate;
