package com.dag.mylock.feature.home.presentation.components

import androidx.annotation.RawRes
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.airbnb.lottie.compose.LottieAnimation
import com.airbnb.lottie.compose.LottieCompositionSpec
import com.airbnb.lottie.compose.LottieConstants
import com.airbnb.lottie.compose.rememberLottieComposition

import com.dag.mylock.theme.MyLockTheme

@Composable
fun HomeCard(
    text:String,
    @RawRes animationRes:Int,
    onClick: ()->Unit
){
    val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(animationRes))

    Card(
        elevation = CardDefaults.cardElevation(defaultElevation = 16.dp),
        modifier = Modifier
            .clip(RoundedCornerShape(16.dp))
            .clickable { onClick() }
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .defaultMinSize(128.dp, 256.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(Color.White)
                .padding(16.dp),
        ) {
            Text(text = text,modifier = Modifier.align(Alignment.TopCenter))
            LottieAnimation(
                modifier = Modifier.fillMaxSize().align(Alignment.Center),
                composition = composition,
                iterations = LottieConstants.IterateForever,
            )
        }
    }

}

@Composable
@Preview
fun HomeCardPreview(){
    MyLockTheme  {
        HomeCard(
            text = "QR",
            animationRes = 0
        ){}
    }
}