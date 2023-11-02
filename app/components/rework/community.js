import Image from 'next/image';

export default function Community() {
    let tempSupTitle = 'Fællesskab!';
    let tempTitle = 'Det hele handler om at være sammen om noget fælles ... ';
    let tempContent = 'Her er der plads til alle - og sammenholdet er stærkt. Vi passer på hinanden og respekterer hinandens forskelligheder - også når det kommer til ambitioner, mål, valg af cykel. Det vigtigste er at alle føler sig velkommen. ';

    let tempKeypoints = [
        {"_id": "653d0d03eab926a76e056aab", "keypoint": "Alle er velkommen og mødes med gensidig respekt "},
        {"_id": "653d0d15eab926a76e056aaf", "keypoint": "Du bestemmer selv mål og formål for din deltagelse"},
        {"_id": "653d0d24eab926a76e056ab4", "keypoint": "Tag familien med"},
        {"_id": "653d0d2eeab926a76e056aba", "keypoint": "Hyggemotionist eller vild landevejsrytter - du bestemmer"},
        {"_id": "653d0d3aeab926a76e056ac1", "keypoint": "Kontingentet går til arrangementer og hygge i klubben "},
        {"_id": "653d0d42eab926a76e056ac9", "keypoint": "Vi passer på hinanden"},
    ]

    return (
        <section className="flex flex-col gap-8 px-8 py-20 bg-white">
            <div className="flex gap-6">
                <div className="flex flex-col gap-6">
                    <Image
                        src={"http://localhost:5888/images/community/box1.jpg"}
                        width={330}
                        height={160}
                        className="w-full rounded-lg"
                        alt={"Del 1 af et billede"}
                    />
                    <Image
                        src={"http://localhost:5888/images/community/box3.jpg"}
                        width={330}
                        height={160}
                        className="w-full rounded-lg"
                        alt={"Del 2 af et billede"}
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <Image
                        src={"http://localhost:5888/images/community/box2.jpg"}
                        width={330}
                        height={160}
                        className="w-full rounded-lg"
                        alt={"Del 3 af et billede"}
                    />
                    <Image
                        src={"http://localhost:5888/images/community/box4.jpg"}
                        width={330}
                        height={160}
                        className="w-full rounded-lg"
                        alt={"Del 4 af et billede"}
                    />
                </div>
            </div>
            <sub className="text-lg text-blush font-Archivo">{tempSupTitle}</sub>
            <h2 className="text-3xl font-bold font-Lexend">{tempTitle}</h2>
            <p className="text-xs font-bold text-darkGray font-Archivo">{tempContent}</p>
            <div className="flex flex-col gap-4">
                {tempKeypoints.map((keypoint) => (
                    <div key={keypoint._id} className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-checkmarkBg">
                            <i className="fas fa-check text-blush"></i>
                        </div>
                        <p className="text-xs text-darkGray font-Archivo">{keypoint.keypoint}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}