import React, {Component} from "react";
import Home from "./HomeComponent";
import Menu from './MenuComponent';
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Dishdetail from './DishdetailComponent';

import {View, Platform, Text, ScrollView, Image, StyleSheet, SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Constants from 'expo-constants';

const Stack = createStackNavigator();

function MenuNavigator({navigation}) {
    return (
        <Stack.Navigator
            screenOptions={{
                initialRouteName: 'Menu',
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: '#512DA8'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }
            }}>
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                    title: 'Menu',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
            <Stack.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{title: 'Dishdetail'}}
            />
        </Stack.Navigator>
    );
}

function HomeNavigator({navigation}) {
    return (
        <Stack.Navigator
            screenOptions={{
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: '#512DA8'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }
            }}>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Home',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function ContactNavigator({navigation}) {
    return (
        <Stack.Navigator
            screenOptions={{
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: '#512DA8'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }
            }}>
            <Stack.Screen
                name="Contact"
                component={Contact}
                options={{
                    title: 'Contact Us',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function AboutNavigator({navigation}) {
    return (
        <Stack.Navigator
            screenOptions={{
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: '#512DA8'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }
            }}>
            <Stack.Screen
                name="About"
                component={About}
                options={{
                    title: 'About Us',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

function MainNavigator(props) {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home"
                              drawerStyle={{
                                  backgroundColor: '#D1C4E9'
                              }}>
                <Drawer.Screen name="Home"
                               component={HomeNavigator}
                               options={{
                                   drawerIcon: ({ color, focused }) =>
                                       (<Icon
                                           name='home'
                                           type='font-awesome'
                                           size={24}
                                           color={color}/>),
                               }}
                />
                <Drawer.Screen
                    name="About Us"
                    component={AboutNavigator}
                    options={{
                        drawerIcon: ({ color, focused }) =>
                            (<Icon
                                name='info-circle'
                                type='font-awesome'
                                size={24}
                                color={color}/>),
                    }}
                />
                <Drawer.Screen
                    name="Menu"
                    component={MenuNavigator}
                    options={{
                        drawerIcon: ({ color, focused }) =>
                            (<Icon
                                name='list'
                                type='font-awesome'
                                size={24}
                                color={color}/>),
                    }}
                />
                <Drawer.Screen
                    name="Contact Us"
                    component={ContactNavigator}
                    options={{
                        drawerIcon: ({ color, focused }) =>
                            (<Icon
                                name='address-card'
                                type='font-awesome'
                                size={24}
                                color={color}/>),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

class Main extends Component {

    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
                <MainNavigator/>
            </View>
        );
    }
}

export default Main;