import Image from 'next/image';

import { useState, useEffect } from 'react';

export default function VoresMael() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [heroData, setHeroData] = useState(null);
    const [isHeroLoading, setHeroLoading] = useState(true);

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

    function sortHeroData(data) {
        let newHeroData;
        data.forEach((hero) => {
            if (hero._id == "653f624462bf0da5500f26e0") {
                newHeroData = hero;
            }
        });
        return newHeroData;
    }

    return (
        <section className="px-20 mt-20">
            <sub className="text-blush font-Lexend">{sortedHeroData.suptitle}</sub>
            <div className="flex"> 
                <h2 className="text-3xl font-bold font-Lexend">{sortedHeroData.title}</h2>
                <p>{sortedHeroData.content}</p>
            </div>
            <div className="h-48 w-[70%] bg-background1 rounded-lg flex items-center justify-around mt-16">
                {data.map((keypoint) => (
                    <div key={keypoint._id} className="flex flex-col items-center">
                        <div className="w-16 rounded-full bg-blush">
                            <i className={keypoint.icon} />
                        </div>
                        <h2 className="font-bold text-white font-Lexend">{keypoint.goalcount}</h2>
                        <p className="text-blush font-Lexend">{keypoint.goal}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}