// import useSWRMutation from 'swr/mutation';
import Link from 'next/link';

import Header from '../components/rework/header';
import Footer from '../components/rework/footer';
import './style.css';

export default function Admin() {
    // const { trigger } = useSWRMutation(createEvent);

    return (
        <>
            <Header />
            <section className="flex items-center justify-between gap-20 p-8">
                <div className="flex flex-col w-full gap-8">
                    {/* <button onClick={() => {
                        trigger({ username: 'johndoe' })
                    }}>Create User</button> */}
                    <Link href="/admin/events" className="flex items-center justify-center w-full text-3xl font-bold bg-white rounded-lg shadow-lg h-52 hover:underline font-Lexend">Events</Link>
                    <Link href="/admin/goals" className="flex items-center justify-center w-full text-3xl font-bold bg-white rounded-lg shadow-lg h-52 hover:underline font-Lexend">Goals</Link>
                </div>
                <div className="flex flex-col w-full gap-8">
                <Link href="/admin/frontpagehero" className="flex items-center justify-center w-full text-3xl font-bold bg-white rounded-lg shadow-lg h-52 hover:underline font-Lexend">Forside Hero</Link>
                    <Link href="/admin/inquiries" className="flex items-center justify-center w-full text-3xl font-bold bg-white rounded-lg shadow-lg h-52 hover:underline font-Lexend">Henvendelser</Link>
                </div>
            </section>
            <Footer />
        </>
    )
}