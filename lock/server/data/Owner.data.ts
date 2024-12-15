import mongoose from "mongoose"

const ownerSchema = new mongoose.Schema({
    contractAddress: String,
    wallet: String,
    timestamp: { type: Date, default: Date.now }
});

export interface IOwner extends Document {
    contractAddress: string;
    wallet: string;
    timestamp: Date;
}

export const Owner = mongoose.model('Owner', ownerSchema);
