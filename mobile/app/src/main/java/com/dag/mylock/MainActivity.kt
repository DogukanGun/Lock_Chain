package com.dag.mylock

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.blur
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.zIndex
import androidx.lifecycle.lifecycleScope
import com.dag.mylock.base.AlertDialogManager
import com.dag.mylock.base.components.CustomAlertDialog
import com.dag.mylock.base.components.Visibility
import com.dag.mylock.base.navigation.BottomNavbar
import com.dag.mylock.base.navigation.DefaultNavigationHost
import com.dag.mylock.base.navigation.DefaultNavigator
import com.dag.mylock.base.navigation.Destination
import com.dag.mylock.base.navigation.NavItem
import com.dag.mylock.data.AlertDialogModel
import com.dag.mylock.domain.DataPreferencesStore
import com.dag.mylock.theme.MyLockTheme
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import org.web3j.crypto.Keys
import org.web3j.utils.Numeric
import java.security.SecureRandom
import javax.inject.Inject

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    private val currentRoute = mutableStateOf<String?>(null)
    private val mainVM: MainVM by viewModels()

    @Inject
    lateinit var alertDialogManager: AlertDialogManager

    @Inject
    lateinit var defaultNavigator: DefaultNavigator

    @Inject
    lateinit var preferencesStore: DataPreferencesStore

    private fun generatePrivateKeyIfNotExist(){
        lifecycleScope.launch {
            preferencesStore.read(DataPreferencesStore.PRIVATE_KEY).collectLatest {
                if (it == null) {
                    // Generate a new private key
                    val secureRandom = SecureRandom()
                    val keyPair = Keys.createEcKeyPair(secureRandom)

                    // Extract private key as a hexadecimal string
                    val privateKey = keyPair.privateKey
                    val privateKeyHex = Numeric.toHexStringNoPrefix(privateKey)
                    val address = Keys.getAddress(keyPair)
                    preferencesStore.write(DataPreferencesStore.PUBLIC_KEY,address)
                    preferencesStore.write(DataPreferencesStore.PRIVATE_KEY,privateKeyHex)
                }
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val showAlert = mutableStateOf(false)
        val alertDialogModel = mutableStateOf<AlertDialogModel?>(null)
        if (lifecycleScope.isActive) {
            lifecycleScope.launch {
                alertDialogManager.alertFlow.collect { model ->
                    alertDialogModel.value = model
                    showAlert.value = true
                }
            }
        }
        setContent {
            MyLockTheme {
                Box(
                    modifier = Modifier.fillMaxSize()
                ) {
                    Surface(
                        modifier = Modifier.fillMaxSize(),
                        color = MaterialTheme.colorScheme.background
                    ) {
                        Column(
                            verticalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxSize(),
                        ) {
                            DefaultNavigationHost(
                                navigator = defaultNavigator,
                                modifier = Modifier.weight(1f),
                            ) {
                                currentRoute.value = it.destination.route
                                    ?.split(".")?.last()
                            }
                            if (mainVM.isBottomNavActive(currentRoute.value)) {
                                BottomNavbar(
                                    items = NavItem.values().asList(),
                                    currentDestination = currentRoute.value
                                        ?: Destination.HomeScreen.toString(),
                                    onClick = {
                                        mainVM.navigate(it)
                                    }
                                )
                            }
                        }
                    }
                    Visibility(case = showAlert.value && alertDialogModel.value != null) {
                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .background(Color.Black.copy(alpha = 0.5f))
                                .blur(16.dp)
                                .zIndex(10f)
                        ) {
                            CustomAlertDialog(
                                alertDialogModel = alertDialogModel.value!!,
                                showAlert = showAlert,
                                defaultNavigator = defaultNavigator
                            )
                        }
                    }
                }
            }
        }
    }
}