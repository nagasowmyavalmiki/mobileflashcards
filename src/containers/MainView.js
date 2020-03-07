import React, {Component} from 'react';
import {ActivityIndicator, Platform, View} from 'react-native'
import {StackNavigator, TabNavigator} from 'react-navigation';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import {DeckListView} from '../containers/DeckListView';
import NewDeckView from '../containers/NewDeckView';
import DeckView from '../containers/DeckView';
import AddCardView from '../containers/AddCardView';
import QuizView from '../containers/QuizView';
import {blue, orange, white} from '../../utils/colors';
import {getDecks} from '../../utils/api';
import {setDeckListAction} from "../actions/deckActions";
import {setLocalNotification} from "../notification/notification";
import {connect} from "react-redux";

const Tabs = TabNavigator({
        Decks: {
            screen: DeckListView,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor}/>
            }
        },
        NewDeck: {
            screen: NewDeckView,
            navigationOptions: {
                tabBarLabel: 'New Deck',
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-add'
                                                       size={30}
                                                       color={tintColor}/>
            }
        }
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? orange : white,
            indicatorStyle: {
                backgroundColor: blue
            },
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : orange,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    });

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            headerStyle: {
                height: 0
            }
        }
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: orange
            }
        }
    },
    AddCardView: {
        screen: AddCardView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: orange
            }
        }
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: orange
            }
        }
    }
});

class MainView extends Component {
    state = {
        loading: true
    };

    async componentWillMount() {
        setLocalNotification();
        let decks = await getDecks();
        if (!decks) {
            // decks = this.populateInitialDeckList();
            decks = {};
        }
        this.props.setDeckListAction(decks);
        this.setState({loading: false});
    }

    populateInitialDeckList() {
        return {
            React: {
                author: 'Homer',
                title: 'React',
                votes: [1, 3, 2, 3, 2, 3, 3, 3],
                questions: [
                    {
                        question: 'What is React?',
                        answer: 'A library for managing user interfaces'
                    },
                    {
                        question: 'Where do you make Ajax requests in React?',
                        answer: 'The componentDidMount lifecycle event'
                    }
                ]
            },
            JavaScript: {
                author: 'Toad',
                title: 'JavaScript',
                votes: [],
                questions: [
                    {
                        question: 'What is a closure?',
                        answer: 'The combination of a function and the lexical environment within which that function was declared.'
                    }
                ]
            }
        }
    }

    render() {
        const {loading} = this.state;

        return (
            <View style={{flex: 1}}>
                {loading ?
                    <ActivityIndicator style={{padding: 290}} size="large" color={blue}/>
                    :
                    <MainNavigator/>
                }
            </View>
        )
    }
}

export default connect(null, {setDeckListAction})(MainView)