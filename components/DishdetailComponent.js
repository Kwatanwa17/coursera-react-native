import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList, SafeAreaView} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {DISHES} from '../shared/dishes';
import Constants from "expo-constants";
import {COMMENTS} from '../shared/comments';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
};

function RenderDish(props) {

    const dish = props.dish;

    if (dish != null) {
        return (
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                <Text style={{margin: 10}}>{dish.description}</Text>
                <Icon
                    raised
                    reverse
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                />
            </Card>
        );
    } else {
        return (<View></View>);
    }
}

function RenderComments(props) {

    const comments = props.comments;

    const scrollEnabled = props.scrollEnabled;

    const renderCommentItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={scrollEnabled}
            />
        </Card>
    );
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: [],
            scrollEnabled: false
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.setState({favorites: this.state.favorites.concat(dishId)});
    }

    render() {
        console.log(this.props.route.params.dishId);
        const dishId = this.props.route.params.dishId ? this.props.route.params.dishId : '';

        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <RenderDish dish={this.props.dishes.dishes[+dishId]}
                                favorite={this.state.favorites.some(el => el === dishId)}
                                onPress={() => this.markFavorite(dishId)}
                    />
                    <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
                                    scrollEnabled={this.state.scrollEnabled}/>
                </ScrollView>
            </SafeAreaView>
        );
    }

}

export default connect(mapStateToProps)(DishDetail);