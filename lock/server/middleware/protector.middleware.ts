import handleAsync from "../utils/async.js";
import path from 'path';
import fs from 'fs';
import { IExecDataProtector, getWeb3Provider } from '@iexec/dataprotector';
import { generatePassword } from "../utils/password.js";

const walletFilePath = path.resolve('./wallet.json');

const dataProtectionMiddleware = handleAsync(async (req, res, next) => {
    try {
        // Check if wallet.json exists
        if (!fs.existsSync(walletFilePath)) {
          console.error('Wallet file does not exist.');
          res.status(400).json({ error: 'Wallet file not found.' });
          return;
        }

    
        // Read the private key from the wallet file
        const walletData = fs.readFileSync(walletFilePath, 'utf-8');
        const wallet = JSON.parse(walletData);
    
        if (!wallet.privateKey) {
          console.error('Private key not found in wallet file.');
          res.status(400).json({ error: 'Private key missing in wallet file.' });
          return;
        }
    
        // Create the web3Provider
        const web3Provider = getWeb3Provider(wallet.privateKey);
    
        // Create the dataProtector instance
        const dataProtector = new IExecDataProtector(web3Provider);
    
        // Generate the password
        const dataProtect = await generatePassword(dataProtector);
    
        // Attach objects to the request object for downstream use
        (req as any).web3Provider = web3Provider;
        (req as any).dataProtector = dataProtector;
        (req as any).dataProtect = dataProtect;
        (req as any).wallet = wallet;
    
        // Proceed to the next middleware or route handler
        next();
      } catch (error) {
        console.error('Error in data protection middleware:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

export default dataProtectionMiddleware;