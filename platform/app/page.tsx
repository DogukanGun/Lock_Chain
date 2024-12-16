"use client"
import { MetaMaskButton, MetaMaskUIProvider, useAccount, useSDK } from "@metamask/sdk-react-ui"
import { useEffect, useState } from "react";
import { useSwitchChain } from "wagmi";
import { CitreaID } from "./config";

type LockResponse = {
  message: string,
  tx: string,
  contract: string,
  qrCodeDataUrl: string,
}

const buttonCSS = "focus:outline-none w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"

const Home = () => {

  const { isConnected, address } = useAccount()
  const [qr, setQr] = useState("")
  const switchChain = useSwitchChain()

  const createLock = async (walletAddress: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "firstUser": walletAddress
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:3001/api/start", requestOptions)
      .then((response) => response.json())
      .then((result: LockResponse) => setQr(result.qrCodeDataUrl))
      .catch((error) => console.error(error));
  }

  const buttonClick = () => {
    switchChain.switchChain({ chainId: CitreaID })

  }

  useEffect(() => {
    if (isConnected && address) {
      createLock(address)
    }
  }, [isConnected])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <MetaMaskButton theme={"light"} color="white" textStyle={{ textColor: 'black' }}></MetaMaskButton>
        <div className="w-full text-center">
          <h1 >Wallet Public Key</h1>
          {qr && <img className="w-full" src={qr} alt="QR Code" style={{ height: "200px" }} />}
        </div>
        <button onClick={buttonClick} type="button" className={buttonCSS}>
          Mint NFT
        </button>
      </main>
    </div>
  );
}


export default Home
