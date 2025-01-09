import { ethers } from "ethers";
import abi from "../public/LockNFT.abi.json";
import bytecodeAsJson from "../public/bytecode.json";

interface Bytecode {
    bytecode:string
}

export const mintNft = async (lockID:string,keyOwner:String):Promise<string | null | undefined> => {
    // Connect to the Ethereum network
    const provider = new ethers.JsonRpcProvider("https://rpc.testnet.citrea.xyz");
    const bytecode:Bytecode = bytecodeAsJson;
  
    // Create a wallet instance
    const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY!!, provider);
  
    // Create a ContractFactory
    const contractFactory = new ethers.ContractFactory(abi, bytecode.bytecode, wallet);
  
    console.log("Deploying contract...");
  
    try {
      // Deploy the contract
      const contract = await contractFactory.deploy(lockID, keyOwner);
  
      // Wait for the transaction to be mined
      const receipt = await contract.deploymentTransaction()?.wait();
  
      console.log("Contract deployed at:", receipt?.contractAddress);
      return receipt?.contractAddress;
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  }