"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';

import { motion } from "framer-motion"


export default function FrontHero() {
    const [keyword, setKeyword] = useState("Entusiaster");
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const tempHeroTitle = "Vi er den bedste cykelklub for Entusiaster Grupper Alle Entusiaster";
    const tempHeroContent = "Ab esse quod repellendus fugit amet eius aspernatur excepturi culpa ipsa voluptatum.";
    const tempHeroBtnText = "Kom og deltag";
    const tempHeroImg = "/public/images/hero1.jpg";

    let heroTitle = tempHeroTitle.slice(0, 30);
    let keywords = tempHeroTitle.slice(31).split(" ");
    let index = 0;
    
    useEffect(() => {
        const animateTitle = setInterval(() => {
            if (index == (keywords.length - 1)) index = -1;
            index++;
            setKeyword(keywords[index]);
        }, 5000);
        return () => clearInterval(animateTitle);
    }, []);

    return (
        <section className="flex flex-col gap-8 px-8 py-8 lg:py-20 lg:flex-row lg:justify-between bg-bgColor clip-path: polygon(100% 0, 100% 96%, 71% 98%, 35% 99%, 0 97%, 0 0);">
            <div className="flex flex-col gap-6 lg:w-1/3">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold font-Lexend">{heroTitle}</h2>
                    <h2 className="text-3xl font-bold font-Lexend text-blush">{keyword}</h2>
                </div>
                <p className="text-lg text-dimGray font-Archivo">{tempHeroContent}</p>
                <button className="px-6 py-4 text-white rounded-md w-fit bg-blush">{tempHeroBtnText}</button>
            </div>

            <div className="relative rounded-lg w-80 h-80 lg:w-2/5">
                <Image
                    src={'http://localhost:5888/images/hero/hero1.jpg'}
                    fill
                    className="object-cover rounded-lg"
                    alt={"Image of a guy standing with a bike"}
                    priority
                />
                <button className="absolute w-12 h-12 bg-white rounded-full right-2 top-2" onClick={() => setIsVideoOpen(isVideoOpen => !isVideoOpen)}>
                    <i className="fas fa-play text-blush"></i>
                </button>
            </div>
        </section>
    )
}