import { Owner } from "../data/Owner.data.js";
import handleAsync from "../utils/async.js";
import fs from 'fs';
import path from 'path';
import { GrantedAccess } from "@iexec/dataprotector";
import { verifyOwner } from "../utils/owner.verification.js";
import { getPasswordAndProtectedData } from "../utils/get.password.js";

/*
 *** This endpoint is used to create a key for the first user.
 *** Creating a key can be done by only key owner.
*/
export const createUser = handleAsync(async (req, res) => {

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

    const { isVerified, error:verificationError } = await verifyOwner(
        encryptedMessage,
        contractJSON,
        item.contractAddress!,
        req.web3Provider
    );
    if (!isVerified) {
        console.error(verificationError);
        res.status(401).json({ error: verificationError || "Wrong password" });
        return;
    }

    const { protectedData, error: dataError } = await getPasswordAndProtectedData(req.dataProtector);

    if (dataError) {
        console.error(dataError);
        res.status(401).json({ error: dataError });
        return;
    }

    const grantedAccess: GrantedAccess = await req.dataProtector.grantAccess({
        protectedData: protectedData[0].address,
        authorizedApp: item.contractAddress,
        authorizedUser: subUser,
        pricePerAccess: 1,
        numberOfAccess: 10,
        onStatusUpdate: (title: string, isDone: boolean, payload?: Record<string, any>) => {
            console.log(title, isDone, payload);
        }
    });

    console.log("Access granted");
    res.json({ address: grantedAccess.sign });
})