import React, {Component} from "react";
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import {View, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Constants from 'expo-constants';

const Stack = createStackNavigator();

function MenuNavigator() {
    return (
        <NavigationContainer>
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
                    options={{title: 'Menu'}}
                />
                <Stack.Screen
                    name="Dishdetail"
                    component={Dishdetail}
                    options={{title: 'Dishdetail'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

class Main extends Component {

    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
                <MenuNavigator/>
            </View>
        );
    }
}

export default Main;