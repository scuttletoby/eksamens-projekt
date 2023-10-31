import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Footer() {
    const [data, setData] = useState(null);
    const [eventData, setEventData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isEventLoading, setEventLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5888/contactinformation', {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false)
          })
        fetch('http://localhost:5888/events', {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            setEventData(data);
            setEventLoading(false)
          })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (isEventLoading) return <p>Loading...</p>
    if (!data) return <p>No data...</p>
    if (!eventData) return <p>No data...</p>

    function sortEvents(events) {
        events.forEach((event) => {
            events.eventdate = {Date: new Date(event.eventDate)}
        });
        events.sort((a, b) => b.date - a.date);
        //console.log(events);
    }

    function getRandomImages(data, amount) {
        let images = [];
        eventData.forEach((event) => {
            images.push(`http://localhost:5888/images/event/${event.image}`)
        });

        images.sort(() => Math.random() - 0.5);
        images = images.slice(0, amount);
        return images;
    }

    sortEvents(eventData);
    const events = eventData.slice(0, 4);

    let randomImages = getRandomImages(eventData, 6);
    
    return (
        <footer className="w-full h-full py-10 mt-60 bg-background2 bg-footer">
            <div className="flex px-20 max-lg:flex-col">
                <div className="flex flex-col w-64 mt-10">
                    <Image
                    alt="Logo in footer"
                    src={"/images/logoFooter.png"}
                    width="125"
                    height="200"
                    />
                    <p className="mt-10 text-xs font-bold text-gray-500 font-Lexend">{data.companypayoff}</p>
                    <div className="flex items-center gap-1 mt-10">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#D45D79" className="w-5 h-5">
                                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-xs font-bold text-gray-500 font-Lexend">{data.address + ", " + data.zipcity}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#D45D79" className="w-5 h-5">
                                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                            </svg>
                        </div>
                        <p className="text-xs font-bold text-gray-500 font-Lexend">{data.email}</p>
                    </div>
                </div>
                <div className="w-64 mt-10">
                    <h2 className="text-xl font-bold text-white font-Lexend">Kommende Events</h2>
                    <hr className="mt-10 w-[80%] border-gray-800" />
                    <div className="flex flex-col gap-4 mt-10">
                    {events.map((event) => (
                        <div className="flex" key={event._id}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#D45D79" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                            <a className="font-bold text-gray-500 font-Lexend">{event.title}</a>
                        </div> 
                    ))}
                    </div>
                </div>
                <div className="w-64 mt-10">
                    <h2 className="text-xl font-bold text-white font-Lexend">Indhold</h2>
                    <hr className="mt-10 w-[80%] border-gray-800" />
                    <div className="flex flex-col gap-4 mt-10">
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#D45D79" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                            <a className="font-bold text-gray-500 font-Lexend">Om os</a>
                        </div>
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#D45D79" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                            <a className="font-bold text-gray-500 font-Lexend">Events</a>
                        </div>
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#D45D79" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                            <a className="font-bold text-gray-500 font-Lexend">Kontakt</a>
                        </div>
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#D45D79" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                            <a className="font-bold text-gray-500 font-Lexend">Nyheder</a>
                        </div>
                    </div>
                </div>
                <div  className="w-64 mt-10">
                    <h2 className="text-xl font-bold text-white font-Lexend">Galleri</h2>
                    <hr className="mt-10 w-[80%] border-gray-800" />
                    <div className="grid grid-cols-3 grid-rows-2 gap-2 mt-10">
                    {randomImages.map((image, index) => (
                        <Image
                        key={"image" + index}
                        className="rounded-md"
                        src={image}
                        alt={"Image in the gallery"}
                        width={200}
                        height={200}
                        />
                    ))}
                    </div>
                </div>
            </div>
            <hr className="mx-auto mt-10 w-[80%] border-gray-800" />
            <p className="px-20 mt-10 text-xs text-gray-500 font-Lexend">© Copyright 2012 Bikelane.</p>
        </footer>
    );
}