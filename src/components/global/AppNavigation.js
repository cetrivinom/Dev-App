import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Splash from "../../components/splash";
import UpdateVersion from "../../components/splash/UpdateVersion";
import Main from "../../components/global/Main";
import Directory from "../../components/directory";
import Login from "../../components/login";
import LoginRegisterScreen from "../../components/splash/LoginRegisterScreen";
import Registre from "../../components/registre";
import Profile from "../../components/profile";
import UpdateProfile from "../../components/profile/_children/UpdateProfileForm";
import DirectoryItem from "../../components/directory/_children/DirectoryItem";
import LinkItem from "../../components/links/_children/LinkItem";
import PointItem from "../../components/settings/_children/PointItem";
import PointItemComents from "../../components/settings/_children/PointItemComents";
import FilterSetting from "../../components/settings/_children/FilterSetting";
import CardItemFavorite from "../../components/favorites/_children/CardtemFavorite";
import EnlaceItem from "../../components/links/_children/EnlaceItem";
import SocioItem from "../../components/links/_children/SocioItem";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Links from "../../components/links";
import Favorites from "../../components/favorites";
import Settings from "../../components/settings";
import PointListResult from "../../components/settings/_children/PointListResult";
import PointListResultList from "../../components/settings/_children/PointListResultList";
import { navigationRef } from '../../../RootNavigation';

const Stack2 = createNativeStackNavigator();

function SettingsStack() {
    return (
        <Stack2.Navigator screenOptions={{ headerShown: false }}>
            <Stack2.Screen name="Settings" component={Settings} />
            <Stack2.Screen name="PointListResult" component={PointListResult} />
            <Stack2.Screen name="PointListResultList" component={PointListResultList} />
            <Stack2.Screen name="PointItem" component={PointItem} />
            <Stack2.Screen name="PointItemComents" component={PointItemComents} />
            <Stack2.Screen name="FilterSetting" component={FilterSetting} />


        </Stack2.Navigator>

    )

}

const Stack3 = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack3.Navigator screenOptions={{ headerShown: false }}>
            <Stack3.Screen name="Splash" component={Splash} />
            <Stack3.Screen name="UpdateVersion" component={UpdateVersion} />
            <Stack3.Screen name="Login" component={Login} />
            <Stack3.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} />
            <Stack3.Screen name="Main" component={Main} />
            <Stack3.Screen name="Registre" component={Registre} />


        </Stack3.Navigator>

    )

}

const Stack4 = createNativeStackNavigator();

function DirectoryStack() {
    return (
        <Stack4.Navigator screenOptions={{ headerShown: false }}>
            <Stack4.Screen name="Directory" component={Directory} />
            <Stack4.Screen name="DirectoryItem" component={DirectoryItem} />



        </Stack4.Navigator>

    )

}

const Stack5 = createNativeStackNavigator();

function LinksStack() {
    return (
        <Stack5.Navigator screenOptions={{ headerShown: false }}>

            <Stack5.Screen name="Links" component={Links} />
            <Stack5.Screen name="LinkItem" component={LinkItem} />
            <Stack5.Screen name="SocioItem" component={SocioItem} />
            <Stack5.Screen name="EnlaceItem" component={EnlaceItem} />



        </Stack5.Navigator>

    )

}
const Stack6 = createNativeStackNavigator();

function FavoritesStack() {
    return (
        <Stack6.Navigator screenOptions={{ headerShown: false }}>
            <Stack6.Screen name="Favorites" component={Favorites} />
            <Stack6.Screen name="CardItemFavorite" component={CardItemFavorite} />
        </Stack6.Navigator>

    )

}

const Stack7 = createNativeStackNavigator();

function ProfileStack() {
    return (
        <Stack7.Navigator screenOptions={{ headerShown: false }}>
            <Stack7.Screen name="Profile" component={Profile} />
            <Stack7.Screen name="UpdateProfile" component={UpdateProfile} />
        </Stack7.Navigator>

    )

}



const Tab = createBottomTabNavigator();

const AppNavigation = () => {



    return (

        <NavigationContainer ref={navigationRef}>
            <Tab.Navigator backBehavior="history" screenOptions={({ route }) => ({
                tabBarButton: [
                    "ProfileStack"
                ].includes(route.name)
                    ? () => {
                        return null;
                    }
                    : undefined,
                headerShown: false, tabBarActiveTintColor: '#00AAAD', tabBarStyle: { borderWidth: 0 }
            })}>
                <Tab.Screen name="Inicio" component={HomeStack} options={{
                    tabBarIcon: ({ color, number, focused }) => {
                        return (
                            <Icon name="home-outline" color={color} size={24} />
                        );
                    },
                    tabBarLabel: 'Inicio',
                    tabBarStyle: { display: 'none' }

                }} />
                <Tab.Screen name="SettingsStack" component={SettingsStack} options={{
                    tabBarIcon: ({ color, number, focused }) => {
                        return (
                            <Icon name={focused ? "md-location" : "md-location-outline"} color={color} size={30} />
                        );
                    },
                    tabBarLabel: 'Puntos de Servicio'

                }}
                />
                <Tab.Screen name="DirectoryStack" component={DirectoryStack} options={{
                    tabBarIcon: ({ color, number, focused }) => {
                        return (
                            <Icon name={focused ? "call-sharp" : "call-outline"} color={color} size={24} />

                        );

                    },
                    tabBarLabel: 'Directorio',
                }}
                />
                <Tab.Screen name="LinksStack" component={LinksStack} options={{
                    tabBarIcon: ({ color, number, focused }) => {
                        return (
                            <Icon name="md-open-outline" color={color} size={24} />

                        );

                    },
                    tabBarLabel: 'Contenido',
                }}
                />

                <Tab.Screen name="FavoritesStack" component={FavoritesStack} options={{
                    tabBarIcon: ({ color, number, focused }) => {
                        return (
                            <Icon name={focused ? "bookmark" : "bookmark-outline"} color={color} size={24} />

                        );

                    },
                    tabBarLabel: 'Favoritos',
                }}
                />
                <Tab.Screen name="ProfileStack" component={ProfileStack}
                />
            </Tab.Navigator>


        </NavigationContainer >
    )

}

export default AppNavigation;