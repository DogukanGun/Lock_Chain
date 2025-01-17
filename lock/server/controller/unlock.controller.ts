import handleAsync from "../utils/async.js";
import { getPasswordAndProtectedData } from "../utils/get.password.js";
import { verifyMessage } from "../utils/solve.puzzle.js";
import { GrantedAccessResponse } from "@iexec/dataprotector";
import { sendMessage } from "../utils/notification.email.js";

/*
 *** This endpoint is used to open the lock.
 ***
*/
export const unlockDoor = handleAsync(async (req, res) => {
    const { message, wallet } = req.body;
    const isMessageVerified = verifyMessage(message, wallet);
    const { protectedData, error: dataError } = await getPasswordAndProtectedData(req.dataProtector);
    const listGrantedAccess:GrantedAccessResponse = await req.dataProtector.getGrantedAccess({
        protectedData: protectedData[0],
        owner: protectedData[0].owner
    });
    if (dataError) {
        console.error("Password has not been created");
        res.status(401).json({ error: "Please restart the lock" });
        return;
    }
    if (isMessageVerified && listGrantedAccess.grantedAccess.length > 0) {
        req.web3Provider ?? sendMessage(req.web3Provider,protectedData[0].address,wallet)
        //TODO: Unlock the door from the hardware
    }else{
        console.error("Condition is not satisfied");
        res.status(401).json({ error: "Cannot unlock the lock." });
        return;
    }
    res.sendStatus(200);
})