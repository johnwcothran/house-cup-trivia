import { loop, Cmd } from 'redux-loop';
import * as R from 'ramda';

//++++++++
// TYPES +
//++++++++

//+++++++++++++++++
// REDUCER HELPERS+
//+++++++++++++++++



//+++++++++
// ACTIONS+
//+++++++++

const UPDATE = 'actions/feature1/UPDATE';

//++++++++++
// REDUCERS+
//++++++++++

const initialState = {
    hello: 'world!',
    count: 0
};

export default function feature1(state = initialState, action) {
    switch (action.type) {
        case UPDATE: {
            const { newState } = action;
            return newState;
        }
        default:
            return state;
    }
}

//++++++++++++++++++
// ACTIONS CREATORS+
//++++++++++++++++++

export function update(newState) {
    return {
        type: UPDATE,
        newState,
    };
}
