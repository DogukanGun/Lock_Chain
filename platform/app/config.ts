import { defineChain } from 'viem'
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const CitreaID = 5115;

export const config = createConfig({
  chains: [
    mainnet,
    sepolia,
    defineChain({
      id
        : CitreaID,
      name
        : 'Citrea Testnet',
      nativeCurrency
        : {
          name
            : 'cBTC', symbol
          : 'cBTC', decimals
          : 18
      },
      rpcUrls
        : {
        default
          : {
            http
              : ['https://rpc.testnet.citrea.xyz']
        },
      },
      blockExplorers
        : {
        default
          : {
            name
              : 'CitExplorer', url
            : 'https://explorer.testnet.citrea.xyz'
        },
      }
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [CitreaID]: http()
  },
})