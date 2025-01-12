package com.dag.mylock.di

import android.content.Context
import com.dag.mylock.base.AlertDialogManager
import com.dag.mylock.base.UITextHelper
import com.dag.mylock.base.navigation.DefaultNavigator
import com.dag.mylock.base.navigation.Destination
import com.dag.mylock.base.network.HttpLogger
import com.dag.mylock.domain.DataPreferencesStore
import com.dag.mylock.network.LockChainApi
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
class ObjectModules {
    @Provides
    @Singleton
    fun provideDataPreferencesStore(
        @ApplicationContext context: Context
    ): DataPreferencesStore {
        return DataPreferencesStore(context)
    }

    @Provides
    @Singleton
    fun provideDefaultNavigator(): DefaultNavigator {
        return DefaultNavigator(startDestination = Destination.HomeScreen)
    }

    @Provides
    @Singleton
    fun provideUITextHelper(@ApplicationContext context: Context): UITextHelper {
        return UITextHelper(context)
    }

    @Provides
    @Singleton
    fun provideAlertDialogManager(): AlertDialogManager {
        return AlertDialogManager()
    }

    @Provides
    @Singleton
    fun provideHttpClient(
        httpLogger: HttpLogger
    ): OkHttpClient {
        return OkHttpClient().newBuilder().addInterceptor(
            HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BASIC)
        ).addInterceptor(httpLogger).connectTimeout(10000L, TimeUnit.MILLISECONDS)
            .readTimeout(10000L, TimeUnit.MILLISECONDS).writeTimeout(10000L, TimeUnit.MILLISECONDS)
            .build()
    }

    @Singleton
    @Provides
    fun provideRetrofit(): LockChainApi {
        return  Retrofit.Builder()
            .baseUrl("https://localhost:8000/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(LockChainApi::class.java)
    }
}