"use client"

import Image from 'next/image';
import Link from 'next/link';

import { getContactInfo, getEvents } from  '../data';
import SortEvents from '../sortevents';


function getRandomImages(data, amount) {
    let images = [];
    data.forEach((event) => {
        images.push(`http://localhost:5888/images/event/${event.image}`)
    });

    images.sort(() => Math.random() - 0.5);
    images = images.slice(0, amount);
    return images;
}

export default function Footer() {
    let { data: contact, isLoading: isContactLoading, isError: isContactError} = getContactInfo();
    let { data: events, isLoading: isEventsLoading, isError: isEventsError} = getEvents();

    if (isContactError || isEventsError) return <div>Error...</div>
    if (isContactLoading || isEventsLoading) return <div>Loading...</div>

    const sortedEvents = SortEvents(events);
    const footerEvents = sortedEvents.slice(0, 4);
    const randomImages = getRandomImages(events, 6);


    return (
        <footer className="flex flex-col gap-10 px-8 pt-20 pb-10 bg-background2 bg-footer">
            <div className="flex flex-col gap-10 lg:flex-row">
                <div className="flex flex-col gap-10 lg:w-1/4">
                    <Image
                        src={"/images/logoFooter.png"}
                        width={0}
                        height={0}
                        sizes="(max-width: 1024px) 760, 130px"
                        className="w-20"
                        alt="footer image"
                    />
                    <p className="text-sm text-footerText font-Archivo">{contact.companypayoff}</p>
                    <div className="flex flex-col justify-center gap-2">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center p-2 bg-gray-700 rounded-full">
                                <i className="fas fa-envelope text-blush"></i>
                            </div>
                            <p className="text-sm font-bold text-footerText font-Lexend">{`${contact.address}, ${contact.zipcity}`}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center p-2 bg-gray-700 rounded-full">
                            <i className="fas fa-home text-blush"></i>
                            </div>
                            <p className="text-sm font-bold text-footerText font-Lexend">{contact.email}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 lg:w-1/4">
                    <h2 className="font-bold text-white text-1xl font-Lexend">Kommende events</h2>
                    <hr className="border border-gray-800" />
                    <div className="flex flex-col gap-6">
                        {footerEvents.map((event) => (
                            <div key={event._id} className="flex items-center gap-2">
                                <i className="fas fa-chevron-right text-blush"></i>
                                <p className="text-sm font-bold text-footerText font-Lexend">{event.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-8 lg:w-1/4">
                    <h2 className="font-bold text-white text-1xl font-Lexend">Indhold</h2>
                    <hr className="border border-gray-800" />
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <i className="fas fa-chevron-right text-blush"></i>
                            <Link href="/about" className="text-sm font-bold text-footerText font-Lexend">Om os</Link>
                        </div>

                        <div className="flex items-center gap-2">
                            <i className="fas fa-chevron-right text-blush"></i>
                            <Link href="/events" className="text-sm font-bold text-footerText font-Lexend">Events</Link>
                        </div>

                        <div className="flex items-center gap-2">
                            <i className="fas fa-chevron-right text-blush"></i>
                            <Link href="/contact" className="text-sm font-bold text-footerText font-Lexend">Kontakt</Link>
                        </div>

                        <div className="flex items-center gap-2">
                            <i className="fas fa-chevron-right text-blush"></i>
                            <Link href="/news" className="text-sm font-bold text-footerText font-Lexend">Nyheder</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 lg:w-1/4">
                    <h2 className="font-bold text-white text-1xl font-Lexend">Galleri</h2>
                    <hr className="border border-gray-800" />
                    <div className="grid grid-cols-3 grid-rows-2 gap-2">
                    {randomImages.map((image, index) => (
                        <Image
                        key={"image-" + index}
                        className="w-full h-full rounded-md"
                        src={image}
                        alt={"Image in the gallery"}
                        width={250}
                        height={180}
                        />
                    ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-10">
                <hr className="border border-gray-800" />
                <p className="text-xs text-footerText font-Lexend">© Copyright 2012 Bikelane.</p>
            </div>
        </footer>
    )
}