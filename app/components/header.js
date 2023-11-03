import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Headers() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5888/contactinformation', {
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
        <header className="flex flex-col">
            <div className="flex gap-6 mx-20 my-4 text-xs font-bold font-Archivo max-lg:hidden">
                <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>

                    <h2>Klubhus: Ydesvej 4, 8500 Grenaa</h2>
                </div>

                <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                    <h2>Alle dage 18-22</h2>
                </div>

                <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                    <h2>info@bikelane.dk</h2>
                </div>

                <div className="flex items-center justify-center gap-2 ml-auto">
                <div className="flex items-center">
                    {data.some.map((icons) => (     
                        <i key={icons._id} className={icons.icon}></i>  
                    ))}
                </div>
                </div>
            </div>

            <div className="my-5">
                <nav className="flex items-center h-16 mx-20 bg-white rounded-md shadow-xl">
                        <Image
                          src={'/images/logo-black.png'}
                          width={128}
                          height={37}
                          alt={'Logo'}
                          className="inline-block pl-4"
                        />
                    <ul className="flex gap-2 pr-4 ml-auto font-bold font-Lexend max-lg:hidden">
                        <li><a>Forside</a></li>
                        <li><a>Om os</a></li>
                        <li><a>Events</a></li>
                        <li><a>Kontakt</a></li>
                        <li><a>Nyheder</a></li>
                    </ul>
                    <div id="cta" className="flex items-center justify-center w-40 h-16 font-bold text-white bg-blush rounded-r-md font-Lexend max-lg:hidden">
                        <a>Gratis prøveperiode</a>
                    </div>
                    <div id="mobile-menu" className="flex items-center justify-center mx-5 ml-auto lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                </nav>
            </div>
        </header>
    );
}