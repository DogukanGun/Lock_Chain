import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import handleAsync from '../utils/async.js';
import { Owner } from '../data/Owner.data.js';
import { isAddress } from "web3-validator";

/*
 *** Function to generate QR code and save public key to a file.
 *** The QR code contains the public key of the lock system
*/
export const generateQRAndSavePK = handleAsync(async (req, res) => {
        const { firstUser } = req.body
        // Load the app's public key from the wallet.json file
        //const contractPath = path.resolve("./LockNFT.abi.json");
        const walletFilePath = path.resolve('./wallet.json');
        const configFilePath = path.resolve('./config.json');
        if (!fs.existsSync(walletFilePath)) {
            return res.status(500).json({ error: 'wallet.json file not found' });
        }
        console.log("Wallet exists")

        const walletData = fs.readFileSync(walletFilePath, 'utf-8');
        const wallet = JSON.parse(walletData);
        const appPublicKey = wallet.address;
        const configData = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
        //const contractJSON = JSON.parse(fs.readFileSync(contractPath, "utf8"));
        console.log("Contract and config is read")

        // Generate the QR code data URL using the app's public key
        const qrCodeDataUrl = await QRCode.toDataURL(appPublicKey);

        //const web3 = new Web3(req.web3Provider);
        console.log("Provider is active now")

        // Unlock your wallet and get the deploying account
        let nftTx = "";
        let contractAddress = "";

        try{
            //const KeyContract = new web3.eth.Contract(contractJSON);
            console.log("Contract is created")
            if (!isAddress(firstUser)) {
                return res.status(400).json({ error: "Invalid Ethereum address provided for firstUser" });
            }
            /*await KeyContract.deploy({
                data: contractJSON.bytecode,
                arguments: [configData.id, firstUser],
            })
                .send({
                    from: req.wallet,
                    gas: "5000000", // Adjust gas limit if necessary
                })
                .on("transactionHash", (hash) => {
                    console.log("Deployment transaction hash:", hash);
                    nftTx = hash
                })
                .on("receipt", (receipt) => {
                    console.log("Contract deployed at:", receipt.contractAddress);
                    contractAddress = receipt.contractAddress;
                });*/
                console.log("Contract is deployed")

        }catch(err){
            console.log(err)
            console.log(configData)
        }
        console.log("Saving owner")
        await new Owner({
            contractAddress: contractAddress,
            wallet: firstUser
        }).save();
        console.log("Saved owner")
        
        return res.json({
            message: 'QR Code generated and public key saved successfully',
            tx: nftTx,
            contract: contractAddress,
            qrCodeDataUrl,
        });
    
});
