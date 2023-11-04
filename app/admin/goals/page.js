"use client"

import Header from '../../components/rework/header';
import Footer from '../../components/rework/footer';
import { createGoal, deleteGoal } from '../../components/data';
import '../style.css';

export default function AdminGoals() {    

    let formData = {
        "goal": "",
        "goalcount": "5121",
        "icon": "far fa-handshake",
        "order": "1"
    };

    function HandleSubmit(event) {
        event.preventDefault();
        formData.goal = event.target[0].value;

        console.log(JSON.stringify(formData));

        createGoal();
        window.alert("Din besked er blevet sendt!");
        return false;
    }

    function HandleDeleteSubmit(event) {
        event.preventDefault();

        console.log(JSON.stringify(event.target[0].value));

        deleteGoal(JSON.stringify(event.target[0].value));
        window.alert("Din besked er blevet sendt!");
        return false;
    }

    return (
        <>
            <Header />
            <section className="flex flex-col gap-20 p-8 lg:flex-row">
                <div className="flex flex-col items-center w-full p-4 font-bold bg-white rounded-lg shadow-lg h-52 font-Lexend">
                    <h2>Opret Goal</h2>
                    <form id="createEventForm" className="flex flex-col justify-center gap-4" onSubmit={HandleSubmit}>
                        <input type="text"id="createTitle" className="text-sm border-2 border-black rounded-md" placeholder="Create Goal..." />
                        <button type="submit" className="p-4 border rounded-md shadow-lg text-lime-500">Create Goal</button>
                    </form>
                </div>
                <div className="flex flex-col items-center w-full p-4 font-bold bg-white rounded-lg shadow-lg h-52 font-Lexend">
                    <h2>Edit Goal</h2>
                    <form className="flex flex-col justify-center gap-4">
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Edit Goal..." />
                        <button type="submit" onClick={() => createEvent()} className="p-4 text-yellow-400 border rounded-md shadow-lg">Edit Goal</button>
                    </form>
                </div>
                <div className="flex flex-col items-center w-full p-4 font-bold bg-white rounded-lg shadow-lg h-52 font-Lexend">
                    <h2>Delete Goal</h2>
                    <form className="flex flex-col justify-center gap-4" onSubmit={HandleDeleteSubmit}>
                        <input type="text" className="text-sm border-2 border-black rounded-md" placeholder="Goal id..." />
                        <button type="submit" className="p-4 border rounded-md shadow-lg text-blush">Delete Goal</button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}