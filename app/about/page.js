"use client"

import Image from 'next/image';

import Header from '../components/rework/header';
import Footer from '../components/footer';
import Community from '../components/rework/community';

export default function About() {
    let tempSupTitle = "Klubbens historie";
    let tempTitle = "Bikelane blev skabt i 2001 i Grenaa.";
    let tempContent = "I efteråret 2001 fødes de første tanker om opstart af en cykelklub i Grenå. Vi var en lille flok cykelglade tosser der mødtes hver uge for at cykle sammen. ";
    let tempBtnText = "Kom og vær med!";

    let tempTestimonialSupTitle = "Testimonial";
    let tempTestimonialTitle = "Det har vi at sige om vores klub ... kom og vær med!";
    let tempTestimonialContent = "Jeg har været med i klubben i 5 år nu. Og jeg elsker det. Fra første dag følte jeg mig velkommen, og jeg har fået masser af hjælp til både cyklen og min kørsel. Jeg startede som motionist, men er lidt mere målrettet nu.Jeg har været med i klubben i 5 år nu. Og jeg elsker det. Fra første dag følte jeg mig velkommen, og jeg har fået masser af hjælp til både cyklen og min kørsel. Jeg startede som motionist, men er lidt mere målrettet nu.Jeg har været med i klubben i 5 år nu. Og jeg elsker det. Fra første dag følte jeg mig velkommen, og jeg har fået masser af hjælp til både cyklen og min kørsel. Jeg startede som motionist, men er lidt mere målrettet nu.";
    
    let tempGoals = [
        {"_id": "653f624462bf0da5500f26da", "goal": "Konkurrencer", "goalCount": 2324, "icon": "fas fa-crown"},
        {"_id": "653f624462bf0da5500f26db", "goal": "Events", "goalCount": 2470, "icon": "fas fa-biking"},
        {"_id": "653f624462bf0da5500f26dc", "goal": "Ruter", "goalCount": 1380, "icon": "far fa-map"},
        {"_id": "653f624462bf0da5500f26dd", "goal": "Medlemmer", "goalCount": 1420, "icon": "far fa-handshake"},
    ]


    let newTestimonialContent = tempTestimonialContent.slice(0, 219);

    return (
        <>
            <Header />
            <section className="flex flex-col gap-4 p-8">
                <sub className="text-lg text-blush font-Archivo">{tempSupTitle}</sub>
                <h1 className="text-3xl font-bold font-Lexend">{tempTitle}</h1>
                <p className="text-sm font-bold text-darkGray font-Archivo">{tempContent}</p>
                <button className="px-6 py-4 text-white bg-black rounded-md w-fit">{tempBtnText}</button>
                <Image
                    src={"/images/about3.jpg"}
                    width={330}
                    height={160}
                    className="w-full my-8 rounded-lg"
                    alt={"en person på en cykel inde i en by"}
                />
            </section>
            <section id="testimonial" className="flex flex-col gap-4 px-8 pt-8 bg-background3 bg-deiftBlue">
                <sub className="text-lg text-blush font-Archivo">{tempTestimonialSupTitle}</sub>
                <h2 className="text-3xl font-bold text-white font-Lexend">{tempTestimonialTitle}</h2>
                <div className="flex justify-between">
                    <p className="w-5/6 text-xs text-left text-white font-Archivo">{newTestimonialContent}</p>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blush">
                        <i className="text-white fas fa-quote-right"></i>
                    </div>
                </div>
                <Image
                    src={"http://localhost:5888/images/hero/member4.png"}
                    width={330}
                    height={160}
                    className="w-full"
                    alt={"Mand der smiler"}
                />
            </section>
            <Community />
            <section className="flex flex-col items-center justify-center h-full gap-16 p-40 bg-bgColor">
                {tempGoals.map((goal) => (
                    <div key={goal._id} className="relative flex flex-col items-center w-full gap-2">
                        <h2 className="text-3xl font-bold font-Lexend">{goal.goalCount}</h2>
                        <sub className="text-xs font-bold text-darkGray font-Archivo">{goal.goal.toUpperCase()}</sub>
                        <div className="absolute flex items-center justify-center w-8 h-8 border rounded-full -right-8 -top-6 border-blush">
                            <i className={`text-blush ${goal.icon}`}></i>
                        </div>
                    </div>
                ))}
            </section>
            <Footer />
        </>
    )
}