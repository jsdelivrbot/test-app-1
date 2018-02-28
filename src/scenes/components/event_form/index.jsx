import React from 'react';
import { connect } from 'react-redux';
import {
    closeEventForm,
    saveEvent,
    removeEvent
} from '../../actions';

const defaultValues = {
    id: null,
    event: '',
    date: '',
    participants: '',
    description: '',
};

const getEventById = (state, id) => {
    return state.events.filter(evt => evt.id === id)[0]
}

const CancelDelButton = (props) => {
    return props.event
        ? <button onClick={e => props.remove(props.event.id)}>Удалить</button>
        : <button onClick={props.cancel}>Отмена</button>;    
}

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...defaultValues
        }

        this.errors = {
            event: false,
            date: false
        }

        this.onChange = this.onChange.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
    }

    onChange(e) {
        const changes = {};
        changes[e.target.name] = e.target.value;
        changes['error'] = false;
        this.errors[e.target.name] = false;
        this.setState(changes);
    }

    saveEvent() {
        if (this.state.event.trim() === '' || this.state.date.trim() === '') {
            this.errors['event'] = this.state.event.trim() === '';
            this.errors['date'] = this.state.date === '';

            this.setState({
                error: true
            })
            return;
        }
        const {
            error,
            ...event
        } = this.state;
        this.props.saveEvent(event);
    }

    componentWillReceiveProps(next) {
        let currDate = new Date();
        let month = currDate.getMonth()+1 > 9 ? currDate.getMonth()+1 : '0'+(currDate.getMonth()+1);

        let dateStr = `${currDate.getFullYear()}-${month}-${currDate.getDate()}`;
        if (!next.event) {
            this.setState({
                ...defaultValues,
                date: next.date || dateStr
            })
        } else {
            this.setState({
                ...next.event,
                error:false
            })
        }
        this.errors = {
            event: false,
            date: false
        }
    }

    render() {
        const {
            isOpen,
            closeForm = () => {},
            removeEvent = () => {},
            ...props
        } = this.props;
        
        const styles = {
            display: isOpen ? 'block' : 'none'
        }

        return (
            <div style={styles} className="lc-modal-shadow">
                <div className="lc-modal">
                    <span className="close" onClick={closeForm}></span>
                    <input
                        className={this.errors.event ? 'has-error' : ''}
                        name="event" 
                        type="text" 
                        value={this.state.event} 
                        onChange={this.onChange}
                        placeholder="Событие"/>
                    <input 
                        className={this.errors.date ? 'has-error' : ''}
                        name="date" 
                        type="date"  
                        value={this.state.date} 
                        onChange={this.onChange}/>
                    <input 
                        name="participants" 
                        type="text" 
                        value={this.state.participants} 
                        onChange={this.onChange}
                        placeholder="Имена участников"/>
                    <textarea 
                        name="description" 
                        value={this.state.description} 
                        onChange={this.onChange}
                        placeholder="Описание">
                    </textarea>
                    <br />
                    <br />
                    <button onClick={this.saveEvent}>Сохранить</button>
                    &nbsp;&nbsp;
                    <CancelDelButton event={props.event} cancel={closeForm} remove={removeEvent} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return { 
        isOpen: state.eventForm.isOpen,
        event: getEventById(state, state.eventForm.eventId),
        date: state.eventForm.date
    }
};

const mapDispatchToProps = function(dispatch){
    return {
        closeForm: () => {
            dispatch(closeEventForm())
        },
        saveEvent: event => {
            dispatch(saveEvent(event));
        },
        removeEvent: eventId => {
            dispatch(removeEvent(eventId));
        }
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(EventForm));