import handleAsync from "../utils/async.js";
import path from "path"
import fs from "fs"
import { Owner } from "../data/Owner.data.js";
import { verifyOwner } from "../utils/owner.verification.js";
import { TransferResponse } from "@iexec/dataprotector";

export const sellHome = handleAsync(async(req,res)=>{

    const { newOwner, message } = req.body;

    const contractPath = path.resolve("./LockNFT.abi.json");
    const contractJSON = JSON.parse(fs.readFileSync(contractPath, "utf8"));

    const item = await Owner.findOne().sort({ timestamp: -1 }).lean();
    if (!item) {
        console.error("No item found");
        res.status(401).json({ error: "First create user" });
        return;
    }
    if (!item.contractAddress) {
        console.error("Nft address is not saved");
        res.status(401).json({ error: "Please restart the lock" });
        return;
    }

    // Convert message to Buffer
    const encryptedMessage = Buffer.from(message, "base64");

    const { isVerified, error:verificationError } = await verifyOwner(
        encryptedMessage,
        contractJSON,
        item.contractAddress!,
        req.web3Provider
    );
    //Transfer ownership
    if(isVerified){
        const transferResponse:TransferResponse = await req.dataProtector.core.transferOwnership({
            protectedData: req.passwordAddress,
            newOwner: newOwner,
        });
        res.json(transferResponse).send();

    }else {
        res.json({error:verificationError}).send();
    }
    
})

