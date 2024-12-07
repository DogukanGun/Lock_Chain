import express from "express"
import { generateWallet } from "./utils/wallet.js"
import settingsRouter from "./router/settings.router.js";
import mongoose from "mongoose"
import { createConfig } from "./utils/setup.js";
import dataProtectionMiddleware from "./middleware/protector.middleware.js";

const app = express();
app.use(express.json())
const port = 3000;

app.use(dataProtectionMiddleware)
app.use('/api/settings', settingsRouter);

app.listen(port, async () => {
    console.log(`Lock listening on port ${port}`);
    mongoose.connect('mongodb://127.0.0.1:27017/test')
        .then(async (res) => {
            if (res) {
                await generateWallet();
                await createConfig();
            }
        })
})