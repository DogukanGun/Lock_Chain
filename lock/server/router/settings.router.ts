import {Router} from 'express';
import { generateQRAndSavePK } from "../controller/qr.controller.js";
import { createUser } from 'server/controller/create.subuser.controller.js';
import { deavtivateKey } from 'server/controller/deactivate.key.controller.js';
import { unlockDoor } from 'server/controller/unlock.controller.js';

const router = Router({ mergeParams: true });

router.post("/start", generateQRAndSavePK);
router.post("/key/create", createUser);
router.post("/key/delete", deavtivateKey);
router.post("/door/unlock", unlockDoor);

export default router;
