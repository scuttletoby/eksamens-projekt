import Image from 'next/image';

import { getCommunity } from  '../../components/data';

export default function Community() {
    let { data: community, isLoading: isCommunityLoading, isError: isCommunityError} = getCommunity();

    if (isCommunityError) return <div>Error...</div>
    if (isCommunityLoading) return <div>Loading...</div>


    return (
        <section className="flex flex-col items-center justify-around gap-8 px-8 py-20 bg-white lg:flex-row">
            <div className="flex w-full gap-6 lg:w-1/2">
                <div className="flex flex-col w-full gap-6">
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
                <div className="flex flex-col w-full gap-6">
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
            <div className="flex flex-col gap-8 lg:w-2/5">
                <sub className="text-lg text-blush font-Archivo">{community.suptitle}</sub>
                <h2 className="text-3xl font-bold font-Lexend">{community.title}</h2>
                <p className="text-xs font-bold text-darkGray font-Archivo">{community.content}</p>
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:grid-rows-3">
                    {community.keypoints.map((keypoint) => (
                        <div key={keypoint._id} className="flex items-center gap-2">
                            <div className="flex items-center justify-center p-1 rounded-full w-fit bg-checkmarkBg">
                                <i className="fas fa-check text-blush"></i>
                            </div>
                            <p className="text-xs text-darkGray font-Archivo">{keypoint.keypoint}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}