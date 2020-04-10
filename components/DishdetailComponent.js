import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList, SafeAreaView, StyleSheet, Button, Modal} from 'react-native';
import {Card, Icon, Input, Rating, AirbnbRating} from 'react-native-elements';
import {DISHES} from '../shared/dishes';
import Constants from "expo-constants";
import {COMMENTS} from '../shared/comments';

import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

function RenderDish(props) {

    const dish = props.dish;

    if (dish != null) {
        return (
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                <Text style={{margin: 10}}>{dish.description}</Text>
                <View style={styles.iconRow}>
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DAB'
                        onPress={props.handleComment}

                    />
                </View>

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
            scrollEnabled: false,
            showModal: false
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleComment() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    render() {
        console.log(this.props.route.params.dishId);
        const dishId = this.props.route.params.dishId ? this.props.route.params.dishId : '';

        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <RenderDish dish={this.props.dishes.dishes[+dishId]}
                                favorite={this.props.favorites.some(el => el === dishId)}
                                onPress={() => this.markFavorite(dishId)}
                                handleComment={() => this.handleComment()}
                    />
                    <RenderComments
                        comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
                        scrollEnabled={this.state.scrollEnabled}/>
                </ScrollView>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    // onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                >

                    <SafeAreaView style={styles.modal}>

                        <Text>This is a modal</Text>

                        <Button
                            onPress={() => {
                                this.toggleModal();
                            }}
                            color='#512DA8'
                            title='SUBMIT'
                        >
                        </Button>
                        <Button
                            onPress={() => {
                                this.toggleModal();
                            }}
                            color='#512DA8'
                            title='CANCEL'
                        >
                        </Button>
                    </SafeAreaView>

                </Modal>
            </SafeAreaView>

        );
    }

}

const styles = StyleSheet.create({
    iconRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);