import React from 'react';
import { connect } from 'react-redux';
import Day from './day';
import {
    createEvent,
    editEvent,
    showEventList
} from '../../actions';

const dayNames = [
    ,
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
]

const getEvents = (state) => {
    const {
        currMonth,
        currYear
    } = state.calendar;
    
    const minDate = new Date(currYear, currMonth - 1, 20);
    const maxDate = new Date(currYear, currMonth + 1, 7);

    return state.events.filter(e => {
        let eDate = new Date(e.date);
        return eDate.getTime() > minDate.getTime() && eDate.getTime() < maxDate.getTime();
    });
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.dayAction = this.dayAction.bind(this);
    }

    getDateEvents(date) {
        return this.props.events.filter(e => {
            const eDate = new Date(e.date);
            return date.toDateString() === eDate.toDateString()
        });
    }

    dayAction(events, date) {
        if (!events.length) {
            this.props.createEvent(date);
        } else if (events.length === 1) {
            this.props.editEvent(events[0].id);
        } else {
            console.log('show day list', events);
            this.props.showDayEvents(events.map(evt => evt.id), date);
        }
    }

    generateWeeks(startDate) {
        const weeks = [];
        const date = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
            23
        );
        let days = [];
        let weekDay = 0;
        let week = 1;

        while (
            date.getMonth() <= this.props.currMonth 
            && date.getFullYear() <= this.props.currYear
        ) {
            for (let i = 1; i <= 7; i++) {
                let dayEvents = this.getDateEvents(date);
                let dateStr = date.toISOString().split('T')[0];

                days.push(
                    <Day 
                        today   = {false}
                        key     = {dateStr}
                        date    = {date.getDate()}
                        month   = {date.getMonth()}
                        yaer    = {date.getFullYear()}
                        dayName = {!weeks.length ? dayNames[i] : ''}
                        events  = {dayEvents} 
                        dblClickAction  = {e => this.dayAction(dayEvents, dateStr)}
                    />
                )
                date.setDate(date.getDate() + 1);
                weekDay++;
            }

            weeks.push(
                <div key={week} className="lc-calendar-week">
                    {days}
                </div>                    
            )
            days = [];
            week++;
        }

        return weeks;
    }

    render() {
        const {
            currMonth,
            currYear 
        } = this.props;

        let startDate = new Date(currYear, currMonth, 1);
        let dayNumber = startDate.getDay() !== 0 ? startDate.getDay() : 7;

        if (startDate.getDay() !== 1) {
            startDate.setDate(startDate.getDate() - (dayNumber-1));    
        }

        const weeks = this.generateWeeks(startDate);
        return (
            <div className="lc-calendar">
                {weeks}
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        currMonth: state.calendar.currMonth,
        currYear: state.calendar.currYear,
        events: getEvents(state)
    }
};

const mapDispatchToProps = function(dispatch){
    return {
        showDayEvents: (ids, date) => {
            dispatch(showEventList(ids, date));
        },
        createEvent: date => {
            dispatch(createEvent(date));
        },
        editEvent: id => {
            dispatch(editEvent(id));
        }
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(Calendar));