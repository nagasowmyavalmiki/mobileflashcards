import decksReducer from './decksReducer'
import { combineReducers } from 'redux'

export default combineReducers({
    decks: decksReducer
})
