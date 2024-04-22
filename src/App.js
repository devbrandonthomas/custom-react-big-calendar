import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import NCalendar from './components/Calendar.component';
import EventModal from './components/EventModal.component';
import NewEventModal from './components/NewEventModal.component';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';


export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen     : false,
      newModalOpen  : false,
      selectedEvent : null,
      events        : [ 
           {id: 0, title: "long test event nameeeeeeee", start: moment().set("minutes", 0).toDate(), end: moment().set("minutes", 5).toDate(), startTime: moment().hours() * 3600, endTime: moment().hours() * 3600 + 5 * 60, recurringDays: [0, 1], desc: "Description", color: "#FF00FF", col: "#FF00FF", category: "other"},
           {id: 1, title: "long test event nameeeeeeee", start: moment().add(1, "hours").set("minutes", 0).toDate(), end: moment().add(1, "hours").set("minutes", 5).toDate(), startTime: moment().add(1, "hours").hours() * 3600, endTime: moment().add(1, "hours").hours() * 3600 + 5 * 60, recurringDays: [2, 4], desc: "Description"}
      ]
    };
  }

  toggleModal = (evt) => {
    if(!this.state.modalOpen) {
      this.setState({modalOpen: !this.state.modalOpen, selectedEvent: evt});
    }
    else {
      this.setState({modalOpen: !this.state.modalOpen});
    }
  }

  toggleNewModal = () => {
    this.setState({newModalOpen: !this.state.newModalOpen});
  }

  addEvent = (evt) => {
		console.log("hello");
    var events = this.state.events;
    evt["id"] = events.length;
    var startHours = Math.floor(evt["startTime"]/3600);
    var startMinutes = startHours;
    if(startHours !== 0) {
      startMinutes = evt["startTime"] % (3600 * Math.floor(startHours))/60;
    }
    else {
      startMinutes = evt["startTime"]/60;
    }
    var endHours = Math.floor(evt["endTime"]/3600);
    var endMinutes = endHours;
    if(endHours !== 0) {
      endMinutes = evt["endTime"] % (3600 * Math.floor(endHours))/60;
    }
    else {
      endMinutes = evt["endTime"]/60;
    }
    evt["start"].setHours(startHours);
    evt["start"].setMinutes(startMinutes);
    evt["end"].setHours(endHours);
    evt["end"].setMinutes(endMinutes);
    var recurringDays = evt["recurringDays"];
    var recurringDayValues = [];
    var recurrenceStart = evt["start"];
    var recurrenceEnd = evt["end"];
    for(let obj of recurringDays) {
      recurringDayValues.push(obj["value"]);
    }
    evt["recurringDays"] = recurringDayValues;
    if (evt["category"] === "school") {
      evt["color"] = "green";
    }
    else if (evt["category"] === "personal") {
      evt["color"] = "blue";
    }
    evt["color"] = evt.color; // Add the 'color' property to the event object
    evt["col"] = evt.color;
    if(evt["type"] === "BI") {
      let startDate = moment(evt["start"]);
      let startDateDay = startDate.day();
      let endDate = moment(evt["end"]);
      while(startDate.isBefore(endDate)) {
        if(recurringDayValues.indexOf(startDate.day()) !== -1) {
          let evtCopy = Object.assign({}, evt);
          evtCopy["start"] = startDate.toDate();
          evtCopy["end"] = startDate.toDate();
          evtCopy["end"].setHours(evt["end"].getHours());
          evtCopy["end"].setMinutes(evt["end"].getMinutes());
          evtCopy["recurrenceStart"] = recurrenceStart;
          evtCopy["recurrenceEnd"] = recurrenceEnd;
          events.push(evtCopy);
        }
        let startDateClone = moment(startDate);
        let nextDateDay = startDateClone.add(1, "days").day();
        if(nextDateDay === startDateDay) {
            startDate = startDate.add(8, "days");
        }
        else {
            startDate = startDate.add(1, "days");
        }
      }
    }
    else if(evt["type"] === "Week") {
      let startDate = moment(evt["start"]);
      let endDate = moment(evt["end"]);
      while(startDate.isBefore(endDate)) {
        if(recurringDayValues.indexOf(startDate.day()) !== -1) {
          let evtCopy = Object.assign({}, evt);
          evtCopy["start"] = startDate.toDate();
          evtCopy["end"] = startDate.toDate();
          evtCopy["end"].setHours(evt["end"].getHours());
          evtCopy["end"].setMinutes(evt["end"].getMinutes());
          evtCopy["recurrenceStart"] = recurrenceStart;
          evtCopy["recurrenceEnd"] = recurrenceEnd;
          events.push(evtCopy);
        }
        startDate = startDate.add(1, "days");
      }
    }
    else if(evt["type"] === "Month") {
      let startDate = moment(evt["start"]);
      let endDate = moment(evt["end"]);
      while(startDate.isBefore(endDate)) {
        let evtCopy = Object.assign({}, evt);
        evtCopy["start"] = startDate.toDate();
        evtCopy["end"] = startDate.toDate();
        evtCopy["end"].setHours(evt["end"].getHours());
        evtCopy["end"].setMinutes(evt["end"].getMinutes());
        evtCopy["recurrenceStart"] = recurrenceStart;
        evtCopy["recurrenceEnd"] = recurrenceEnd;
        events.push(evtCopy);
        startDate = startDate.add(1, "month");
      }
    }
    else {
    events.push(evt);
    }
    this.setState({events: events});
    this.close();
  }

  deleteEvent = (id) => {
    for(var evt of this.state.events) {
      if(evt["id"] === id) {
      
      }
    }
  }

  close = () => {
    this.setState({newModalOpen: false, modalOpen: false});
  }

  render() {
    return (
      <div className="App">
        <h1>Calendar Test</h1>
        <div id="calendarDiv">
          <NCalendar events={this.state.events} onSelectEvent={(evt) => {this.toggleModal(evt)}}/>
        </div>
        <Button id="eventButton" bsStyle = "primary" onClick={this.toggleNewModal}>Add an Event</Button>
        <EventModal isOpen={this.state.modalOpen} toggle={this.toggleModal} evt={this.state.selectedEvent} close={this.close} />
        <NewEventModal isOpen={this.state.newModalOpen} toggle={this.toggleNewModal} addEvent={this.addEvent} close={this.close}/>
      </div>
    );
  }
}

