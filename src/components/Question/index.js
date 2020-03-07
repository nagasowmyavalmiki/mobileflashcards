import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import TextButton from '../TextButton';
import {white} from "../../../utils/colors";

export default class Question extends Component {
    static propTypes = {
        flipPage: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

    static defaultProps = {
        flipPage: () => {
        },
        title: 'Question title'
    };

    render() {
        const {flipPage, title} = this.props;

        return (
            <View style={styles.btnContainer}>
                <Text style={styles.title}>{title}</Text>
                <TextButton onPress={flipPage}>Answer</TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    }
});