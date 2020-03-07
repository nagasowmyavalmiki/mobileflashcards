import React, {Component} from 'react'
import {StatusBar, View} from 'react-native'
import PropTypes from 'prop-types'
import {orange} from "../../../utils/colors";
import {Constants} from 'expo';

export default class CardsStatusBar extends Component {
    static propTypes = {
        backgroundColor: PropTypes.string,
        barStyle: PropTypes.string
    };

    static defaultProps = {
        backgroundColor: orange,
        barStyle: 'light-content'
    };

    render() {
        const {backgroundColor, barStyle} = this.props;

        return (
            <View style={{backgroundColor, height: Constants.statusBarHeight}}>
                <StatusBar {...this.props}
                           translucent
                           backgroundColor={backgroundColor}
                           barStyle={barStyle}
                />
            </View>
        )
    }
}
