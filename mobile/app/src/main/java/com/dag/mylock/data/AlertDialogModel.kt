package com.dag.mylock.data

import com.dag.mylock.base.navigation.Destination

data class AlertDialogModel(
    val title: String,
    val message: String,
    val textInput:Boolean = false,
    val onTextChange:((text:String)->Unit)? = null,
    val positiveButton: AlertDialogButton,
    val negativeButton: AlertDialogButton? = null,
)

data class AlertDialogButton(
    val text:String,
    val onClick:(() -> Unit)? = null,
    val navigate: Destination? = null,
    val type: AlertDialogButtonType
)


enum class AlertDialogButtonType {
    REFRESH,
    NAVIGATE,
    CLOSE,
    CUSTOM
}