# 🏗 Reco

Link to setup [Discord bot here](https://discord.com/api/oauth2/authorize?client_id=1167783878119936080&permissions=8&redirect_uri=https%3A%2F%2F0420-62-232-123-126.ngrok-free.app%2Fdiscord-oauth-callback&response_type=code&scope=guilds%20messages.read%20activities.read%20applications.commands%20guilds.join%20bot%20applications.entitlements%20applications.builds.read%20role_connections.write).

## Definitions

Social Objects - refers to any social event / activity, e.g. likes, shares, comments, etc.

## Problem

- content curation systems are centralized
- social objects are not owned by the user
- security of data is unknown

## Solution

- decentralized curation system with decentralized AI models, allowing for summaries, sentiment analysis, etc.
- social objects are owned by the user and encrypted on IPFS
- plug-and-play bots for social platforms, i.e. Discord and Telegram
- users can monetize their social objects through token-gated oracles

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/1171422a-0ce4-4203-bcd4-d2d1941d198b)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- [pnpm (v8.7.1+)](https://pnpm.io/installation)
- [docker](https://docs.docker.com/engine/install/)
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/Float-Capital/scaffold-eth-2-envio.git
cd scaffold-eth-2-envio
pnpm install
```

2. Run a local network in the first terminal:

```
pnpm chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
pnpm hardhat:deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `pnpm hardhat:deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. Ensure docker is running and then on a third terminal, start-up indexer:

```
pnpm envio:codegen
```

and then:

```
pnpm envio:dev
```

This will run a codegen for your configured envio indexer, it will install all required packages, handle db-migrations and graphql server, and begin indexing your smart contract events.

Visit the hasura console on: `http://localhost:8080`. You can see the realtime indexing of data in the "data" tab and use the graphql explorer to build queries.

For more info on writing/updating an indexer visit [docs.envio.dev/docs](https://docs.envio.dev/docs/overview).

5. On a fourth terminal, start your NextJS app:

```
pnpm start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `pnpm hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`
- Edit your envio indexer config.yaml, schema.graphql and EventHandlers.ts in `packages/envio-indexer`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
