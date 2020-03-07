import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import TextButton from '../TextButton';
import Button from '../Button';
import {red, white, green} from "../../../utils/colors";

export default class Answer extends Component {
    static propTypes = {
        flipPage: PropTypes.func.isRequired,
        onPressCorrect: PropTypes.func.isRequired,
        onPressIncorrect: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

    static defaultProps = {
        flipPage: () => {
        },
        onPressCorrect: () => {
        },
        onPressIncorrect: () => {
        },
        title: 'Answer title'
    };

    render() {
        const {flipPage, title, onPressCorrect, onPressIncorrect} = this.props;

        return (
            <View style={styles.btnContainer}>
                <Text style={styles.title}>{title}</Text>
                <TextButton onPress={flipPage}>Question</TextButton>

                <View style={styles.buttonsContainer}>
                    <Button style={StyleSheet.flatten(styles.incorrectButton)}
                            onPress={onPressIncorrect}
                    >
                        Incorrect
                    </Button>

                    <Button style={StyleSheet.flatten(styles.correctButton)}
                            onPress={onPressCorrect}
                    >
                        Correct
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 350,
        marginTop: 40
    },
    incorrectButton: {
        backgroundColor: red
    },
    correctButton: {
        backgroundColor: green
    }
});