import mongoose from "mongoose"

const passwordSchema = new mongoose.Schema({
    address: String,
    creationTimestamp:Number,
    encryptionKey:String,
    name:String,
    owner:String,
    transactionHash:String,
    schema:String
});

export const Password = mongoose.model('Password', passwordSchema);
