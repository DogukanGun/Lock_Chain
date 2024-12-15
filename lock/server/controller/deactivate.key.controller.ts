import handleAsync from "server/utils/async";
import fs from 'fs';
import path from 'path';
import { Owner } from "server/data/Owner.data";
import { verifyOwner } from "server/utils/owner.verification";
import { getPasswordAndProtectedData } from "server/utils/get.password";

/*
 *** This endpoint is used to deactive of a subkey.
 *** Deactivation can be done by only key owner.
*/
export const deavtivateKey = handleAsync(async (req, res) => {
    const { message, subUser } = req.body;

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

    const { isVerified, error } = await verifyOwner(
        encryptedMessage,
        contractJSON,
        item.contractAddress!,
        req.web3Provider
    );

    if (isVerified) {
        const { protectedData, error: dataError } = await getPasswordAndProtectedData(req.dataProtector);
        if(!dataError){
            console.error('Wrong password');
            console.error(error);
            res.status(401).json({ error: 'Wrong password' });
        }
        await req.dataProtector.revokeAllAccess({
            protectedData:protectedData[0].address,
            authorizedUser:subUser
        })
    } else {
        console.error('Wrong password');
        console.error(error);
        res.status(401).json({ error: 'Wrong password' });
    }
})
