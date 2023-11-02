import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import sortEvents from './sortEvents';

export default function PanoramaSwiper() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5888/events')
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false)
          })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No event data...</p>

    sortEvents(data);

    const slideEvents = data.slice(0, 4);

    return (
      <section className="relative px-20 pt-20 h-[25rem] max-lg:h-[30rem] bg-background3 bg-footer">
        <sub className="py-10 text-blush">Kom og vær med</sub>
        <div className="flex max-lg:flex-col">
          <h2 className="py-5 text-3xl font-bold text-white font-Lexend">Her er vores seneste<br />arrangementer</h2>
          <button className="p-4 max-h-16 text-white rounded-md max-lg:w-[40%] lg:ml-auto bg-blush">Se alle events</button>
        </div>
        <Swiper modules={[EffectCoverflow, Navigation]}
          effect="coverflow"
          coverflowEffect={{
            slideShadows: false,
          }}
          loop={true}
          // navigation
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 3
            }
          }}
          // onSlideChange={(swiper) => console.log(swiper)}
          className="absolute bottom-28 translate-y-1/2 h-[22rem]"
        >
            {slideEvents.map((event) => (
                <SwiperSlide>
                    <div className="relative w-full h-40 max-lg:h-64 slide">
                        <Image
                          fill
                          objectFit="cover"
                          src={'http://localhost:5888/images/event/' + event.image}
                          alt={event.title}
                          className="w-full rounded-lg"
                          >
                          </Image>
                          <div className="absolute h-16 -bottom-16">
                            <sub className="text-blush font-Lexend">{event.category + ":" + event.title}</sub>
                            <p className="text-base font-bold font-Lexend">Add til api</p>
                          </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
      </section>
    )
}