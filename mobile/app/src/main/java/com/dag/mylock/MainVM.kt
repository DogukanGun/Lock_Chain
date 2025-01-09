package com.dag.mylock

import androidx.lifecycle.viewModelScope
import com.dag.mylock.base.BaseVM
import com.dag.mylock.base.navigation.DefaultNavigator
import com.dag.mylock.base.navigation.Destination
import com.dag.mylock.domain.DataPreferencesStore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainVM @Inject constructor(
    private var dataPreference: DataPreferencesStore,
    private var defaultNavigator: DefaultNavigator
): BaseVM<MainVS>() {

    fun navigate(destination: Destination){
        viewModelScope.launch {
            defaultNavigator.navigate(destination)
        }
    }

    fun isBottomNavActive(currentRoute:String?): Boolean {
        return currentRoute?.let {
            return Destination.NAV_WITHOUT_BOTTOM_NAVBAR
                .map { it.toString() }.contains(currentRoute).not()
        } ?: false
    }

}