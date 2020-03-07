import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types'
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {blue, darkGray, gray, white, yellow} from "../../utils/colors";
import {getStarsFromVotes} from "../../utils/votes";
import IconPlatform from '../components/IconPlatform';
import Button from '../components/Button';
import {connect} from "react-redux";
import {MAX_STARS} from '../constants/constants';

class DeckView extends Component {
    static propTypes = {
        selectedDeck: PropTypes.object.isRequired
    };

    static defaultProps = {
        selectedDeck: {}
    };

    static navigationOptions = ({navigation}) => {
        const {title} = navigation.state.params;

        return {
            title
        }
    };

    addCard() {
        this.props.navigation.navigate('AddCardView');
    }

    startQuiz() {
        const {title} = this.props.selectedDeck;
        this.props.navigation.navigate('QuizView', {title});
    }

    render() {
        const {selectedDeck} = this.props;
        const stars = getStarsFromVotes(selectedDeck.votes);
        const noStars = MAX_STARS - stars;
        const starsItems = [];
        const noStarsItems = [];

        for (let i = 0; i < stars; i++) {
            starsItems.push(
                <IconPlatform key={i + stars} type='Ionicons' name='star' size={50} color={yellow}/>
            );
        }

        for (let i = 0; i < noStars; i++) {
            starsItems.push(
                <IconPlatform key={i + noStars} type='Ionicons' name='star-outline' size={50} color={gray}/>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.authorContainer}>
                    <Text style={styles.author}>{selectedDeck.author}</Text>
                    <FontAwesome name='user' size={25} color={gray}/>
                </View>

                <View style={styles.info}>
                    <MaterialCommunityIcons name='cards-playing-outline' size={50} color={blue}/>
                    <Text style={styles.title}>{selectedDeck.title}</Text>
                    <Text style={styles.subTitle}>{`${selectedDeck.questions.length} cards`}</Text>

                    <View style={styles.starsContainer}>
                        {starsItems}
                        {noStarsItems}
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <Button onPress={this.addCard.bind(this)} style={StyleSheet.flatten(styles.addButton)}
                            textStyle={{color: blue}}>
                        Add Card
                    </Button>

                    {selectedDeck.questions.length > 0 &&
                    <Button onPress={this.startQuiz.bind(this)}>
                        Start Quiz
                    </Button>
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    info: {
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
    },
    authorContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        height: 50
    },
    author: {
        alignItems: 'center',
        marginRight: 5,
        marginTop: 5,
        color: gray
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 40
    },
    addButton: {
        backgroundColor: white,
        borderColor: blue,
        borderWidth: 2
    }
});


function mapStateToProps({decks}) {
    return {
        selectedDeck: decks.deckList[decks.selectedDeck]
    }
}

export default connect(mapStateToProps)(DeckView)