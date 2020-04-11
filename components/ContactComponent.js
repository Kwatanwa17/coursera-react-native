import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {
    render() {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    title='Contact Information'>
                    <View style={{margin: 10}}>
                        <Text style={{marginBottom: 10}}>121, Clear Water Bay Road</Text>
                        <Text style={{marginBottom: 10}}>Clear Water Bay, Kowloon</Text>
                        <Text style={{marginBottom: 10}}>HONG KONG</Text>
                        <Text style={{marginBottom: 10}}>Tel: +852 1234 5678</Text>
                        <Text style={{marginBottom: 10}}>Fax: +852 8765 4321</Text>
                        <Text>Email:confusion@food.net</Text>
                    </View>
                </Card>
            </Animatable.View>
        );
    }
}

export default Contact;