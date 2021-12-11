import { combineReducers } from 'redux-loop';
import question from './question/ducks';

const rootReducer = combineReducers({
    question
});
export default rootReducer;
