package com.dag.mylock.network

data class CreateUserRequest(
    val subUser: String
)

data class DeactivateKeyRequest(
    val keyId: String
)

data class UnlockDoorRequest(
    val doorId: String,
    val accessKey: String
)

data class SellHomeRequest(
    val newOwner: String,
    val message: String
)

data class GenerateQRRequest(
    val userId: String
)
