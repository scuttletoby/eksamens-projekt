import Image from 'next/image';

import { useState, useEffect } from 'react';

export default function Faellesskab() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5888/community', {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false)
          })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data...</p>

    return (
        <section className="flex px-20 mt-16 bg-white max-lg:flex-col">
            <div id="square-container" className="grid items-stretch grid-cols-2 grid-rows-3 gap-4 my-5 w-80 h-80 max-lg:mx-auto">
            <Image
                className="inline-block col-start-1 row-span-2 row-start-1 rounded-lg"
                src={'http://localhost:5888/images/community/' + data.image1}
                width={250}
                height={250}
                alt={"Square image 1"}
                />
                <Image
                className="inline-block col-start-2 row-span-1 row-start-1 rounded-lg"
                src={'http://localhost:5888/images/community/' + data.image2}
                width={250}
                height={250}
                alt={"Square image 2"}
                />
                <Image
                className="inline-block col-start-1 row-start-3 rounded-lg"
                src={'http://localhost:5888/images/community/' + data.image3}
                width={250}
                height={250}
                alt={"Square image 3"}
                />
                <Image
                className="inline-block col-start-2 row-span-2 row-start-2 rounded-lg"
                src={'http://localhost:5888/images/community/' + data.image4}
                width={250}
                height={250}
                alt={"Square image 4"}
                />
            </div>
            <section className="flex flex-col w-[30rem] gap-4 lg:ml-auto max-lg:mx-auto">
                <sub className="my-5 text-blush font-Lexend">{data.suptitle}</sub>
                <h2 className="text-3xl font-bold font-Lexend">{data.title}</h2>
                <p className="text-xs">{data.content}</p>
                <div className="lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-2 max-lg:flex max-lg:flex-col">
                    {data.keypoints.map((keypoint) => (
                        <div className="flex items-center" key={keypoint._id}>
                        <div id="checkmark" className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <p className="text-xs">{keypoint.keypoint}</p>
                        </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};