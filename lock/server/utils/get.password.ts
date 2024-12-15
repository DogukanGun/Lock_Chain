import { IPassword, Password } from "server/data/Password.data";
import { ProtectedData } from "@iexec/dataprotector";

interface PasswordAndProtectedDataResult {
    protectedData: ProtectedData[];
    error?: string;
}

export const getPasswordAndProtectedData = async (
    dataProtector: any
): Promise<PasswordAndProtectedDataResult> => {
    try {
        const password = await Password.findOne()
            .sort({ creationTimestamp: -1 })
            .lean<IPassword>();

        if (!password) {
            return { protectedData: [], error: "NFT address is not saved. Please restart the lock." };
        }

        const protectedDataRes: ProtectedData[] = await dataProtector.getProtectedData({
            owner: password.owner,
            protectedDataAddress: password.address
        });

        return { protectedData: protectedDataRes };
    } catch (err) {
        console.error("Error fetching password or protected data:", err);
        return { protectedData: [], error: "Failed to retrieve protected data." };
    }
};
