"use client"

import Image from 'next/image';
import CountUp from 'react-countup';
import { useState } from 'react';

import { getGoals, getHero } from  '../../components/data';

export default function Goals() {
    let { data: goals, isLoading: isGoalsLoading, isError: isGoalsError} = getGoals();
    let { data: hero, isLoading: isHeroLoading, isError: isHeroError} = getHero("653f624462bf0da5500f26e0");
    const [isHidden, setHidden] = useState(true);

    if (isGoalsLoading || isGoalsError) return <div>Error...</div>
    if (isHeroLoading || isHeroError) return <div>Loading...</div>

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


    return (
        <>
            <section className="flex flex-col gap-10 px-8 py-20 max-lg:pb-[28rem]">
                <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center">
                    <div className="flex flex-col gap-4 lg:w-1/2">
                        <sub className="text-lg text-blush font-Archivo">{hero.suptitle}</sub>
                        <h2 className="text-3xl font-bold font-Lexend">{hero.title}</h2>
                    </div>
                    <p className="text-xs font-bold text-darkGray font-Archivo lg:w-1/2">{hero.content}</p>
                </div>
                    <div className="relative -z-0 flex flex-col justify-around w-full p-6 rounded-lg lg:w-[85%] lg:items-center lg:flex-row h-fit lg:h-60 bg-background1">
                        {goals.map((keypoint) => (
                            <div key={keypoint._id} className="flex flex-col items-center gap-1 m-4">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blush">
                                    <i className={keypoint.icon + " text-white"} />
                                </div>
                                <CountUp enableScrollSpy={true} scrollSpyDelay={500} duration={4} className="font-bold text-white font-Lexend" end={keypoint.goalcount} />
                                <p className="text-blush font-Lexend">{keypoint.goal}</p>
                            </div>
                        ))}
                        <div className="z-10 max-lg:translate-y-1/2 max-lg:-bottom-[12rem] absolute lg:w-fit w-full lg:-right-[3rem] max-lg:left-0 lg:translate-x-1/2">
                            <div className="relative flex justify-center rounded-lg lg:w-fit">
                                <Image
                                    width={300}
                                    height={300}
                                    className="z-10 object-cover w-full rounded-lg h-80 lg:h-48 lg:w-48"
                                    src={"http://localhost:5888/images/hero/" + hero.image}
                                    alt="Vores mål billede"
                                />
                                <button onClick={videoHandler} className="absolute z-10 w-12 h-12 bg-white rounded-full right-2 bottom-2">
                                        <i className="fas fa-play text-blush"></i>
                                </button>
                            </div>
                        </div>
                    </div>
            </section>
            <div id="video" className="z-50 hidden">
                <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black opacity-80">
                    <button className="fixed w-40 h-40 -right-32 -top-14" onClick={videoHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <iframe
                        className="fixed z-20 w-3/4 h-3/4 top-24 left-44"
                        src={hero.videolink}
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