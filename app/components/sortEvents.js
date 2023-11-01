export default function sortEvents(events) {
    events.forEach((event) => {
        events.eventdate = {Date: new Date(event.eventDate)}
    });
    events.sort((a, b) => b.date - a.date);
    return events;
}