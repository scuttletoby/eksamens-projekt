"use client"

import dynamic from 'next/dynamic';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';

import Header from '../components/rework/header';
import Footer from '../components/footer';
import { getHero, getContactInfo, sendRequest } from  '../components/data';
import "./style.css";
import ScrollToTop from '../components/scrolltotop';


export default function Contact() {
    const inqueryUrl = 'http://localhost:5888/inqueries';

    const { trigger } = useSWRMutation(inqueryUrl, sendRequest);
    let { data: hero, isLoading: isHeroLoading, isError: isHeroError} = getHero("653f624462bf0da5500f26e2");
    let { data: contact, isLoading: isContactLoading, isError: isContactError} = getContactInfo();

    if (isHeroError || isContactError) return <div>Error...</div>
    if (isHeroLoading || isContactLoading) return <div>Loading...</div>

    // let formData = {
    //     "name":"Test",
    //     "email":"test@test.dk",
    //     "phone":"30644593",
    //     "message":"Test Message"
    // };

    function HandleSubmit(event) {
        event.preventDefault();
        let fd = new FormData(event.target);
        // formData.name = event.target[0].value;
        // formData.email = event.target[1].value;
        // formData.phone = event.target[2].value;
        // formData.message = event.target[3].value;

        trigger(fd);
        window.alert("Din besked er blevet sendt!");
        return false;
    }
    

    const Map = dynamic(
        () => import('../components/leaflet-map'), {
            ssr: false ,
            loading: () => <div>Loading...</div>
        });

    return (
        <>
            <Header />
                <section className="relative flex flex-col items-center gap-4 p-8 py-40 bg-background1">
                    <sub className="text-xs text-white font-Archivo">{hero.suptitle}</sub>
                    <h1 className="text-5xl font-bold text-white font-Lexend">{hero.title}</h1>
                        <div className="absolute w-full translate-y-1/2 rounded-lg h-80 -bottom-16">
                            <Image
                                src={"http://localhost:5888/images/hero/" + hero.image}
                                fill
                                className="object-cover px-8 rounded-lg"
                                alt={"en person på en cykel inde i en by"}
                            />
                        </div>
                </section>
                <section className="flex flex-col justify-between gap-8 p-8 bg-white pt-80 lg:flex-row">
                    <div className="flex flex-col w-full gap-6 p-6 pr-40 rounded-lg lg:w-fit bg-bgColor h-fit">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center p-2 rounded-full w-fit bg-contactGray">
                                <i className="fas fa-city text-blush"></i>
                            </div>
                            <p className="text-sm font-bold text-darkGray font-Archivo">Klubhuset i Grenå</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center p-2 rounded-full w-fit bg-contactGray">
                                <i className="fas fa-map-marker-alt text-blush"></i>
                            </div>
                            <p className="text-sm font-bold text-darkGray font-Archivo">{`${contact.address}, ${contact.zipcity}`}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center p-2 rounded-full w-fit bg-contactGray">
                                <i className="far fa-clock text-blush"></i>
                            </div>
                            <p className="text-sm font-bold text-darkGray font-Archivo">{contact.openinghours}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center p-2 rounded-full w-fit bg-contactGray">
                            <i className="far fa-envelope text-blush"></i>
                            </div>
                            <p className="text-sm font-bold text-darkGray font-Archivo">{contact.email}</p>
                        </div>
                    </div>
                    <form className="flex flex-col gap-4 lg:w-full" id="contactForm" onSubmit={HandleSubmit}>
                        <div className="flex flex-col">
                            <label className="text-sm font-Archivo" htmlFor="form-name">Navn</label>
                            <input required pattern="([a-z A-Z]+)*" className="p-4 text-sm border rounded-md text-darkGray font-Archivo" name="name" id="form-name" type="text" placeholder="John Johnson"></input>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="text-sm font-Archivo" htmlFor="form-email">Email</label>
                            <input required className="p-4 text-sm border rounded-md text-darkGray font-Archivo" name="email" id="form-email" type="email" placeholder="eksempel@test.dk"></input>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-Archivo" htmlFor="form-phonenumber">Telefon</label>
                            <input required pattern="([0-9]{2} ){3}[0-9]{2}" className="p-4 text-sm border rounded-md text-darkGray font-Archivo" name="phone" id="form-phonenumber" type="tel" placeholder="12 42 12 75"></input>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-Archivo" htmlFor="form-message">Besked</label>
                            <textarea required className="max-w-full p-4 text-sm border rounded-md resize min-h-[4rem] text-darkGray font-Archivo" name="message" form="contactForm" placeholder="Din besked..." />
                        </div>

                        <input id="form-submit" className="px-6 py-4 text-white bg-black rounded-md w-fit text-md font-Lexend" type="submit" value="Send besked" />
                    </form>   
                </section>
                <Map />
            <Footer />
            <ScrollToTop />
        </>
    )
}