import * as AT from './action_types';

export const setMonth = offset => {
    return (dispatch, getState) => {
        let month = getState().calendar.currMonth + offset;
        let year = getState().calendar.currYear;

        if (month < 0) {
            month = 11;
            --year;
        } else if (month > 11) {
            month = 0;
            ++year;            
        }

        dispatch({
            type: AT.SET_MONTH_YEAR,
            payload: {
                currMonth: month,
                currYear: year
            }
        })
    }
};

export const setCurrent = () => {
    return dispatch => {
        const date = new Date();

        dispatch({
            type: AT.SET_MONTH_YEAR,
            payload: {
                currMonth: date.getMonth(),
                currYear: date.getFullYear()
            }
        })
    }
};

export const createEvent = date => {
    return dispatch => {
        dispatch({
            type: AT.SHOW_EVENT_FORM,
            payload: {
                date: date,
                eventId: null,
                isOpen: true
            }
        })
    }
};

export const editEvent = eventId => {
    return dispatch => {
        dispatch({
            type: AT.SHOW_EVENT_FORM,
            payload: {
                date: null,
                eventId: eventId,
                isOpen: true
            }
        })
    }
};

export const closeEventForm = () => {
    return dispatch => {
        dispatch({
            type: AT.CLOSE_EVENT_FORM,
            payload: {
                date: null,
                eventId: null,
                isOpen: false
            }
        })
    }
};

export const saveEvent = event => {
    return (dispatch, getState) => {
        Promise.resolve()
            .then(() => {
                if (event.id) {
                    dispatch({
                        type: AT.EDIT_EVENT,
                        payload: {...event}
                    })
                } else {
                    dispatch({
                        type: AT.ADD_EVENT,
                        payload: {...event}
                    });            
                }        
            })
            .then(() => {
                localStorage.setItem('lc_calendar_events', JSON.stringify(getState().events));
                dispatch(closeEventForm());
            })
    }
};

export const removeEvent = eventId => {
    return (dispatch, getState) => {
        Promise.resolve()
            .then(() => {
                if (eventId) {
                    dispatch({
                        type: AT.REMOVE_EVENT,
                        payload: {
                            id: eventId
                        }
                    })
                }
            })
            .then(() => {
                localStorage.setItem('lc_calendar_events', JSON.stringify(getState().events));
                dispatch(closeEventForm());
            })
    }
};

export const showEventList = (ids, date) => {
    return dispatch => {
        dispatch({
            type: AT.SHOW_LIST,
            payload: {
                date: date,
                eventIds: ids,
                isOpen: true
            }
        })
    }
};

export const closeEventList = () => {
    return dispatch => {
        dispatch({
            type: AT.CLOSE_LIST,
            payload: {
                date: null,
                eventIds: [],
                isOpen: false
            }
        })
    }
};

export const setSearchQuery = query => {
    return dispatch => {
        dispatch({
            type: AT.SET_SEARCH_QUERY,
            payload: {
                searchQuery: query
            }
        })
    }    
}