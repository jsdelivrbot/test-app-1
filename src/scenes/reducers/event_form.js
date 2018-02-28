import * as AT from '../action_types';

const initState = {
    isOpen: false,
    eventId: null,
    date: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case AT.SHOW_EVENT_FORM: {
            return {...state, ...action.payload}
        }
        case AT.CLOSE_EVENT_FORM: {
            return {...state, ...action.payload}
        }
        default: {
            return state;
        }
    }
};