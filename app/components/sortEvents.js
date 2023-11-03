
/* Sorterer events efter dato */
export default function SortEvents(events) {
    events.forEach((event) => {
        events.eventdate = {Date: new Date(event.eventDate)}
    });
    events.sort((a, b) => b.date - a.date);
    return events;
}