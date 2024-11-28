import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';

const walletFilePath = path.resolve('./wallet.json');

// Function to generate a new Ethereum wallet and save it to a file
export const generateWallet = async () => {
  // Check if the wallet file already exists
  if (fs.existsSync(walletFilePath)) {
    console.log('Wallet file already exists. No new wallet will be created.');
    return;
  }

  // Generate a new Ethereum wallet
  const wallet = ethers.Wallet.createRandom();

  // Extract the private and public keys
  const walletData = {
    privateKey: wallet.privateKey,
    address: wallet.address,
  };

  // Save the wallet data to the JSON file
  fs.writeFileSync(walletFilePath, JSON.stringify(walletData, null, 2), 'utf-8');
  console.log(`Wallet created and saved to ${walletFilePath}`);
};
