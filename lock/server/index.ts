import express from "express"
import {generateWallet} from "./utils/wallet.js"
import settingsRouter from "./router/settings.router.js";

const app = express();
app.use(express.json())
const port = 3000;

app.use('/api/settings', settingsRouter);

app.listen(port, async() => {
    console.log(`Lock listening on port ${port}`);
    await generateWallet();
    console.log(`Lock is ready to use`);
})