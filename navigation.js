import React from 'react'
import Home from './src/screens/Home'
import { Image } from 'react-native'
import WeeklyLimit from './src/screens/WeeklyLimit'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { LOGO } from './src/constants';
import { Provider } from 'react-redux'
import configureStore from './src/redux/store'


const store = configureStore()

export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: true,
        headerTransparent: true,

    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
                    <Stack.Screen name='Home' component={Home} options={{
                        title: '',
                        headerBackTitleVisible: false,
                        headerRight: () => <Image source={LOGO} style={{ height: 20, width: 20, right: 30 }} />
                    }}></Stack.Screen>
                    <Stack.Screen name='Limit' component={WeeklyLimit} options={{
                        title: '',
                        headerBackImage: () => <MaterialCommunityIcons name="chevron-left" size={40} color="#fff" />,
                        headerBackTitleVisible: false,
                        headerRight: () => <Image source={LOGO} style={{ height: 20, width: 20, right: 30 }} />
                    }}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>


    )
}
