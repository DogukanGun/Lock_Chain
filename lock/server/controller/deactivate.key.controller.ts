import handleAsync from "../utils/async.js";
import { getPasswordAndProtectedData } from "../utils/get.password.js";

/*
 *** This endpoint is used to deactive of a subkey.
 *** Deactivation can be done by only key owner.
*/
export const deavtivateKey = handleAsync(async (req, res) => {
    const { subUser } = req.body;

    const { protectedData, error: dataError } = await getPasswordAndProtectedData(req.dataProtector);
    if (!dataError) {
        console.error('Wrong password');
        console.error(dataError);
        res.status(401).json({ error: 'Wrong password' });
    }
    await req.dataProtector.revokeAllAccess({
        protectedData: protectedData[0].address,
        authorizedUser: subUser
    })

})
