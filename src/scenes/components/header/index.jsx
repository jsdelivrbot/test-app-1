import React from 'react';
import { connect } from 'react-redux';
import {
    createEvent,
    setSearchQuery,
    editEvent
} from '../../actions';

const getEventByQuery = (events, query) => {
    if (!query) {
        return [];
    }
    query = query.trim().toLowerCase();

    const dateRegex = /((0[1-9]|[12]\d|3[01])[.-\\]?(0[1-9]|1[0-2])?[.-\\]?([12]\d{3})?)/g;
    const result = [];
    let date = '';

    let m = query.match(dateRegex);
    if (m !== null) {
        m = m[0].split('.')
        for (let i = m.length-1; i >= 0; --i) {
            date += !date ? m[i] : '-' + m[i]; 
        } 
    }

    events.forEach(evt => {
        let match = false;

        if (!evt.event) {
            return;
        }
        
        match |= !!~evt.event.toLowerCase().indexOf(query);
        match |= !!~evt.participants.toLowerCase().indexOf(query);
        if (date !== '') {
            match |= !!~evt.date.indexOf(date);    
        }

        if (match) {
            result.push(evt);
        }
    })

    return result;
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            showSResult: false
        }
        this.addEvent = this.addEvent.bind(this);
        this.queryChange = this.queryChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this); 
    }

    addEvent(e) {
        this.props.addEvent();
    }

    queryChange(e) {
        this.setState({
            query: e.target.value
        })
        clearTimeout(this.searchTimerId);
        this.searchTimerId = setTimeout(() => {
            this.props.searchEvents(this.state.query);
        }, 150);
    }

    renderSearchedEvents() {
        return this.props.searchedEvents.map(evt => {
            return (
                <div 
                    key={evt.id} 
                    className="serch-result-item" 
                    onClick={e => this.props.editEvent(evt.id)}
                >
                    {evt.event}
                    <br />
                    <span>{evt.date}</span>
                </div>
            )
        })
    }

    onFocus() {
        this.setState({showSResult: true});
    }

    onBlur() {
        setTimeout(() => {
            this.setState({showSResult: false});
        }, 300)
    }

    render() {
        const {
            searchedEvents,
            ...props
        } = this.props;

        let showResults = this.state.showSResult && searchedEvents.length;
        return (
            <div className="lc-header">
                <div className="lc-header-tools">
                    <button className="button-blue" onClick={this.addEvent}>Добавить</button>
                    <button className="button-blue">Обновить</button>
                    
                    <input 
                        className="serch-indput" 
                        type="text" 
                        placeholder="Событие, дата или учасник" 
                        value={this.state.query}
                        onChange={this.queryChange}
                        onFocus={ this.onFocus } 
                        onBlur={ this.onBlur } 
                />
                </div>
                <div className="serch-result" style={{display: showResults ? 'block': 'none'}}>
                    {this.renderSearchedEvents()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        searchedEvents: getEventByQuery(state.events, state.calendar.searchQuery)
    }
};

const mapDispatchToProps = function(dispatch){
    return {
        addEvent: () => {
            dispatch(createEvent());
        },
        searchEvents: query => {
            dispatch(setSearchQuery(query));
        },
        editEvent: id => {
            dispatch(editEvent(id));
        } 
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(Header));