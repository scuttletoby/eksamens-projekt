"use client"
// Import event component
import { useState, useEffect } from 'react';
import Image from 'next/image';

import Header from '../components/header';
import Footer from '../components/footer';
import Event from '../components/event';
import sortEvents from '../components/sortEvents';

export default function EventsPage() {
    const [heroData, setHeroData] = useState(null);
    const [isHeroLoading, setHeroLoading] = useState(true);
    const [categoryData, setCategoryData] = useState(null);
    const [isCategoryLoading, setCategoryLoading] = useState(true);
    const [eventData, setEventData] = useState(null);
    const [isEventLoading, setEventLoading] = useState(true);
    const [currentCategory, setCurrentCategory] = useState("Alle events");
    const [sponserData, setSponserData] = useState(null);
    const [isSponserLoading, setSponserLoading] = useState(true);
    const [contactHeroData, setContactHeroData] = useState(null);
    const [isContactHeroLoading, setContactHeroLoading] = useState(true);


    let eventsPerPage = 9;



    useEffect(() => {
        fetch('http://localhost:5888/heros/6542b939be38a0e5c03e52f1', {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            setHeroData(data);
            setHeroLoading(false)
        })
        fetch('http://localhost:5888/heros/6542b939be38a0e5c03e52ef', {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            setContactHeroData(data);
            setContactHeroLoading(false)
        })
        fetch('http://localhost:5888/eventcategories', {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            setCategoryData(data);
            setCategoryLoading(false)
        })
        fetch('http://localhost:5888/events', {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            setEventData(data);
            setEventLoading(false)
        })
        fetch('http://localhost:5888/sponsors', {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            setSponserData(data);
            setSponserLoading(false)
        })
    }, [])

    if (isHeroLoading) return <p>Loading...</p>
    if (isCategoryLoading) return <p>Loading...</p>
    if (isEventLoading) return <p>Loading...</p>
    if (isSponserLoading) return <p>Loading...</p>
    if (isContactHeroLoading) return <p>Loading...</p>
    if (!heroData) return <p>No data...</p>
    if (!categoryData) return <p>No data...</p>
    if (!eventData) return <p>No data...</p>
    if (!sponserData) return <p>No data...</p>
    if (!contactHeroData) return <p>No data...</p>

    let sortedCategories = sortCategories(categoryData);
    let newEventData = categoryHandler(eventData);

    function sortCategories(data) {
        let categories = [];

        data.map((item) => {
            categories.push(item.category);
        })

        const primaryCategory = categories.filter((item) => (item == "Alle events"));
        let index = categories.indexOf(primaryCategory);
        categories.splice(index, 1);
        categories = [primaryCategory[0], ...categories];

        return categories;
    }

    function categoryHandler(data) {
        let tempEventData = data;
        if (currentCategory != "Alle events" ) {
            tempEventData = tempEventData.filter((item) => (item.category.category == currentCategory));
        }
        if (tempEventData.length > eventsPerPage) {
            tempEventData = tempEventData.filter((item, index) => (index < eventsPerPage));
        }
        tempEventData = sortEvents(tempEventData);
        return tempEventData;
    }

    function switchCategory(category) {
        setCurrentCategory(category);
    }

    return (
    <>
        <Header />
        <main className="flex flex-col items-center mx-20">
            <sub className="mt-8 text-blush font-Lexend">{heroData.suptitle}</sub>
            <h1 className="text-3xl font-bold font-Lexend max-w-[20rem] my-10">{heroData.title}</h1>
            <ul className="flex gap-4 my-5">
                {sortedCategories.map((category, index) => (
                    <li key={category + "-" + index} ><a onClick={()=>{switchCategory(category)}}>{category}</a></li>
                ))}
            </ul>
            <div className="grid w-full grid-cols-3 grid-rows-3 gap-4">
                {newEventData.map((event, index) => (
                    <Event event={event} key={event._id} />
                ))}
            </div>
            <div className="flex mt-5 mr-auto border-black divide-x">
                <button className="w-8 h-8 border-y border-l-[1px] flex justify-center items-center rounded-l-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                </button>
                <button className="w-8 h-8 border-y">1</button>
                <button className="w-8 h-8 border-y">2</button>
                <button className="w-8 h-8 border-y">3</button>
                <button className="w-8 h-8 border-y border-r-[1px] flex justify-center items-center rounded-r-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                </button>
            </div>
        </main>
        <hr className="mx-20 mt-20" />
        <section className="flex items-center px-20 mt-20">
            <div className="max-w-[18rem]">
                <sub className="font-Lexend text-blush">Sponser</sub>
                <h2 className="text-2xl font-bold font-Lexend">Støt vores sponsorer - de støtter os</h2>
            </div>
            <div className="flex gap-12">
                {sponserData.map((sponser) =>(
                    <Image
                    key={sponser._id}
                    width={50}
                    height={50}
                    src={"http://localhost:5888/images/sponsor/" + sponser.logo}
                    alt={"Logo for: " + sponser.sponser}
                    className="w-14 h-14"
                    />
                ))}
            </div>
        </section>
        <section className="flex items-center justify-center p-20 mt-20 bg-contactColor">
            <div className="max-w-[25rem]">
                <sub className="text-blush font-Lexend">Bliv en af os</sub>
                <h2 className="text-3xl font-bold text-white font-Lexend">{contactHeroData.suptitle}</h2>
            </div>
            <button className="w-32 h-12 ml-auto text-xs text-white rounded-md bg-blush">Kontakt os nu</button>
        </section>
        <Footer />
    </>
    )
}