
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import { style } from '../../assets/libs/react-big-calendar/react-big-calendar.css'

import moment from 'moment';

class Events extends Component {
  
  constructor(props) {
    super(props);
    this.state = { isBusy: false, hasErrored: false, message: '', events:[{
        'title': 'Long Event',
        'start': new Date(2017, 7, 18),
        'end': new Date(2017, 3, 20)
      }, {  
        'title': 'DTS STARTS',
        'start': new Date(2017, 2, 13, 0, 0, 0),
        'end': new Date(2017, 2, 20, 0, 0, 0)
      }] 
    };
  }

  componentDidMount() {
    console.log("componentDidMount state: "+JSON.stringify(this.props));
  }

  render() {

    // Setup the localizer by providing the moment (or globalize) Object
    // to the correct localizer.
    BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

    const MyCalendar = props => (
      <div>
        
        <BigCalendar
          events={this.state.events}
          style={style}
          startAccessor='startDate'
          endAccessor='endDate'/>
      </div>
    );

    return (
      <div>
      
        <div className="p4-menu-centered">
          <ul className="menu">
            <li><NavLink to="/events/plaz4" activeClassName="active-link">Company Events</NavLink></li>
          </ul>

        </div>

        <p>Testing the big calendar</p>

        <div className="row">{MyCalendar}</div>

      </div>


    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps: "+JSON.stringify(state)); // state
  console.log("ownProps: "+JSON.stringify(ownProps)); // ownProps
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps"); // state
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);

