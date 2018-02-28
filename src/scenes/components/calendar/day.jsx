import React from 'react';

export default class Day extends React.Component {
    constructor(props) {
        super(props);
    }

    renderEvents() {
        return this.props.events.map(evt => 
            <div key={evt.id} className="lc-calendar-event">
                {evt.event}
            </div>
        )
    }

    render() {
        const {
            date,
            dayName = '',
            events = [],
            dblClickAction,
            ...props
        } = this.props;
        
        const dateLabel = dayName !== ''
            ? `${dayName}, ${date}`
            : date;

        const className = events.length ? 'lc-calendar-day has-events' : 'lc-calendar-day';

        return (
            <div className={className}
                onDoubleClick={dblClickAction}
            >
                <span className="lc-calendar-date">
                    {dateLabel}
                </span>
                <div className="lc-calendar-events">
                    {this.renderEvents()}
                </div>
            </div>
        )
    }
}