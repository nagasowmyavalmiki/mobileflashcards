import React, {Component} from 'react';
import {View} from 'react-native'
import {Provider} from 'react-redux';
import MainView from './src/containers/MainView';
import CardsStatusBar from './src/components/CardsStatusBar';
import reducer from './src/reducers';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

const middleware = [thunk];
const composeEnhancers = compose;

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <CardsStatusBar/>
                    <MainView/>
                </View>
            </Provider>
        )
    }
}
