import React from 'react';
import { connect } from 'react-redux';
import {
    setMonth,
    setCurrent
} from '../../actions';

const month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

class DateSwitcher extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            currMonth,
            currYear, 
            nextMonth,
            prevMonth,
            setNow
        } = this.props;

        return (
            <div className="switcher-box">
                <span 
                    className="prev-btn"
                    onClick={() => {prevMonth()}}>
                </span>
                <span className="curr-date">{month[currMonth]} {currYear}</span>
                <span 
                    className="next-btn"
                    onClick={() => {nextMonth()}}>
                </span>
                <span 
                    className="now-btn"
                    onClick={() => {setNow()}}>
                    сегодня
                </span>
            </div> 
        )
    }
}

const mapStateToProps = function(state) {
    return {
        currMonth: state.calendar.currMonth,
        currYear: state.calendar.currYear
    }
};

const mapDispatchToProps = function(dispatch){
    return {
        nextMonth: () => {
            dispatch(setMonth(1));
        },
        prevMonth: () => {
            dispatch(setMonth(-1));
        },
        setNow: () => {
            dispatch(setCurrent());
        }
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(DateSwitcher));