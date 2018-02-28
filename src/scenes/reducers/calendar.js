import * as AT from '../action_types';

const date = new Date();

const initialState = {
    currYear: date.getFullYear(),
    currMonth: date.getMonth(),
    searchQuery: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AT.SET_MONTH_YEAR: {
            return {...state, ...action.payload};
        }
        case AT.SET_SEARCH_QUERY: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
};