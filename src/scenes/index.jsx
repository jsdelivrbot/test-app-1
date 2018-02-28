import React from 'react';
import Header from './components/header';
import Calendar from './components/calendar';
import DateSwitcher from './components/date_switcher';
import EventForm from './components/event_form';
import EventList from './components/event_list';
import './style.less';


export default class CalendarScene extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <DateSwitcher />
                <Calendar />
                <EventForm />
                <EventList />
            </div>
        )
    }
}
