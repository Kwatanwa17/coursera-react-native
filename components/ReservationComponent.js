import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Picker,
    Switch,
    Button,
    Modal,
    SafeAreaView,
    Alert,
    PanResponder
} from 'react-native';
import {Card} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker'
import * as Animatable from 'react-native-animatable';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true,
                _displayInForeground: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }


    render() {

        const reserveConfirmationAlert = () =>
            Alert.alert(
                "Your Reservation OK",
                "Number of Guests: " + this.state.guests + "\n" + "Smoking? " + this.state.smoking + "\n" + "Date and Time: " + this.state.date,
                [
                    {
                        text: "Cancel",
                        onPress: () => {
                            console.log("Cancel Pressed");
                            this.resetForm()
                        },
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            console.log("Cancel Pressed")
                            this.presentLocalNotification(this.state.date)
                            this.resetForm()
                        }
                    },
                ],
                {cancelable: false},
            );


        return (

            <Animatable.View animation="zoomInUp" duration={2000} delay={1000}
                             ref={this.handleViewRef}
            >
                <ScrollView>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                            <Picker.Item label="1" value="1"/>
                            <Picker.Item label="2" value="2"/>
                            <Picker.Item label="3" value="3"/>
                            <Picker.Item label="4" value="4"/>
                            <Picker.Item label="5" value="5"/>
                            <Picker.Item label="6" value="6"/>
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor='#512DA8'
                            onValueChange={(value) => this.setState({smoking: value})}>
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DateTimePicker
                            style={{flex: 2}}
                            value={this.state.date ? this.state.date : new Date()}
                            mode="datetime"
                            onChange={(event, date) => {
                                // console.log(date);
                                // console.log("state date: "+this.state.date);
                                this.setState({date: date})
                            }}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            onPress={reserveConfirmationAlert}
                            title="Reserve"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </ScrollView>
            </Animatable.View>

        );
    }

}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 1
    },
    formItem: {
        flex: 2
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DAB',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;