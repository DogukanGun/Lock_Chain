import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { Owner } from "../data/Owner.data.js";
import { verifyOwner } from "../utils/owner.verification.js";

interface VerifyRequest extends Request {
  web3Provider?: any; // Replace `any` with the actual type of your web3 provider if known
}

export const verifyMiddleware = async (
  req: VerifyRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const contractPath = path.resolve("./LockNFT.abi.json");
    const contractJSON = JSON.parse(fs.readFileSync(contractPath, "utf8"));

    const item = await Owner.findOne().sort({ timestamp: -1 }).lean();
    if (!item) {
      console.error("No item found");
      res.status(401).json({ error: "First create user" });
      return;
    }

    if (!item.contractAddress) {
      console.error("NFT address is not saved");
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

    if (!isVerified) {
      console.error("Owner verification failed", error);
      res.status(403).json({ error: "Owner verification failed" });
      return;
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in verifyMiddleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
