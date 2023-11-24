
/* Sorterer events efter dato */
export default function SortEvents(events) {
    const currentDate = new Date();

    events.forEach((event) => {
        events.eventdate = {Date: new Date(event.eventDate)}
    });
    events.sort((a, b) => b.date - a.date);

    events.forEach((event) => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= currentDate;
    })
    return events;
}