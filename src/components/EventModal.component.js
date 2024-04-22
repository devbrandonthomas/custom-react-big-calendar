
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var title = "";
    var desc = "";
    var startDate = "";
    var endDate = "";
    var location = "";
    var startTime = "";
    var endTime = "";
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var recurringDays = [];
    var col = "";
    var category = "";
    if(this.props.evt != null) {
      title = this.props.evt.title;
      desc = this.props.evt.desc;
      location = this.props.evt.location;
      var dateEndIndex = this.props.evt.start.toString().indexOf(":") - 3;
      startDate = this.props.evt.start.toString().substring(0, dateEndIndex);
      dateEndIndex = this.props.evt.end.toString().indexOf(":") - 3;
      endDate = this.props.evt.end.toString().substring(0, dateEndIndex); 
      var startHours = Math.floor(this.props.evt.startTime/3600);
      var startMinutes = this.props.evt.startTime;
      col = this.props.evt.col;
      category = this.props.evt.category;
      if(startHours !== 0) {
        startMinutes = startMinutes % (3600 * startHours)/60;
      }
      else {
        startMinutes = startMinutes/60;
      }
      var startHoursText = "";
      var startMinutesText = "";
      if(startHours < 10) {
        startHoursText = "0" + startHours;
      }
      else {
        startHoursText = "" + startHours;
      }
      if(startMinutes < 10) {
        startMinutesText = "0" + startMinutes;
      }
      else {
        startMinutesText = "" + startMinutes;
      }
      startTime = startHoursText + ":" + startMinutesText;
      var endHours = Math.floor(this.props.evt.endTime/3600);
      var endMinutes = this.props.evt.endTime%(3600 * endHours)/60;
      var endHoursText = "";
      var endMinutesText =  "";
      if(endHours < 10) {
        endHoursText = "0" + endHours;
      }
      else {
        endHoursText = "" + endHours;
      }
      if(endMinutes < 10) {
        endMinutesText = "0" + endMinutes;
      }
      else {
        endMinutesText = "" + endMinutes;
      }
      endTime = endHoursText + ":" + endMinutesText;
      for(var day of this.props.evt.recurringDays) {
        recurringDays.push(days[day]);
      }
      var recurringElement = (<p></p>);
      if(recurringDays.length !== 0) {
        recurringElement = (<p>Recurring Days: {recurringDays.toString()}</p>);
      }
      var recurrenceStart = (<p></p>);
      if(this.props.evt.recurrenceStart !== undefined) {
      let dateEndIndex = this.props.evt.recurrenceStart.toString().indexOf(":") - 3;
      let recurrenceStartDate = this.props.evt.recurrenceStart.toString().substring(0, dateEndIndex);
        recurrenceStart = (<p>Recurrence Start: {recurrenceStartDate}</p>);
      }
      var recurrenceEnd = (<p></p>);
      if(this.props.evt.recurrenceEnd !== undefined) {
      let dateEndIndex = this.props.evt.recurrenceEnd.toString().indexOf(":") - 3;
      let recurrenceEndDate = this.props.evt.recurrenceEnd.toString().substring(0, dateEndIndex); 
        recurrenceEnd = (<p>Recurrence End: {recurrenceEndDate}</p>);
      }
    }
    return (
      <Modal show={this.props.isOpen} onHide={this.props.close} >
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          <p>Description: {desc}</p>
          <p>Location: {location}</p>
          <p>Start Date: {startDate.toString()}</p>
          <p>End Date: {endDate.toString()}</p>
          <p>Start Time: {startTime}</p>
          <p>End Time: {endTime}</p>
          <p>Category: {category}</p>
          <p>Color: {col}</p>
          {recurringElement}
          {recurrenceStart}
          {recurrenceEnd}
          <Button type="submit" onClick={this.deleteEvent}>Edit Event Details</Button>
          <Button type="submit" onClick={this.deleteEvent}>Delete Event</Button>       
        </Modal.Body>
      </Modal>
    );
  }
}

EventModal.defaultProps = {
  isOpen: false,
  toggleModal : null,
  evt: null
};

EventModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  evt: PropTypes.object
};

