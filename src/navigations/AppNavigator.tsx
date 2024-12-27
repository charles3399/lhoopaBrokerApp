import {
    useState,
    useEffect,
    memo
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Linking,
    Platform,
    Image,
} from 'react-native';

import {
    colors,
    fonts
} from '_styles/globalStyles';

import Login from '_screens/login/Login';
import Dashboard from '_screens/dashboard/Dashboard';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import { CommonActions } from '@react-navigation/native';
import _ from 'lodash';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    menuIcon:{
        height:25,
        width:25,
        resizeMode: 'contain'
    },
});

const Tabs = () => {
    return (
        <Tab.Navigator 
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({focused, size, color}) => {
                    let iconName;
                    let containerStyle = {
                        padding: 8,
                        borderRadius: 9,
                        backgroundColor: focused ? colors.redPrimary : 'transparent',
                    }

                    switch (route.name) {
                        case 'Dashboard':
                            iconName = '';
                            return (
                                // <Icon name={iconName} size={size} color={color}/>
                                <View style={containerStyle}>
                                    <Image
                                        // style={styles.tinyIcon}
                                        style={styles.menuIcon}
                                        source={require('../assets/images/icons/navigation/home-new.png')}
                                    />
                                </View>
                            );
                        case 'InventoryStack':
                            iconName = 'nav-inventories.png';
                            return (
                                <View style={containerStyle}>
                                    <Image
                                        style={styles.menuIcon}
                                        source={require('../assets/images/icons/navigation/inventory-new.png')}
                                    />
                                </View>
                            );
                        case 'SoldStack':
                            iconName = 'nav-sold.png';
                            return (
                                <View style={containerStyle}>
                                    <Image
                                        style={styles.menuIcon}
                                        source={require('../assets/images/icons/navigation/closed-deals.png')}
                                    />
                                </View>
                            );
                        case 'ProfileStack':
                            iconName = 'nav-sold.png';
                            return (
                                <View style={containerStyle}>
                                    <Image
                                        style={styles.menuIcon}
                                        source={require('../assets/images/icons/navigation/profile-new.png')}
                                    />
                                </View>
                            );
                        case 'SubmitPropertyStack':
                            iconName = 'nav-submit-property.png';
                            return (
                                <View style={containerStyle}>
                                    <Image
                                        style={styles.menuIcon}
                                        source={require('../assets/images/icons/navigation/submitted-properties-new.png')}
                                    />
                                </View>
                            );
                        case 'DocumentStack':
                            iconName = 'nav-documents.png';
                            return (
                                <View style={containerStyle}>
                                    <Image
                                        style={styles.menuIcon}
                                        source={require('_assets/images/icons/dashboard/client-docs-nav.png')}
                                    />
                                </View>
                            );
                        case 'Network':
                            iconName = 'nav-network.png';
                            return (
                                <View style={containerStyle}>
                                    <Image
                                        style={[styles.menuIcon, {opacity: .4}]}
                                        source={require('../assets/images/icons/navigation/network.png')}
                                    />
                                </View>
                            );
                        case 'TransactionStack':
                            iconName = 'nav-network.png';
                            return (
                                <View style={containerStyle}>
                                    <Image
                                        style={styles.menuIcon}
                                        source={require('_assets/images/icons/navigation/my-transactions-new.png')}
                                    />
                                </View>
                            );
                        default:
                            break;
                    }
                }, 
                tabBarLabel: ({focused}) => {
                    var name = route.name;
                    if ( name == "SubmitPropertyStack" ) {
                        name = "Submitted Properties"
                    }

                    if ( name == "Sold" ) {
                        name = "Transactions"
                    }

                    if ( name == "InventoryStack" ) {
                        name = "Inventory"
                    }

                    if ( name == "SoldStack" ) {
                        name = "Closed\nDeals"
                    }

                    if ( name == "TransactionStack" ) {
                        name = "My\nTransactions"
                    }

                    if ( name == "ProfileStack" ) {
                        name = "My\nAccount"
                    }

                    if ( name == "DocumentStack" ) {
                        name = "Documents"
                    }

                    var disabled = ['Transactions', 'Network']

                    if (disabled.includes(name)) {
                        return (
                            <Text
                                maxFontSizeMultiplier={1}
                                style={{
                                    opacity: .4,
                                    color: '#fff',
                                    fontFamily: fonts.interSemiBold,
                                    fontSize: 9.5,
                                    textAlign: "center",
                                    alignContent: 'center',
                                    flex: 1,
                                    marginTop: 5
                                }}
                            >{name}</Text>
                        )
                    } else {
                        return (
                            <Text
                                maxFontSizeMultiplier={1}
                                style={{
                                    color: '#fff',
                                    fontFamily: fonts.interSemiBold,
                                    fontSize: 9.5,
                                    textAlign: "center",
                                    alignContent: 'center',
                                    flex: 1,
                                    marginTop: 5
                                }}
                            >{name}</Text>
                        )
                    }

                },
                tabBarStyle: {
                    elevation: 0,
                    borderTopWidth: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.bluePrimary,
                    borderTopStartRadius: 35,
                    borderTopEndRadius: 35,
                    height: Platform.OS == 'ios' ? 120 : 80,
                    paddingTop: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    position: 'absolute'
                },
                tabBarHideOnKeyboard: true,
            })}
        >
            <Tab.Screen
                component={Dashboard} 
                options={{ animation: 'none' }}
                name='Dashboard'
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: 'Dashboard' },
                                ],
                            })
                        );
                    },
                })}
            />
            {/* <Tab.Screen
                component={NonTabs} 
                name='NonTabs'
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false, // if you don't want to see the tab bar
                }}
            />

            <Tab.Screen 
                component={SubmitPropertyStack} 
                name='SubmitPropertyStack'
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();
                        navigation.navigate('SubmitPropertyStack', {screen:'SubmitProperty'})
                    },
                })}
            />

            {<Tab.Screen 
                component={InventoryStack} 
                name='InventoryStack'
                
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: 'InventoryStack' },
                                ],
                            })
                        );
                    },
                })}
                options={auth.user.role_id == "316" ? {
                    tabBarButton: () => null,
                    tabBarVisible: false, // if you don't want to see the tab bar
                } : undefined}
            />} */}

            {/* <Tab.Screen 
                component={SoldStack} 
                name='SoldStack'
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false, // if you don't want to see the tab bar
                }}
            /> */}

            {/* <Tab.Screen 
                component={TransactionStack} 
                name='TransactionStack'
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: 'TransactionStack' },
                                ],
                            })
                        );
                    },
                })}
                options={auth.user.role_id == "316" ? {
                    tabBarButton: () => null,
                    tabBarVisible: false, // if you don't want to see the tab bar
                } : undefined}
            />

            <Tab.Screen 
                component={ProfileStack} 
                name='ProfileStack'
            />


            <Tab.Screen 
                component={Commission} 
                name='Commission'
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false, // if you don't want to see the tab bar
                }}
            />

            <Tab.Screen 
                component={DocumentStack} 
                name='DocumentStack'
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();
                        navigation.navigate('DocumentStack', {screen:'Documents'})
                    },
                })}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false, // if you don't want to see the tab bar
                }}
            />
            <Tab.Screen 
                component={Network} 
                name='Network'
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false, // if you don't want to see the tab bar
                }}
                
            /> */}
        </Tab.Navigator>
    )
}

export default memo(function AppNavigator(): React.JSX.Element {
    const [alertShow, setAlertShow] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [confirm, setConfirm] = useState<() => {}>();

    let initRoute: string = 'Login';

    const goToPlaystore = () => {
        Linking.openURL(Platform.OS == 'ios' ? "https://apps.apple.com/us/app/lhoopa-broker-app/id6447653907" : "http://play.google.com/store/apps/details?id=com.lhoopa.broker_app")
        setAlertShow(true)
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShadowVisible: false
                }}
                initialRouteName={initRoute}
            >
                <Stack.Screen 
                    component={Tabs} 
                    name='Tabs'
                    options={({ navigation, route }) => ({
                        headerShown: false,
                    })} 
                />

                <Stack.Screen 
                    component={Login} 
                    name='Login'
                    options={({ navigation, route }) => ({
                        headerShown: false,
                    })} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
})