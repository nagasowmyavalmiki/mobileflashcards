import {AsyncStorage} from 'react-native';

export const CARDS_STORAGE_KEY = 'UdaciCards:deckList';

export function getDecks() {
    return AsyncStorage.getItem(CARDS_STORAGE_KEY)
        .then((results) => JSON.parse(results))
}

export function saveDeck({deck, key}) {
    return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({[key]: deck}));
}
