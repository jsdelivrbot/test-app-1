import React from 'react';
import { connect } from 'react-redux';
import {
    closeEventList,
    editEvent,
    createEvent
} from '../../actions';

const getEventsByIds = (state, ids) => {
    return state.events.filter(evt => ~ids.indexOf(evt.id));
}

class EventList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(next) {
    }

    createEventList() {
        return this.props.events.map(evt => 
            <div key={evt.id} 
                className="lc-event-list-item" 
                onClick={e => {this.props.editEvent(evt.id)}}
            >
                <span>{evt.event}</span><br />
                {evt.participants}
                <br />
                {evt.description}
            </div>
        )
    }

    render() {
        const {
            isOpen,
            close = () => {},
            events =[],
            ...props
        } = this.props;
        
        const styles = {
            display: isOpen ? 'block' : 'none'
        }

        return (
            <div style={styles} className="lc-modal-shadow" onClick={close}>
                <div className="lc-modal">
                    <span className="close" onClick={close}></span>
                    <div className="lc-event-list">
                        {this.createEventList()}
                    </div>
                    <div className="lc-event-list-footer">
                        <button onClick={this.props.close}>Закрыть</button>
                        <button onClick={e => {this.props.createEvent(this.props.date)}}>Добавить</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return { 
        isOpen: state.list.isOpen,
        date: state.list.date,
        events: getEventsByIds(state, state.list.eventIds)
    }
};

const mapDispatchToProps = function(dispatch){
    return {
        close: () => {
            dispatch(closeEventList())
        },
        editEvent: id => {
            dispatch(editEvent(id));
        },
        createEvent: date => {
            dispatch(createEvent(date));
        },
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(EventList));