import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Hero() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isHidden, setHidden] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5888/heros/653f624462bf0da5500f26de')
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false)
          })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No event data...</p>

    let video = document.getElementById('video');

    // console.log(data);

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
        <section className="flex px-20 mt-8 lg:items-center max-lg:flex-col">
            <div className="flex flex-col">
                <h1 className="h-20 w-[25rem] my-12 text-5xl font-bold font-Archivo">{data.title}<br /><span>Alle</span></h1>
                <p className="my-12 w-[25rem]">{data.content}</p>
                <button className="h-12 mr-auto text-white rounded-md w-36 bg-blush">{data.buttontext}</button>
            </div>
            <div className="relative mt-10 lg:ml-auto max-lg:mx-auto">
                <Image
                className="w-[30rem] h-[24rem] rounded-lg"
                src={'http://localhost:5888/images/hero/' + data.image}
                width={400}
                height={300}
                priority
                alt={"Hero image"}
                />
                <a href="#" onClick={videoHandler} className="absolute right-2 top-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    </div>
                </a>
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
                    src={data.videolink}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    >
            </iframe>
        </div>
        </>
    );
}