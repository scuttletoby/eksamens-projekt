"use client"

import Image from 'next/image';
import Link from 'next/link';

import Header from '../components/rework/header';
import Footer from '../components/footer';

import { getNews } from  '../components/data';

function NewsComponent(news) {

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(news.props[0].newsdate).toLocaleDateString("da-DK", dateOptions);

    return (
        <div className="flex flex-col gap-8 py-4">
            {news.props.map((news) => (
                <Link
                    href={`/news/${news._id}`} key={news._id} className="flex flex-col w-full gap-2 h-fit">
                    <Image
                        src={"http://localhost:5888/images/news/" + news.image}
                        width={400}
                        height={50}
                        className="rounded-lg"
                        alt={"en person på en cykel inde i en by"}
                    />
                    <sub className="text-xs text-blush font-Archivo">{`${date} | ${news.author}`}</sub>
                    <h2 className="font-bold text-1xl font-Lexend">{news.title}</h2>
                </Link>
            ))}
        </div>
    )
}


export default function News() {
    let { data: news, isLoading: isNewsLoading, isError: isNewsError} = getNews();

    if (isNewsError) return <div>Error...</div>
    if (isNewsLoading) return <div>Loading...</div>


    return (
        <>
            <Header />
            <main className="flex flex-col gap-8 p-8">
                <div className="flex flex-col items-center justify-center gap-6 text-center h-fit">
                    <sub className="font-bold font-Archivo text-blush">Nyheder</sub>
                    <h2 className="text-2xl font-bold font-Lexend">Bladr igennem alle vores spændende nyheder</h2>
                </div>
                <div>
                    <ul className="flex gap-4 text-xs text-blush">
                        <li className="underline underline-offset-4">Alle</li>
                        <li>Xtreme</li>
                        <li>Konkurrence</li>
                        <li>Motionister</li>
                        <li>Juniorer</li>
                    </ul>
                    <NewsComponent props={news} />
                </div>
            </main>
            <Footer />
        </>
    )
}