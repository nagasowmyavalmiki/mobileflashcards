import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import DeckDetail from '../components/DeckDetail';
import PropTypes from 'prop-types';
import {gray, white} from "../../utils/colors";
import {connect} from 'react-redux';
import {setSelectedDeckAction} from '../actions/deckActions';
import Button from '../components/Button';

class DeckListView extends Component {

    static propTypes = {
        deckList: PropTypes.object.isRequired
    };

    static defaultProps = {
        deckList: {}
    };

    renderItem({item}) {
        return (
            <View style={{borderColor: gray, borderBottomWidth: 1, backgroundColor: white}}>
                <DeckDetail title={item.title}
                            cards={item.questions.length}
                            onPress={this.viewDeck.bind(this, item)}
                />
            </View>
        )
    }

    viewDeck(deck) {
        const title = deck.title;
        this.props.setSelectedDeckAction(deck.title);
        this.props.navigation.navigate('DeckView', {title});
    }

    newDeck(){
        this.props.navigation.navigate('NewDeck');
    }

    render() {
        const {deckList} = this.props;
        const arrayList = Object.keys(deckList).map((key, index) => ({...deckList[key], key: index}));

        return (
            <View>
                {arrayList.length === 0 ?
                    <View style={styles.noDecksContainer}>
                        <Text style={styles.noDecksText}>Not found decks!</Text>
                        <Button onPress={this.newDeck.bind(this)}>
                            New Deck
                        </Button>
                    </View>
                    :
                    <FlatList data={arrayList}
                              renderItem={this.renderItem.bind(this)}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noDecksContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 80
    },
    noDecksText: {
        marginTop: 30,
        marginBottom: 30
    }
});

function mapStateToProps({decks}) {
    return {
        deckList: decks.deckList
    }
}

export default connect(mapStateToProps, {setSelectedDeckAction})(DeckListView)