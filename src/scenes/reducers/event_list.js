import * as AT from '../action_types';

const initState = {
    isOpen: false,
    date: null,
    eventIds: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case AT.SHOW_LIST: {
            return {...state, ...action.payload}
        }
        case AT.CLOSE_LIST: {
            return {...state, ...action.payload}
        }
        default: {
            return state;
        }
    }
};