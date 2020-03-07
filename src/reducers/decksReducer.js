import decksInitialState from './initialState/decksInitialState';
import * as types from '../actions/types';

export default function entries(state = decksInitialState, action) {
    switch (action.type) {
        case types.SET_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: action.selectedDeck
            }
        case types.SET_CURRENT_QUESTION:
            return {
                ...state,
                quiz: {
                    ...state.quiz,
                    currentQuestion: action.currentQuestion
                }
            }
        case types.ADD_FAIL_QUESTION:
            return {
                ...state,
                quiz: {
                    ...state.quiz,
                    failQuestions: state.quiz.failQuestions + 1
                }
            }
        case types.ADD_HIT_QUESTION:
            return {
                ...state,
                quiz: {
                    ...state.quiz,
                    hitQuestions: state.quiz.hitQuestions + 1
                }
            }
        case types.RESET_QUIZ:
            return {
                ...state,
                quiz: {
                    ...decksInitialState.quiz,
                }
            }
        case types.ADD_VOTE_TO_DECK:
            const deck = {...state.deckList[action.deckId]};
            deck.votes.push(action.vote);

            return {
                ...state,
                deckList: {
                    ...state.deckList,
                    [action.deckId]: {...deck}
                }
            }
        case types.CREATE_DECK:
            return {
                ...state,
                deckList: {
                    ...state.deckList,
                    [action.deck.title]: {...action.deck}
                }
            }
        case types.ADD_CARD_TO_DECK:
            const deckAux = {...state.deckList[action.deckId]};
            deckAux.questions.push(action.card);

            return {
                ...state,
                deckList: {
                    ...state.deckList,
                    [action.deckId]: {...deckAux}
                }
            }
        case types.SET_DECK_LIST:
            return {
                ...state,
                deckList: action.deckList
            }
        default:
            return state;
    }
}