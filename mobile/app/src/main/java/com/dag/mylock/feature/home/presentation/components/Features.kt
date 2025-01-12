package com.dag.mylock.feature.home.presentation.components

import android.content.Context
import com.dag.mylock.R
import com.dag.mylock.base.navigation.Destination



enum class ClickType {
    Navigation,
    Custom
}

enum class Features {
    Unlock,
    Sell,
    Rent
}

data class HomeCardProps(
    val text: String,
    val animationRes: Int,
    val clickType: ClickType,
    val destination: Destination? = null,
    val features: Features,
)

val features = listOf(
    HomeCardProps(
        "Unlock Apartment",
        R.raw.lock,
        ClickType.Custom,
        features = Features.Unlock,
    ),
    HomeCardProps(
        "Rent Apartment",
        R.raw.rent,
        ClickType.Custom,
        features = Features.Rent
    ),
    HomeCardProps(
        "Sell Apartment",
        R.raw.sell,
        ClickType.Custom,
        features = Features.Sell
    ),

)