import Image from 'next/image';

import { useState, useEffect } from 'react';

export default function VoresMael() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [heroData, setHeroData] = useState(null);
    const [isHeroLoading, setHeroLoading] = useState(true);
    const [isHidden, setHidden] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5888/goals', {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false)
          })
        fetch('http://localhost:5888/heros', {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            setHeroData(data);
            setHeroLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (isHeroLoading) return <p>Loading...</p>
    if (!data) return <p>No data...</p>
    if (!heroData) return <p>No data...</p>

    let sortedHeroData = sortHeroData(heroData);
    let video = document.getElementById('video');

    function sortHeroData(data) {
        let newHeroData;
        data.forEach((hero) => {
            if (hero._id == "653f624462bf0da5500f26e0") {
                newHeroData = hero;
            }
        });
        return newHeroData;
    }

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
        <section className="h-full px-20 pt-20">
            <sub className=" text-blush font-Lexend">{sortedHeroData.suptitle}</sub>
            <div className="flex my-10 max-lg:flex-col"> 
                <h2 className="text-3xl font-bold font-Lexend">{sortedHeroData.title}</h2>
                <p>{sortedHeroData.content}</p>
            </div>
            <div className="flex items-center justify-around gap-8 mt-16 rounded-lg relative lg:h-48 max-lg:h-full lg:w-[90%] max-lg:flex-col bg-background1 px-12">
                {data.map((keypoint) => (
                    <div key={keypoint._id} className="flex flex-col items-center gap-1 m-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blush">
                            <i className={keypoint.icon} />
                        </div>
                        <h2 className="font-bold text-white font-Lexend">{keypoint.goalcount}</h2>
                        <p className="text-blush font-Lexend">{keypoint.goal}</p>
                    </div>
                ))}
                <div className="absolute h-40 max-lg:-bottom-52 lg:translate-x-1/2 shadow-2xl lg:w-40 max-lg:w-full lg:right-0 lg:bottom-50%">
                    <Image
                    fill
                    objectFit="cover"
                    className="absolute w-56 h-56 rounded-lg"
                    src={"http://localhost:5888/images/hero/" + sortedHeroData.image}
                    alt="Vores mål billede"
                    />
                    <a href="#" onClick={videoHandler} className="absolute right-2 bottom-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    </div>
                </a>
                </div>
            </div>
        </section>
    )
}