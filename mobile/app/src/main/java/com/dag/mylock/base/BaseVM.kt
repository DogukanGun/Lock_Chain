package com.dag.mylock.base

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

open class BaseVM<T: BaseVS> : ViewModel() {

    protected val _viewState = MutableStateFlow<T?>(null)
    val viewState: StateFlow<T?> get() = _viewState

}