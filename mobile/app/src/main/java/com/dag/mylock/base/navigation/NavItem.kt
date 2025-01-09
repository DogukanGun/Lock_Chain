package com.dag.mylock.base.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.outlined.Lock
import androidx.compose.ui.graphics.vector.ImageVector
import com.dag.mylock.base.navigation.Destination

enum class NavItem(val icon: ImageVector, val destination: Destination) {
    HOME(Icons.Filled.Home, Destination.HomeScreen),
    WALLET(Icons.Outlined.Lock, Destination.WalletScreen)
}