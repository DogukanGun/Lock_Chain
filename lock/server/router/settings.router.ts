import {Router} from 'express';
import { generateQRAndSavePK } from "../controller/qr.controller.js";

const router = Router({ mergeParams: true });

// Route to generate QR code and save the public key
router.post("/generate-qr", generateQRAndSavePK);

export default router;
