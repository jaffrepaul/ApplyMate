import React from 'react';

class ActivityEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventType: '',
      eventDate: '',
      eventTime: '',
      eventParticipates: '',
    };
    this.submit = this.submit.bind(this);
    this.onChangeEventType = this.onChangeEventType.bind(this);
    this.onChangeEventDate = this.onChangeEventDate.bind(this);
    this.onChangeEventTime = this.onChangeEventTime.bind(this);
    this.onChangeEventParticipates = this.onChangeEventParticipates.bind(this);
  }
  componentDidMount() {
    this.loadEvent();
  }
  onChangeEventType(e) {
    this.setState({ eventType: e.target.value });
  }
  onChangeEventDate(e) {
    this.setState({ eventDate: e.target.value });
  }
  onChangeEventTime(e) {
    this.setState({ eventTime: e.target.value });
  }
  onChangeEventParticipates(e) {
    this.setState({ eventParticipates: e.target.value });
  }
  loadEvent() {
    fetch(`/api/activities/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          eventType: data.eventType,
          eventDate: data.eventDate,
          eventTime: data.eventTime,
          eventParticipates: data.eventParticipates,
        });
      });
  }
  submit(e) {
    e.preventDefault();
    const event = {
      eventType: this.state.eventType,
      eventDate: this.state.eventDate,
      eventTime: this.state.eventTime,
      eventParticipates: this.state.eventParticipates,
    };

    fetch(`/api/activities/${this.props.match.params.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }).then(res => res.json())
      .then(data =>
        console.log('event edited', data));
  }
  render() {
    return (
      <div>
        <form className="event-form" onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="eventType">
              <span className="input-label">Event Type</span>
              <select className="event-type" name="eventType" value={this.state.eventType} onChange={this.onChangeEventType}>
                <option value="phoneCall">Phone Call</option>
                <option value="interview">Interview</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">
              <span className="input-label">When</span>
              <input className="event-date" type="date" name="eventDate" value={this.state.eventDate} onChange={this.onChangeEventDate} />
            </label>
            <label htmlFor="eventTime">
              <span className="input-label">Event Time</span>
              <input className="event-time" type="time" name="eventTime" value={this.state.eventTime} onChange={this.onChangeEventTime} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="eventParticipates">
              <span className="input-label">Who is participating?</span>
              <input type="text" name="eventParticipates" value={this.state.eventParticipates} onChange={this.onChangeEventParticipates} />
            </label>
          </div>
          <div className="form-group">
            <input className="button" type="submit" value="Save" />
          </div>
        </form>
      </div>
    );
  }
}
export default ActivityEdit;