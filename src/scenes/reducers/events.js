import * as AT from '../action_types';

const getNewId = (events) => {
    const ids = events.map(event => event.id);
    return ids.length ? Math.max.apply(Math, ids) + 1 : 1;
};

const initState = (() => {
    const storedEvents = localStorage.getItem('lc_calendar_events');
    return storedEvents ? JSON.parse(storedEvents) : [];    
})();

export default (state = initState, action) => {
    switch (action.type) {
        case AT.ADD_EVENT: {
            action.payload.id = getNewId(state);
            return [...state, action.payload];
        }
        case AT.EDIT_EVENT: {
            return state.map(evt => {
                return evt.id === action.payload.id
                    ? {...evt, ...action.payload}
                    : evt;
            });
        }
        case AT.REMOVE_EVENT: {
            let newState = [...state];
            const eventFroRemove = state.filter(evt => evt.id === action.payload.id)[0];
            if (eventFroRemove) {
                newState.splice(newState.indexOf(eventFroRemove), 1);
            }
            return newState;
        }
        default: {
            return state;
        }
    }
};