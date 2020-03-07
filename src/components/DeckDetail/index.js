import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import {gray, darkGray} from '../../../utils/colors'

export default class DeckDetail extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        cards: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired
    };

    static defaultProps = {
        title: 'Deck Title',
        cards: 0,
        onPress: () => {
        }
    };

    render() {
        const {cards, title, onPress} = this.props;

        return (
            <TouchableOpacity style={styles.container}
                              onPress={onPress}>
                <View style={styles.btnContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{`${cards} cards`}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: darkGray,
        fontSize: 20
    },
    subTitle: {
        color: gray
    }
});