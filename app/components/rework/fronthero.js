"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getHero } from  '../data';

import { motion } from "framer-motion"


export default function FrontHero() {
    const [keyword, setKeyword] = useState("Entusiaster");
    const [isHidden, setHidden] = useState(true);

    const tempHeroTitle = "Vi er den bedste cykelklub for Entusiaster Grupper Alle Entusiaster";
    const tempHeroContent = "Ab esse quod repellendus fugit amet eius aspernatur excepturi culpa ipsa voluptatum.";
    const tempHeroBtnText = "Kom og deltag";
    const tempVideolink = "https://www.youtube.com/embed/H55W1NhAbQo?si=IChJTF7-sXzSHZ16";
    const tempBtnlink = "contact"

    let heroTitle = tempHeroTitle.slice(0, 30);
    let keywords = tempHeroTitle.slice(31).split(" ");
    let index = 0;

    if (!window) return <div>Loading...</div>

    let video = document.getElementById('video');

    function videoHandler() {
        if (isHidden) {
            video.classList.remove('hidden');
            setHidden(false);
        }
        if (!isHidden) {
            video.classList.add('hidden');
            setHidden(true);
        }
    }
    
    useEffect(() => {
        const animateTitle = setInterval(() => {
            if (index == (keywords.length - 1)) index = -1;
            index++;
            setKeyword(keywords[index]);
        }, 5000);
        return () => clearInterval(animateTitle);
    }, []);

    return (
        <>
            <section className="flex flex-col gap-8 px-8 py-8 lg:flex-row lg:justify-between bg-bgColor clip-path: polygon(100% 0, 100% 96%, 71% 98%, 35% 99%, 0 97%, 0 0);">
                <div className="flex flex-col gap-6 lg:w-1/3">
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold font-Lexend">{heroTitle}</h2>
                        <h2 className="text-3xl font-bold font-Lexend text-blush">{keyword}</h2>
                    </div>
                    <p className="text-lg text-dimGray font-Archivo">{tempHeroContent}</p>
                    <Link href={"/" + tempBtnlink} className="px-6 py-4 text-white rounded-md w-fit bg-blush">{tempHeroBtnText}</Link>
                </div>

                <div className="relative rounded-lg w-80 h-80 lg:w-1/2">
                    <Image
                        src={'http://localhost:5888/images/hero/hero1.jpg'}
                        fill
                        className="object-cover rounded-lg"
                        alt={"Image of a guy standing with a bike"}
                        priority
                    />
                    <button onClick={videoHandler} className="absolute w-12 h-12 bg-white rounded-full right-2 top-2">
                        <i className="fas fa-play text-blush"></i>
                    </button>
                </div>
            </section>
            <div id="video" className="hidden">
                <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-80">
                    <button className="fixed w-40 h-40 -right-32 -top-14" onClick={videoHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <iframe
                        className="fixed w-3/4 h-3/4 top-24 left-44"
                        src={tempVideolink}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        >
                </iframe>
            </div>
        </>
    )
}