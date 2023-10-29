import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "viem";
import { erc721ABI } from "wagmi";
import Recommendoor from "./abi/Recommendoor.json";

export default defineConfig({
  out: "lib/generated.ts",
  contracts: [
    {
      name: "erc721",
      abi: erc721ABI,
    },
    {
      name: "Recommendoor",
      abi: Recommendoor.abi as Abi,
    },
  ],
  plugins: [react()],
});
