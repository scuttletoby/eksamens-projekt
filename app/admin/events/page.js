"use client"

import useSWRMutation from 'swr/mutation';

import Header from '../../components/rework/header';
import Footer from '../../components/rework/footer';
import { sendRequest } from  '../../components/data';
import '../style.css';



export default function AdminEvents() {
    const eventsUrl = 'http://localhost:5888/events/admin';

    const { trigger } = useSWRMutation(eventsUrl, sendRequest);

    let formData = {
        "title":"Test",
        "content":"test@test.dk",
        "eventdate": new Date(Date.now()),
        "destination":"Test Message",
        "coordinates":"Test Message",
        "distance":0,
        "difficulty":0,
        "image":"Test Message"
    };

    function HandleSubmit(event) {
        event.preventDefault();

        let date1 = new Date(event.target[2].value);
        console.log(date1);

        console.log(formData);

        formData.title = event.target[0].value;
        formData.content = event.target[1].value;
        formData.eventdate = date1;
        formData.destination = event.target[3].value;
        formData.coordinates = event.target[4].value;
        formData.distance = event.target[5].value;
        formData.difficulty = event.target[6].value;
        formData.image = event.target[7].value;
        

        trigger(formData);
        window.alert("Event blev oprettet!");
    }

    return (
        <>
            <Header />
            <section className="flex flex-col gap-20 p-8 lg:flex-row">
                <div className="flex flex-col items-center w-full p-4 font-bold bg-white rounded-lg shadow-lg h-fit font-Lexend">
                    <h2>Opret Event</h2>
                    <form id="createEventForm" className="flex flex-col justify-center gap-4" onSubmit={HandleSubmit}>
                        <input type="text"id="createTitle" className="text-sm border-2 border-black rounded-md" placeholder="Title..." />
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Indhold..." />
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Event dato..." />
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Destionation..." />
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Coordinater..." />
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Distance..." />
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Sværhedsgrad..." />
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Billede..." />
                        <button type="submit" className="p-4 border rounded-md shadow-lg text-lime-500">Create Event</button>
                    </form>
                </div>
                <div className="flex flex-col items-center w-full p-4 font-bold bg-white rounded-lg shadow-lg h-52 font-Lexend">
                    <h2>Edit Event</h2>
                    <form className="flex flex-col justify-center gap-4">
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Event id..." />
                        <button type="submit" onClick={() => createEvent()} className="p-4 text-yellow-400 border rounded-md shadow-lg">Edit Event</button>
                    </form>
                </div>
                <div className="flex flex-col items-center w-full p-4 font-bold bg-white rounded-lg shadow-lg h-52 font-Lexend">
                    <h2>Delete Event</h2>
                    <form className="flex flex-col justify-center gap-4">
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Event id..." />
                        <button type="submit" onClick={() => createEvent()} className="p-4 border rounded-md shadow-lg text-blush">Delete Event</button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}