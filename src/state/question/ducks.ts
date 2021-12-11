// import { loop, Cmd } from 'redux-loop';
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

const UPDATE = 'actions/question/UPDATE';

//++++++++++
// REDUCERS+
//++++++++++



const initialState = {
    status: 'question',
    openUsedQuestion: false,
    activeQuestion: {
        question: null,
        answer: null,
        points: null,
    },
    usedQuestions: [],
    questions: [],
    score: {
        Gryffindor: 0,
        Ravenclaw: 0,
        Hufflepuff: 0,
        Slytherin: 0,
    }
};

interface IPropsAction {
    type: string;
    keyPath?: string[];
    value?: any;
}

export default function questionReducer(state = initialState, action: IPropsAction) {
    switch (action.type) {
        case UPDATE: {
            const { keyPath, value } = action;
            const newState = R.assocPath(keyPath, value, state);
            return newState;
        }
        default:
            return state;
    }
}

//++++++++++++++++++
// ACTIONS CREATORS+
//++++++++++++++++++

export function update(keyPath: string[], value: any) {
    return {
        type: UPDATE,
        keyPath,
        value
    };
}
