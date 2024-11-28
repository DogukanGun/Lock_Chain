import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import handleAsync from '../utils/async.js';

// Function to generate QR code and save public key to a file
export const generateQRAndSavePK = handleAsync(async (req, res, _) => {
    const { publicKey } = req.body;

    // Check if publicKey is provided
    if (!publicKey) {
        return res.status(400).json({ error: 'Public key is required' });
    }

    try {
        // Load the app's public key from the wallet.json file
        const walletFilePath = path.resolve('./wallet.json');
        if (!fs.existsSync(walletFilePath)) {
            return res.status(500).json({ error: 'wallet.json file not found' });
        }

        const walletData = fs.readFileSync(walletFilePath, 'utf-8');
        const wallet = JSON.parse(walletData);
        const appPublicKey = wallet.address;

        // Generate the QR code data URL using the app's public key
        const qrCodeDataUrl = await QRCode.toDataURL(appPublicKey);
        // Save the public key in a file named user_wallet.json
        const filePath = path.resolve('./user_wallet.json');
        fs.writeFileSync(filePath, JSON.stringify({ publicKey }), 'utf-8');

        return res.json({
            message: 'QR Code generated and public key saved successfully',
            qrCodeDataUrl,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to generate QR code or save the public key' });
    }
});
