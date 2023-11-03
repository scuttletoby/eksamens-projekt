"use client"

import Image from 'next/image';
import { usePathname } from 'next/navigation'

import { getNewsArticle } from  '../../components/data';
import Header from '../../components/rework/header';
import Footer from '../../components/footer';

export default function NewsArticle() {
    
    /* Henter ruten og sorterer /news/ fra med et regex. */
    const pathname = usePathname();
    const id = pathname.replace(/(\/news\/)/, "");

    let { data: news, isLoading: isNewsLoading, isError: isNewsError} = getNewsArticle(id);

    if (isNewsError) return <div>Error...</div>
    if (isNewsLoading) return <div>Loading...</div>

    /* Konvertere string datoen til en reel dato med passende styling. */
    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(news.newsdate).toLocaleDateString("da-DK", dateOptions);

    /* Parser content da der er html tags i stringet. */
    const parser = new DOMParser();
    const html = parser.parseFromString(news.content, 'text/html');
    const content = html.body.innerHTML;


    return (
        <>
            <Header />
            <main className="flex flex-col gap-2 p-8">
                <Image
                    src={"http://localhost:5888/images/news/" + news.image}
                    width={400}
                    height={50}
                    className="rounded-lg"
                    alt={"en person på en cykel inde i en by"}
                />
                <sub className="text-xs text-blush font-Archivo">{`${date} | ${news.author}`}</sub>
                <h2 className="font-bold text-1xl font-Lexend">{news.title}</h2>
                <p className="text-sm font-Archivo" dangerouslySetInnerHTML={{ __html: content }} />
            </main>
            <Footer />
        </>
    )
}