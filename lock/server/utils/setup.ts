import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';

const configFilePath = path.resolve('./config.json');


export const createConfig = async () => {
    // Check if the config file already exists
    if (fs.existsSync(configFilePath)) {
        console.log('Config file already exists. No new config will be created.');
        return;
    }

    const config = {
        id: uuidv4()
    }

    // Save the config data to the JSON file
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf-8');
    console.log(`Config created and saved to ${configFilePath}`);
}
