import React, { useEffect, useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await parseICalUrl('https://example.com/calendar.ics');
        setEvents(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Calendar Events</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>Summary:</strong> {event.summary}<br />
            <strong>Start:</strong> {event.start.toString()}<br />
            <strong>End:</strong> {event.end.toString()}<br />
            <strong>Location:</strong> {event.location}<br />
            <strong>Description:</strong> {event.description}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

async function parseICalUrl(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = xhr.responseText;
          const jcalData = ICAL.parse(data);
          const comp = new ICAL.Component(jcalData);
          const vevents = comp.getAllProperties('vevent');
          const events = [];
          vevents.forEach(vevent => {
            const event = {
              summary: vevent.getFirstPropertyValue('summary'),
              start: vevent.getFirstPropertyValue('dtstart').toJSDate(),
              end: vevent.getFirstPropertyValue('dtend').toJSDate(),
              location: vevent.getFirstPropertyValue('location'),
              description: vevent.getFirstPropertyValue('description')
            };
            events.push(event);
          });
          resolve(events);
        } else {
          reject(new Error('Failed to load iCalendar URL'));
        }
      }
    };
    xhr.send();
  });
}

export default App;


