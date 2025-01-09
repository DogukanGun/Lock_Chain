package com.dag.mylock.feature.home.presentation

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.dag.mylock.feature.home.presentation.components.ClickType
import com.dag.mylock.feature.home.presentation.components.HomeCard
import com.dag.mylock.feature.home.presentation.components.features


@Composable
fun HomeView(
    navController: NavController
){
    val context = LocalContext.current
    LazyVerticalGrid(
        modifier = Modifier
            .fillMaxSize()
            .padding(8.dp),
        columns = GridCells.Adaptive(128.dp),
        contentPadding = PaddingValues(8.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(features) { feature ->
            HomeCard(feature.text,feature.animationRes){
                when(feature.clickType) {
                    ClickType.Custom -> {
                        feature.onClick?.let {
                            it(context) {value->

                            }
                        }
                    }
                    ClickType.Navigation -> {
                        feature.destination?.let {destination ->
                            navController.navigate(destination)
                        }
                    }
                }

            }
        }
    }
}

@Composable
@Preview
fun HomePreview(){
    HomeView(rememberNavController())
}