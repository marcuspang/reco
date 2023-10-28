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
          <h1>Please login</h1>
        ) : !proofOfHumanityExists ? (
          <>
            <h1 className="">Please register your PoH here</h1>
            <a href="https://robotornot.mainnet-beta.rarimo.com" className="btn btn-primary">
              Prove your Humanity
            </a>
          </>
        ) : (
          <h1>Authenticated!</h1>
        )}
      </div>
    </>
  );
};

export default Authenticate;
