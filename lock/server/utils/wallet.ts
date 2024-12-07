import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';
import { IExecDataProtector, getWeb3Provider } from '@iexec/dataprotector';
import { generatePassword } from './password.js';
import { Password } from '../data/Password.data.js';

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

  const web3Provider = getWeb3Provider(wallet.privateKey);
  const dataProtector = new IExecDataProtector(web3Provider);
  const dataProtect = await generatePassword(dataProtector)
  console.log("Password is generated")
  const dataProtectObject = new Password({
      address:dataProtect.address,
      creationTimestamp:dataProtect.creationTimestamp,
      encryptionKey:dataProtect.encryptionKey,
      name:dataProtect.name,
      owner:dataProtect.owner,
      transactionHash:dataProtect.transactionHash,
  })
  await dataProtectObject.save()

  // Save the wallet data to the JSON file
  fs.writeFileSync(walletFilePath, JSON.stringify(walletData, null, 2), 'utf-8');
  console.log(`Wallet created and saved to ${walletFilePath}`);
};
