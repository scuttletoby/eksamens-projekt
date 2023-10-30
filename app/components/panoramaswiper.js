import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
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

    function sortEvents(events) {
        let eventDates = [];
        events.forEach((event) => {
            eventDates.push(new Date(event.eventdate));
        });
        const sortedDates = eventDates.sort((a, b) => b.date - a.date);
        console.log(sortedDates);
        return sortedDates;
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
          <SwiperSlide><div className="slide">Slide 1</div></SwiperSlide>
          <SwiperSlide><div className="slide">Slide 2</div></SwiperSlide>
          <SwiperSlide><div className="slide">Slide 3</div></SwiperSlide>
          <SwiperSlide><div className="slide">Slide 4</div></SwiperSlide>
        </Swiper>
    )
}