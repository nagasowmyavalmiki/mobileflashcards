import * as types from './types';
import {saveDeck} from '../../utils/api';

export function setSelectedDeckAction(selectedDeck) {
    return {
        type: types.SET_SELECTED_DECK,
        selectedDeck
    }
}

export function setCurrentQuestionQuizAction(currentQuestion) {
    return {
        type: types.SET_CURRENT_QUESTION,
        currentQuestion
    }
}

export function addFailQuestionAction() {
    return {
        type: types.ADD_FAIL_QUESTION
    }
}

export function addHitQuestionAction() {
    return {
        type: types.ADD_HIT_QUESTION
    }
}

export function resetQuizAction() {
    return {
        type: types.RESET_QUIZ
    }
}

function addVoteToDeckAction(vote, deckId) {
    return {
        type: types.ADD_VOTE_TO_DECK,
        vote,
        deckId
    }
}

function createDeckAction(deck) {
    return {
        type: types.CREATE_DECK,
        deck,
    }
}

function addCardToDeckAction(card, deckId) {
    return {
        type: types.ADD_CARD_TO_DECK,
        card,
        deckId
    }
}

export function setDeckListAction(deckList) {
    return {
        type: types.SET_DECK_LIST,
        deckList
    }
}

export function createDeck(deck) {
    return (dispatch, getState) => {
        dispatch(createDeckAction(deck));
        saveDeck({deck, key: deck.title})
    }
}

export function addCardToDeck(card, deckId) {
    return (dispatch, getState) => {
        dispatch(addCardToDeckAction(card, deckId));
        const deck = getState().decks.deckList[deckId];
        saveDeck({deck, key: deckId})
    }
}

export function addVoteToDeck(vote, deckId) {
    return (dispatch, getState) => {
        dispatch(addVoteToDeckAction(vote, deckId));
        const deck = getState().decks.deckList[deckId];
        saveDeck({deck, key: deckId})
    }
}