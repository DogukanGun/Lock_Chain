# Lock_Chain

Lock_Chain is a decentralized smart lock system utilizing blockchain technology for secure and automated access control. This project combines **Citrea** and **iExec** technologies to ensure a privacy-focused, secure, and decentralized approach to smart lock management.

## Overview
Lock_Chain uses **Citrea** to tokenize physical locks as Real World Assets (RWAs) through NFTs, ensuring the lock's ownership is securely stored on the blockchain. **iExec** handles off-chain cryptographic key management and ownership verification, ensuring that only the authorized NFT holder can unlock the door.

## How It Works
1. **Lock Creation and NFT Minting:** Citrea mints an NFT representing the lock ownership.
2. **Secure Unlock Requests:** The user sends an encrypted unlock request using Ed25519 encryption.
3. **Key Management:** iExec generates and verifies cryptographic keys.
4. **Ownership Verification:** iExec validates ownership by checking the user's public key against the NFT data.
5. **Door Unlock and Notifications:** Upon successful verification, the door unlocks, and an email notification is sent.

## Diagrams
The following diagrams illustrate the workflow and technical architecture of the Lock_Chain system:

### Sequence Diagram
The sequence diagram outlines the step-by-step interactions among the actor, Citrea, Door, and iExec components:
- The actor initiates the lock creation via the mobile app.
- Citrea mints an NFT representing the lock ownership and transfers it to the user.
- To unlock the door, the actor sends an encrypted message.
- iExec generates and verifies the cryptographic key, checking ownership against the NFT data.
- If ownership is confirmed, the door unlocks and an email notification is sent.

  ![Lockchain1](https://github.com/user-attachments/assets/913ff12e-635b-4e0b-8b4c-d5e05f3af49f)


### Architecture Diagram
The architecture diagram provides an overview of the system's structure:
- The actor interacts with the mobile app to perform lock-related actions.
- Citrea manages the NFT-based lock ownership, tokenizing it as a Real World Asset (RWA).
- The lock communicates with an API and UI for control.
- iExec handles door key management and cryptographic verification.

  ![Lockchain2](https://github.com/user-attachments/assets/33863af5-b39b-4d35-8bb2-ad967b4ea4a3)


## Technologies Used
- **Citrea:** For NFT-based lock ownership representation.
- **iExec:** For secure off-chain computation and key management.

## Future Goals
- Develop a working prototype using a Raspberry Pi, electronic lock, and 3D printer.
- Collaborate with university consultants and interns for testing and refinement.
- Seek investors for market expansion.
