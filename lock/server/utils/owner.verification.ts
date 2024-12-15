import Web3 from "web3";
import { verifyMessage } from "../utils/solve.puzzle.js";
import { IOwner, Owner } from "../data/Owner.data.js";
import { IPassword, Password } from "../data/Password.data.js";

interface VerificationResult {
    isVerified: boolean;
    error?: string;
}

export const verifyOwner = async (
    encryptedMessage: Buffer,
    contractJSON: any,
    contractAddress: string,
    web3Provider: string
): Promise<VerificationResult> => {
    try {
        const web3 = new Web3(web3Provider);
        const KeyContract = new web3.eth.Contract(contractJSON.abi, contractAddress);

        // Fetch the owner from the contract
        const owner: string = await KeyContract.methods.ownerOf(0).call();

        // Fetch the latest wallet and password info
        const item: IOwner | null = await Owner.findOne()
            .select("wallet")
            .sort({ timestamp: -1 })
            .lean<IOwner>();

        const password: IPassword | null = await Password.findOne()
            .select("address owner")
            .sort({ creationTimestamp: -1 })
            .lean<IPassword>();

        if (!item || !password) {
            return { isVerified: false, error: "Owner or password data not found" };
        }

        const isMessageVerified = verifyMessage(encryptedMessage, item.wallet); // Pass Buffer and wallet
        const isOwnerVerified = owner === item.wallet && password.owner === owner;

        if (isMessageVerified && isOwnerVerified) {
            return { isVerified: true };
        } else {
            return { isVerified: false, error: "Verification failed" };
        }
    } catch (err) {
        console.error("Error during verification:", err);
        return { isVerified: false, error: "Internal verification error" };
    }
};
