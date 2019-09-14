import { combineReducers } from 'redux-loop';
import feature1 from './feature-1/ducks';

const rootReducer = combineReducers({
    feature1
});
export default rootReducer;
