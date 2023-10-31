import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ProjectorScreenChart } from "@phosphor-icons/react";

export default function Centrum() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5888/interest', {
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
        <section className="flex justify-between px-20 mt-40 bg-white pt-28 max-lg:items-center max-lg:flex-col">
            <div className="flex flex-col py-5 gap-4 max-w-[50%]">
                <sub className="py-5 font-Lexend text-blush">{data.suptitle}</sub>
                <h2 className="text-2xl font-bold font-Lexend">{data.title}</h2>
                <p className="py-5 font-Lexend">{data.content}</p>
                <div className="grid grid-rows-2 gap-4 lg:grid-rows-4 lg:grid-cols-2">
                {data.keypoints.map((keypoint) => (
                    <div key={keypoint._id} className="flex items-center">
                        <div className="bg-[#f4f5fa] rounded-full w-12 h-12 flex items-center justify-center mr-4">
                            <ProjectorScreenChart size={32} color="#D45D79" weight="thin" /> {/*{keypoint.icon}*/}
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold font-Lexend">{keypoint.keypoint}</h2>
                            <p className="text-sm font-Lexend">{keypoint.description}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="flex gap-2 h-52 max-lg:mb-40 lg:pt-32">
                <div className="flex flex-col gap-2">
                        <Image
                        className="inline-block rounded-lg"
                        width={200}
                        height={200}
                        alt={"Image1"}
                        src={'http://localhost:5888/images/interest/' + data.image1} />
                        <Image
                        className="rounded-lg"
                        width={200}
                        height={200}
                        alt={"Image2"}
                        src={'http://localhost:5888/images/interest/' + data.image3} />
                </div>
                <div className="flex flex-col gap-2">
                        <Image
                        className="rounded-lg"
                        width={200}
                        height={200}
                        alt={"Image3"}
                        src={'http://localhost:5888/images/interest/' + data.image2} />
                        <Image
                        className="object-fill rounded-lg"
                        width={200}
                        height={200}
                        alt={"Image4"}
                        src={'http://localhost:5888/images/interest/' + data.image4} />
                </div>
            </div>
        </section>
    )
}