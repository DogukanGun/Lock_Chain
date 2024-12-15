import handleAsync from "server/utils/async";
import { getPasswordAndProtectedData } from "server/utils/get.password";
import { verifyMessage } from "server/utils/solve.puzzle";
import { GrantedAccessResponse } from "@iexec/dataprotector";

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
        //TODO: Unlock the door.
    }
    res.sendStatus(200);
})