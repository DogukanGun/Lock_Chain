import express from "express"
import { generateWallet } from "./utils/wallet.js"
import settingsRouter from "./router/settings.router.js";
import mongoose from "mongoose"
import { createConfig } from "./utils/setup.js";
import dataProtectionMiddleware from "./middleware/protector.middleware.js";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express();
const isCorsEnabled = process.env.ENV !== 'DEV';
if (isCorsEnabled) {
    console.log("CORS is enabled");
    app.use(cors({
        origin: 'http://localhost:3000', // Frontend origin
        methods: ['GET', 'POST'], // Allowed methods
    }));
} else {
    console.log("CORS is disabled");
    app.use((_, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
}
app.use(express.json())
const port = 3001;

app.use(dataProtectionMiddleware)
app.use('/api', settingsRouter);

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