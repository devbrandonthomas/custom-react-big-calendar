
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormControl, FormGroup, Label} from 'react-bootstrap';
import DatePicker from 'react-16-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import Select from 'react-select';
import moment from 'moment';

import 'react-select/dist/react-select.css';

export default class NewEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title         : "",
      date          : moment(),
      end_date      : moment(),
      location      : "",
      type          : "Single",
      timeIn        : (moment().hour() * 3600),
      timeOut       : (moment().hour() * 3600) + (5 * 60),
      description   : "",
      recurringDays : [],
      color         : "",
      category      : "other",
      submitted: true
    };
    this.processNewEvent = this.processNewEvent.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.isOpen && !this.props.isOpen && this.state.submitted) {
      this.setState({title: "", date: moment(), end_date: moment(), type: "Single", timeIn: (moment().hour() * 3600), timeOut: (moment().hour() * 3600) + (5 * 60), description: "", location: "", recurringDays: [], color: "#3B3B3B", submitted: false});
    }
  }

  processNewEvent() {
    if(this.state.title !== "" && this.state.description !== "" && this.state.location !== "" && !(this.state.recurringDays.length === 0 && (this.state.type === "Week" || this.state.type === "BI"))) {
      var evt = {id: -1, title: this.state.title, start: this.state.date.toDate(), end: this.state.end_date.toDate(), startTime: this.state.timeIn, endTime: this.state.timeOut, recurringDays: this.state.recurringDays, color: this.state.color, category: this.state.category, desc: this.state.description, location: this.state.location, type: this.state.type};
      this.setState({submitted: true});
      this.props.addEvent(evt);
    }
    if(this.state.title === "") {
      
    }
    if(this.state.description === "") {

    }
    if(this.state.location === ""){

    }
    if(this.state.recurringDays.length === 0 && (this.state.type === "Week" || this.state.type === "BI")) {
      
    }
  }

	timeIn = (e) => {
		this.setState({timeIn: e});
	}

	timeOut = (e) => {
		this.setState({timeOut: e});
	}

  handleEndChange(date) {
    this.setState({end_date: moment(date)});
  }

  handleDate = (e) => {
    this.setState({date: moment(e)});
    if(this.state.type === "Single") {
      this.setState({end_date: moment(e)});
    }
  }


  handleType = (e) => {
    if(this.state.type === "Single" && e.target.value !== "Single") {
      return this.setState({type: e.target.value, end_date: moment()});
    } else if(this.state.type !== "Single" && e.target.value === "Single") {
      return this.setState({type: e.target.value, date: moment(), end_date: moment()});
    }
    this.setState({type: e.target.value, date: moment(), end_date: moment()});
  }

  handleCategory = (e) => {
    this.setState({category: e.target.value});
  }

  handleDaySelectChange = (e) => {
    this.setState({recurringDays: e});
  }

  handleColorChange = (e) => {
    this.setState({ color: e.target.value });
  }

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.close}>
        <Modal.Header closeButton>New Calendar Event</Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label>Event Type:</Label>
            <FormControl componentClass="select" value={this.state.type} onChange={this.handleType}>
              <option value="Single">Single</option>
              <option value="Week">Weekly</option>
              <option value="BI">BI-Weekly</option>
              <option value="Month">Monthly</option>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <Label>Title:</Label>
            <FormControl placeholder="Your event title here..." onChange={(evt)=>{this.setState({title: evt.target.value})}}/>
          </FormGroup>

          <FormGroup>
            <Label>Category:</Label>
            <FormControl componentClass="select" value={this.state.category} onChange={this.handleCategory}>
              <option value="school">school</option>
              <option value="personal">personal</option>
              <option value="other">other</option>
            </FormControl>
          </FormGroup>

          { this.state.category === "other" &&
          <FormGroup>
              <Label>Color:</Label>
              <FormControl type="color" placeholder="Your event color here..." onChange={(evt)=>{this.setState({color: evt.target.value})}} />
            </FormGroup>
          }

          <FormGroup>
            <Label>Description:</Label>
            <FormControl placeholder="Your event description here..." onChange={(evt)=>{this.setState({description: evt.target.value})}}/>
          </FormGroup>
 
          <FormGroup>
              <Label>Event Date</Label>
              <DatePicker autoComplete="on" placeholder="Date" 
              value={this.state.date.format()} onChange={this.handleDate} dateFormat="MM-DD-YYYY"/>
          </FormGroup>
    
          { this.state.type !== "Single" && 
            <FormGroup>
              <Label>End Date: </Label>
              <DatePicker autoComplete="on" placeholder="Date" 
              value={this.state.end_date.format()} onChange={this.handleEndChange} dateFormat="MM-DD-YYYY"/>
            </FormGroup>
          }

          <FormGroup>
            <Label> Location:</Label>
            <FormControl placeholder="Location" onChange={(evt)=>{this.setState({location: evt.target.value})}}></FormControl>
          </FormGroup>
          <FormGroup>
            <Label>Starting Time: </Label>
						<TimePicker value={this.state.timeIn} onChange={this.timeIn} step={5} start={'07:00 AM'} />
          </FormGroup>
          
          <FormGroup>
            <Label>Ending Time:</Label>
						<TimePicker value={this.state.timeOut} onChange={this.timeOut} step={5} start={'07:05 AM'} />
          </FormGroup>

          { (this.state.type === "Week" || this.state.type === "BI") && 
            <FormGroup>
            <Label>Recurring Days:</Label><Select multi options={[{label: "Sunday", value: 0}, {label: "Monday", value: 1}, {label: "Tuesday", value: 2}, {label: "Wednesday", value: 3}, {label: "Thursday", value: 4}, {label: "Friday", value: 5}, {label: "Saturday", value: 6}]} value={this.state.recurringDays} onChange={this.handleDaySelectChange} />
            </FormGroup>
          }
          <br/>
          <Button bsStyle="success" onClick={this.processNewEvent}>Add Event</Button>
        </Modal.Body>
      </Modal>

    );
  }
}

NewEventModal.defaultProps = {
  isOpen: false,
  toggleModal : null,
  addEvent: null,
  defaultColor: "#3B3B3B"
};

NewEventModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  addEvent: PropTypes.func,
  defaultColor: PropTypes.string
};

