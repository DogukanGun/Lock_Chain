"use client"
import axios from "axios";
import { MetaMaskButton, MetaMaskUIProvider, useAccount, useSDK } from "@metamask/sdk-react-ui"
import { useEffect, useState } from "react";

type LockResponse = {
  message: string,
  tx: string,
  contract: string,
  qrCodeDataUrl: string,
}

const Home = () => {

  const { isConnected, address } = useAccount()
  const [qr, setQr] = useState("")

  const createLock = async (walletAddress: string) => {
    const res = await axios.post("http://localhost:3001/api/start", {
      firstUser: walletAddress
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: LockResponse = res.data;
    return data.qrCodeDataUrl
  }

  useEffect(() => {
    if (isConnected && address) {
      createLock(address).then((res) => {
        setQr(res)
      })
    }
  }, [isConnected])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <MetaMaskButton theme={"light"} color="white" textStyle={{ textColor: 'black' }}></MetaMaskButton>
        <p className="text-white">{qr}</p>
      </main>
    </div>
  );
}


export default Home
