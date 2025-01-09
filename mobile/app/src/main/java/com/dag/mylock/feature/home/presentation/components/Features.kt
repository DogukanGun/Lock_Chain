package com.dag.mylock.feature.home.presentation.components

import android.content.Context
import com.dag.mylock.base.navigation.Destination



enum class ClickType {
    Navigation,
    Custom
}

data class HomeCardProps(
    val text: String,
    val animationRes: Int,
    val clickType: ClickType,
    val destination: Destination? = null,
    val onClick: ((context: Context, transmitter: (String) -> Unit) -> Unit)? = null
)

val features = listOf(
    HomeCardProps(
        "QR Reader",
        0,
        ClickType.Custom,
        onClick = { context, transmitter ->

        }
    ),

)