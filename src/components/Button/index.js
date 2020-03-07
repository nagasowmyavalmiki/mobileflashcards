import React, {Component} from 'react'
import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import {blue, white} from "../../../utils/colors";

export default class Button extends Component {
    static propTypes = {
        style: PropTypes.object,
        textStyle: PropTypes.object,
        children: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        onPress: PropTypes.func
    };

    static defaultProps = {
        style: {},
        textStyle: {},
        children: '',
        disabled: false,
        onPress: () => {
        }
    };

    onPress(event) {
        if (!this.props.disabled) {
            this.props.onPress(event);
        }
    }

    render() {
        const {style, children, textStyle, disabled} = this.props;

        return (
            <TouchableOpacity {...this.props}
                              onPress={this.onPress.bind(this)}
                              style={[styles.btn,
                                  Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn,
                                  style,
                                  // disabled ? styles.disabled : {opacity: 1}
                              ]}
            >
                <Text style={[styles.text, textStyle]}>{children}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: blue,
        padding: 10,
        height: 45,
        alignItems: 'center',
    },
    androidSubmitBtn: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        justifyContent: 'center'
    },
    iosSubmitBtn: {
        minWidth: 80,
        paddingTop: 12.5,
        borderRadius: 7,
        marginLeft: 40,
        marginRight: 40
    },
    text: {
        color: white
    },
    disabled: {
        opacity: 0.6
    }
});