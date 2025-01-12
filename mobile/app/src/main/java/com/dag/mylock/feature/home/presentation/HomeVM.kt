package com.dag.mylock.feature.home.presentation

import androidx.lifecycle.viewModelScope
import com.dag.mylock.base.BaseVM
import com.dag.mylock.network.CreateUserRequest
import com.dag.mylock.network.DeactivateKeyRequest
import com.dag.mylock.network.GenerateQRRequest
import com.dag.mylock.network.LockChainApi
import com.dag.mylock.network.SellHomeRequest
import com.dag.mylock.network.UnlockDoorRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import retrofit2.HttpException
import java.io.IOException
import javax.inject.Inject

@HiltViewModel
class HomeVM @Inject constructor(
    private val lockChainApi: LockChainApi
): BaseVM<HomeVS>() {

    // Function to call /key/create
    fun createUser(subUser: String, onSuccess: (String) -> Unit, onError: (String) -> Unit) {
        viewModelScope.launch {
            try {
                val response = lockChainApi.createUser(CreateUserRequest(subUser))
                if (response.isSuccessful) {
                    onSuccess(response.body()?.address ?: "Address not found")
                } else {
                    onError("Error: ${response.errorBody()?.string()}")
                }
            } catch (e: IOException) {
                onError("Network Error: ${e.message}")
            } catch (e: HttpException) {
                onError("HTTP Error: ${e.message}")
            }
        }
    }

    // Function to call /key/delete
    fun deactivateKey(keyId: String, onSuccess: (String) -> Unit, onError: (String) -> Unit) {
        viewModelScope.launch {
            try {
                val response = lockChainApi.deactivateKey(DeactivateKeyRequest(keyId))
                if (response.isSuccessful) {
                    onSuccess(response.body()?.status ?: "Key deactivated")
                } else {
                    onError("Error: ${response.errorBody()?.string()}")
                }
            } catch (e: IOException) {
                onError("Network Error: ${e.message}")
            } catch (e: HttpException) {
                onError("HTTP Error: ${e.message}")
            }
        }
    }

    // Function to call /door/unlock
    fun unlockDoor(doorId: String, accessKey: String, onSuccess: (String) -> Unit, onError: (String) -> Unit) {
        viewModelScope.launch {
            try {
                val response = lockChainApi.unlockDoor(UnlockDoorRequest(doorId, accessKey))
                if (response.isSuccessful) {
                    onSuccess(response.body()?.message ?: "Door unlocked successfully")
                } else {
                    onError("Error: ${response.errorBody()?.string()}")
                }
            } catch (e: IOException) {
                onError("Network Error: ${e.message}")
            } catch (e: HttpException) {
                onError("HTTP Error: ${e.message}")
            }
        }
    }

    // Function to call /home/sell
    fun sellHome(newOwner: String, message: String, onSuccess: (String) -> Unit, onError: (String) -> Unit) {
        viewModelScope.launch {
            try {
                val response = lockChainApi.sellHome(SellHomeRequest(newOwner, message))
                if (response.isSuccessful) {
                    onSuccess(response.body()?.transactionHash ?: "Transaction successful")
                } else {
                    onError("Error: ${response.errorBody()?.string()}")
                }
            } catch (e: IOException) {
                onError("Network Error: ${e.message}")
            } catch (e: HttpException) {
                onError("HTTP Error: ${e.message}")
            }
        }
    }

}