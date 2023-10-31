import Image from 'next/image';

import { useState, useEffect } from 'react';

export default function HvemErVi() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5888/testimonials', {
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

    const testimonials = data.slice(0, 4);
    console.log(testimonials);

    return (
        <section className="w-full px-20 py-20 bg-bgColor">
            <sub className="text-blush font-Lexend">Hvem er vi</sub>
            <div className="flex justify-between max-lg:flex-col">
                <h2 className="text-3xl font-bold font-Lexend">Et udvalg af os i klubben</h2>
                <p className="text-xs sm:w-1/2">Vi er over 1.400 medlemmer og tæller mange forskellige typer - lige fra motionisten, der elsker naturen til den ekstreme biker, hvor det ikke kan blive hurtigt eller farligt nok! Og en masse ind i mellem - og der er selvfølgelig også plads til børn og unge ♥</p>
            </div>
            <div className="flex justify-between mt-10 max-lg:gap-20 max-lg:flex-col max-lg:items-center">
                {testimonials.map((testimonial) => (
                    <div key={testimonial._id} className="relative w-56 h-64">
                        <Image
                        fill
                        objectFit="cover"
                        key={testimonial._id}
                        className="w-full rounded-md"
                        src={"http://localhost:5888/images/testimonial/" + testimonial.image}
                        alt="Image of a team member"
                        />
                        <div className="absolute bottom-0 p-4 overflow-hidden translate-y-1/2 bg-white rounded-md left-10 right-10 h-28">
                            <h3 className="font-bold text-md font-Lexend text-blush">{testimonial.name}</h3>
                            <p className="text-[10px] text-gray-600 font-Archivo">{testimonial.experience}</p>
                            <p className="text-[10px] italic font-Archivo">{testimonial.motivation}</p>
                            <div className="absolute right-0 w-6 h-8 translate-x-1/2 translate-y-1/2 bg-gray-200 rounded-full bottom-4"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-12 translate-x-1/2 translate-y-1/2 bg-gray-100 rounded-full"></div>
                        </div>
                        <div className="absolute flex flex-col gap-1 right-4 top-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blush"><i className="text-white fab fa-instagram"></i></div>
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blush"><i className="text-white fab fa-pinterest"></i></div>
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blush"><i className="text-white fab fa-twitter"></i></div>
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blush"><i className="text-white fab fa-facebook"></i></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}