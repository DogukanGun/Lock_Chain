package com.dag.mylock.network

data class CreateUserResponse(
    val address: String
)

data class DeactivateKeyResponse(
    val status: String
)

data class UnlockDoorResponse(
    val success: Boolean,
    val message: String
)

data class SellHomeResponse(
    val transactionHash: String,
    val status: String
)

data class GenerateQRResponse(
    val qrCode: String,
    val privateKey: String
)
