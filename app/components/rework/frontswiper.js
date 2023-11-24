import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import sortEvents from '../sortevents';
import { getEvents, getHero } from  '../data';

export default function FrontSwiper() {
    let { data: events, isLoading: isEventsLoading, isError: isEventsError} = getEvents();
    let { data: hero, isLoading: isHeroLoading, isError: isHeroError} = getHero("653f624462bf0da5500f26e3");
    if (isEventsError ||isHeroError) return <div>Error...</div>
    if (isEventsLoading || isHeroLoading) return <div>Loading...</div>

    sortEvents(events);
    const slideEvents = events.slice(0, 4);
    console.log(slideEvents[0].category.category);

    console.log(slideEvents)

    return (
        <section>
            <div className="relative px-8 py-20 pb-40 bg-background3 bg-footer flex flex-col gap-6">
                <sub className="text-lg text-blush font-Archivo">{hero.suptitle}</sub>
                <h2 className="text-3xl text-white font-bold font-Lexend">{hero.title}</h2>
                <button className="py-4 px-6 w-fit text-white rounded-md bg-blush">{hero.buttontext}</button>
                <Swiper modules={[EffectCoverflow, Navigation]}
                  effect="coverflow"
                  coverflowEffect={{
                    slideShadows: false,
                  }}
                  loop={true}
                  slidesPerView={1}
                  breakpoints={{
                    1024: {
                      slidesPerView: 3
                  }
                  }}
                  className="absolute bottom-0 translate-y-1/2 h-80 w-80"
                >
                    {slideEvents.map((event) => {
                        <SwiperSlide>
                            <div className="w-full bg-slate-500 h-40">
                                <Image
                                fill
                                objectFit="cover"
                                src={'http://localhost:5888/images/event/' + event.image}
                                alt={event.title}
                                className="w-full rounded-lg"
                                >
                                </Image>
                            </div>
                            <div className="bottom-0">
                                <sub className="text-blush font-Lexend">{event.category.category + ": " + event.title}</sub>
                                <p className="text-base font-bold font-Lexend">{event.title}</p>
                            </div>
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
            <div className="py-40">

            </div>
        </section>
    );
}