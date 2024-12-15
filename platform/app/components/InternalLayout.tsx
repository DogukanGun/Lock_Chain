"use client";
import { MetaMaskProvider } from "@metamask/sdk-react"
import { HTMLProps } from "react";
import { config } from "../config";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

const queryClient = new QueryClient()

const InternalLayout = ({ children }: Readonly<HTMLProps<HTMLDivElement>>) => {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";
  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    infuraAPIKey: process.env.NEXT_PUBLIC_INFURA_API_KEY,
    dappMetadata: {
      url: host, // using the host constant defined above
    },
  };

  return <main>
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>

        <MetaMaskUIProvider sdkOptions={sdkOptions}>
        {children}
        </MetaMaskUIProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </main>
}

export default InternalLayout