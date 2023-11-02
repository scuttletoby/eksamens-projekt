"use client"

import Image from 'next/image';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import Header from '../components/rework/header';
import Footer from '../components/footer';

export default function Contact() {
    let tempSupTitle = "Lad os mødes - lad os cykle sammen";
    let tempTitle = "Kontakt os";

    let tempAdresse = "Ydesvej 4" + ", " + "8500 Grenaa";
    let tempOpeningHours = "Alle dage kl. 18 til 22";
    let tempEmail = "kontakt@bikelane.dk";

    const position = [56.40464943513625, 10.887165776612292]

    return (
        <>
            <Header />
                <section className="relative flex flex-col items-center gap-4 p-8 py-40 bg-background1">
                    <sub className="text-xs text-white font-Archivo">{tempSupTitle}</sub>
                    <h1 className="text-5xl font-bold text-white font-Lexend">{tempTitle}</h1>

                    <div className="absolute translate-y-1/2 rounded-lg w-80 h-80 -bottom-16">
                        <Image
                            src={"http://localhost:5888/images/hero/2.png"}
                            fill
                            className="object-cover rounded-lg"
                            alt={"en person på en cykel inde i en by"}
                        />
                    </div>
                </section>
                <section className="px-8 bg-white pt-80">
                    <div className="flex flex-col w-full gap-6 p-6 rounded-lg bg-bgColor h-fit">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-contactGray">
                                <i className="fas fa-city text-blush"></i>
                            </div>
                            <p className="text-sm font-bold text-darkGray font-Archivo">Klubhuset i Grenå</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-contactGray">
                                <i className="fas fa-map-marker-alt text-blush"></i>
                            </div>
                            <p className="text-sm font-bold text-darkGray font-Archivo">{tempAdresse}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-contactGray">
                                <i className="far fa-clock text-blush"></i>
                            </div>
                            <p className="text-sm font-bold text-darkGray font-Archivo">{tempOpeningHours}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-contactGray">
                            <i className="far fa-envelope text-blush"></i>
                            </div>
                            <p className="text-sm font-bold text-darkGray font-Archivo">{tempEmail}</p>
                        </div>
                    </div>
                    <form className="flex flex-col gap-4 py-8" id="contactForm">
                        <div className="flex flex-col">
                            <label className="text-sm font-Archivo" htmlFor="form-name">Navn</label>
                            <input required className="p-4 text-sm border rounded-md text-darkGray font-Archivo" name="form-name" id="form-name" type="text" placeholder="Dit navn..."></input>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="text-sm font-Archivo" htmlFor="form-email">Email</label>
                            <input required className="p-4 text-sm border rounded-md text-darkGray font-Archivo" name="form-email" id="form-email" type="email" placeholder="Din email..."></input>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-Archivo" htmlFor="form-phonenumber">Telefon</label>
                            <input required className="p-4 text-sm border rounded-md text-darkGray font-Archivo" name="form-phonenumber" id="form-phonenumber" type="tel" placeholder="Dit telefonnummer..."></input>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-Archivo" htmlFor="form-message">Besked</label>
                            <textarea className="max-w-full p-4 text-sm border rounded-md resize min-h-[4rem] text-darkGray font-Archivo" name="form-message" form="contactForm" placeholder="Din besked..." />
                        </div>

                        <input className="px-6 py-4 text-white bg-black rounded-md w-fit text-md font-Lexend" type="submit" value="Send besked" />
                    </form>   
                </section>
            <Footer />
        </>
    )
}