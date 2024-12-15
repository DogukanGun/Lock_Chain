import crypto from "crypto";

/**
 * Verify an encrypted message by decrypting it with the sender's public key
 * and checking if the decrypted message matches the public key.
 *
 * @param encryptedMessage - The message encrypted with the sender's private key.
 * @param publicKeyPem - The public key in PEM format.
 * @returns True if the decrypted message matches the public key, otherwise false.
 */
export function verifyMessage(encryptedMessage: Buffer, publicKeyPem: string): boolean {
  try {
    // Decrypt the message using the public key
    const decryptedMessage = crypto.publicDecrypt(
      {
        key: publicKeyPem,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      encryptedMessage
    );

    // Compare the decrypted message with the public key
    return decryptedMessage.toString("utf-8") === publicKeyPem;
  } catch (error) {
    console.error("Verification failed:", error.message);
    return false;
  }
}

// Example usage:
const publicKeyPem = `-----BEGIN PUBLIC KEY-----
<Your-Public-Key-Here>
-----END PUBLIC KEY-----`;

const encryptedMessage = Buffer.from("<Your-Encrypted-Message-Here>", "base64");

const isVerified = verifyMessage(encryptedMessage, publicKeyPem);

console.log("Message verified:", isVerified);
