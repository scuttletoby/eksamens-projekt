"use client"

import Header from '../../components/rework/header';
import Footer from '../../components/rework/footer';
import { createEvent } from '../../components/data';
import '../style.css';

export default function AdminEvents() {    

    return (
        <>
            <Header />
            <section className="flex flex-col gap-20 p-8 lg:flex-row">
                <div className="flex flex-col items-center w-full p-4 font-bold bg-white rounded-lg shadow-lg h-fit font-Lexend">
                    <h2>Opret Event</h2>
                    <form id="createEventForm" className="flex flex-col justify-center gap-4">
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