import mongoose from "mongoose"

const ownerSchema = new mongoose.Schema({
    contractAddress: String,
    wallet:String,
});

export const Owner = mongoose.model('Owner', ownerSchema);
