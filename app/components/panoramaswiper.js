import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

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

    console.log(data);
    sortEvents(data);

    const slideEvents = data.slice(0, 4);

    function sortEvents(events) {
        events.forEach((event) => {
            events.eventdate = {Date: new Date(event.eventDate)}
        });
        events.sort((a, b) => b.date - a.date);
        //console.log(events);
    }
    

    return (
        <Swiper modules={[EffectCoverflow, Navigation]}
          effect="coverflow"
          coverflowEffect={{
            slideShadows: false,
          }}
          loop={true}
          navigation
          slidesPerView={3}
          onSlideChange={(swiper) => console.log(swiper)}
        >
            {slideEvents.map((event) => (
                <SwiperSlide>
                    <div className="slide">
                        <h2>{event.title}</h2>
                        <Image
                          src={'http://localhost:5888/images/event/' + event.image}
                          fill={true}
                          alt={event.title}
                          >
                          </Image>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}