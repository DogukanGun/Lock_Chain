import {Router} from 'express';
import { generateQRAndSavePK } from "../controller/qr.controller.js";
import { createUser } from '../controller/create.subuser.controller.js';
import { deavtivateKey } from '../controller/deactivate.key.controller.js';
import { unlockDoor } from '../controller/unlock.controller.js';
import { verifyMiddleware } from '../middleware/verify.middleware.js';
import { sellHome } from '../controller/sell.controller.js';

const router = Router({ mergeParams: true });

router.post("/start", generateQRAndSavePK);
router.post("/key/create", createUser);
router.post("/key/delete",verifyMiddleware, deavtivateKey);
router.post("/door/unlock", unlockDoor);
router.post("/home/sell", sellHome);

export default router;
