package com.dag.mylock.network

import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface LockChainApi {
    @POST("/key/create")
    fun createUser(@Body request: CreateUserRequest): Response<CreateUserResponse>

    @POST("/key/delete")
    fun deactivateKey(@Body request: DeactivateKeyRequest): Response<DeactivateKeyResponse>

    @POST("/door/unlock")
    fun unlockDoor(@Body request: UnlockDoorRequest): Response<UnlockDoorResponse>

    @POST("/home/sell")
    fun sellHome(@Body request: SellHomeRequest): Response<SellHomeResponse>

    @POST("/start")
    fun generateQR(@Body request: GenerateQRRequest): Response<GenerateQRResponse>
}
