import { defineConfig } from "@wagmi/cli";
import { erc721ABI } from "wagmi";
import { react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "lib/generated.ts",
  contracts: [
    {
      name: "erc721",
      abi: erc721ABI,
    },
  ],
  plugins: [react()],
});
