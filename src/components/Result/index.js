import React, {Component} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {blue, darkGray, gray, white, yellow} from "../../../utils/colors";
import Button from "../Button";
import IconPlatform from "../IconPlatform";
import {MAX_STARS} from '../../constants/constants';

export default class Question extends Component {
    static propTypes = {
        exit: PropTypes.func.isRequired,
        restartQuiz: PropTypes.func.isRequired
    };

    static defaultProps = {
        exit: () => {
        },
        restartQuiz: () => {
        }
    };

    state = {
        votes: 0,
        opacity: new Animated.Value(0),
        width: new Animated.Value(0),
        height: new Animated.Value(0)
    };

    componentDidMount() {
        const {opacity, width, height} = this.state;

        Animated.timing(opacity, {toValue: 1, duration: 1000}).start();

        Animated.spring(width, {toValue: 200, speed: 5}).start();
        Animated.spring(height, {toValue: 200, speed: 5}).start();
    }

    onExit() {
        this.props.exit(this.state.votes);
    }

    setVotes(votes) {
        if (votes > MAX_STARS) {
            votes = MAX_STARS;
        }
        this.setState({votes});
    }

    onRestartQuiz() {
        this.props.restartQuiz(this.state.votes);
    }

    render() {
        const {votes, width, height, opacity} = this.state;
        const noStars = MAX_STARS - votes;
        const starsItems = [];
        const noStarsItems = [];

        for (let i = 0; i < votes; i++) {
            starsItems.push(
                <TouchableOpacity key={i + votes}
                                  onPress={this.setVotes.bind(this, ((MAX_STARS - votes === 0 ? 1 : MAX_STARS - votes)) + i)}
                >
                    <IconPlatform type='Ionicons'
                                  name='star'
                                  size={50}
                                  color={yellow}
                    />
                </TouchableOpacity>
            );
        }

        for (let i = 0; i < noStars; i++) {
            starsItems.push(
                <TouchableOpacity key={i + noStars}
                                  onPress={this.setVotes.bind(this, (MAX_STARS - noStars) + i + 1)}
                >
                    <IconPlatform type='Ionicons' name='star-outline' size={50} color={gray}/>
                </TouchableOpacity>
            );
        }

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.trophyContainer, {opacity, height, width}]}>
                    <IconPlatform type='Ionicons' name='trophy' size={100} color={yellow}/>
                </Animated.View>
                <Text style={styles.title}>You are finished the Quiz! Congratulations!</Text>

                <View style={styles.voteContainer}>
                    <Text style={styles.subTitle}>Vote this deck:</Text>
                    <View style={styles.stars}>
                        {starsItems}
                        {noStarsItems}
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <Button style={StyleSheet.flatten(styles.restartButton)}
                            textStyle={{color: blue}}
                            onPress={this.onRestartQuiz.bind(this)}>
                        Restart
                    </Button>
                    <Button onPress={this.onExit.bind(this)}>Exit</Button>
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
        backgroundColor: white
    },
    trophyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    },
    voteContainer: {
        marginBottom: 30
    },
    subTitle: {
        fontSize: 15,
        color: darkGray,
        textAlign: 'center'
    },
    stars: {
        flexDirection: 'row'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 40,
        width: 350
    },
    restartButton: {
        backgroundColor: white,
        borderColor: blue,
        borderWidth: 2
    }
});