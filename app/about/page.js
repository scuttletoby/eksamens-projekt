"use client"

import Image from 'next/image';

import Header from '../components/rework/header';
import Footer from '../components/footer';
import Community from '../components/rework/community';
import { getHero, getGoals } from  '../components/data';

export default function About() {
    let { data: hero, isLoading: isHeroLoading, isError: isHeroError} = getHero("6542b939be38a0e5c03e52ec");
    let { data: testimonial, isLoading: isTestimonialLoading, isError: isTestimonialError} = getHero("6542b939be38a0e5c03e52ee");
    let { data: goals, isLoading: isGoalsLoading, isError: isGoalsError} = getGoals();

    if (isHeroError || isTestimonialError || isGoalsError) return <div>Error...</div>
    if (isHeroLoading || isTestimonialLoading || isGoalsLoading) return <div>Loading...</div>

    let newTestimonialContent = testimonial.content.slice(0, 219);

    return (
        <>
            <Header />
            <section className="flex flex-col gap-6 p-8">
                <div className="flex flex-col items-center gap-4 lg:justify-between lg:flex-row">
                    <div className="flex flex-col w-full gap-4 lg:w-1/2">
                        <sub className="text-lg leading-none text-blush font-Archivo">{hero.suptitle}</sub>
                        <h1 className="text-5xl font-bold font-Lexend">{hero.title}</h1>
                    </div>
                    <div className="flex flex-col w-full gap-4 lg:w-1/2">
                        <p className="text-sm font-bold text-darkGray font-Archivo">{hero.content}</p>
                        <button className="px-6 py-4 text-white bg-black rounded-md w-fit">{hero.buttontext}</button>
                    </div>
                </div>
                <Image
                    priority
                    src={"/images/about3.jpg"}
                    width={330}
                    height={160}
                    sizes="(max-width: 1024px) 330px, 1100px"
                    className="w-full my-8 rounded-lg"
                    alt={"en person på en cykel inde i en by"}
                />
            </section>
            <section id="testimonial" className="flex flex-col gap-8 px-8 pt-8 lg:pt-0 lg:justify-around lg:items-center lg:flex-row bg-background3 bg-deiftBlue">
                <div className="flex flex-col gap-4 lg:justify-center lg:w-1/2">
                    <sub className="text-lg text-blush font-Archivo">{testimonial.suptitle}</sub>
                    <h2 className="text-3xl font-bold text-white font-Lexend">{testimonial.title}</h2>
                    <div className="flex justify-between">
                        <p className="w-5/6 text-xs text-left text-white font-Archivo">{newTestimonialContent}</p>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blush">
                            <i className="text-white fas fa-quote-right"></i>
                        </div>
                    </div>
                </div>
                <Image
                    src={`http://localhost:5888/images/hero/${testimonial.image}`}
                    width={330}
                    height={160}
                    className="w-full lg:w-80"
                    alt={"Mand der smiler"}
                />
            </section>
            <Community />
            <section className="flex flex-col items-center justify-center h-full gap-16 p-40 lg:flex-row bg-bgColor">
                {goals.map((goal) => (
                    <div key={goal._id} className="relative flex flex-col items-center w-full gap-2">
                        <h2 className="text-3xl font-bold font-Lexend">{goal.goalcount}</h2>
                        <sub className="text-xs font-bold text-darkGray font-Archivo">{goal.goal.toUpperCase()}</sub>
                        <div className="absolute flex items-center justify-center w-8 h-8 translate-x-[3.25rem] -translate-y-[1.25rem] border rounded-full border-blush">
                            <i className={`text-blush ${goal.icon}`}></i>
                        </div>
                    </div>
                ))}
            </section>
            <Footer />
        </>
    )
}