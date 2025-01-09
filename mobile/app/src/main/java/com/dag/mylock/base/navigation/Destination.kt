package com.dag.mylock.base.navigation
import kotlinx.serialization.Serializable

sealed interface Destination {
    @Serializable
    data object Splash: Destination

    @Serializable
    data object HomeScreen: Destination

    @Serializable
    data object ScannerScreen: Destination

    @Serializable
    data object TextExtractionScreen: Destination

    @Serializable
    data object WalletScreen: Destination

    companion object {
        val NAV_WITHOUT_BOTTOM_NAVBAR = listOf(Splash)
    }
}