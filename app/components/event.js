import Image from 'next/image';

export default function Event(probs) {

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(probs.event.eventdate).toLocaleDateString("da-DK", dateOptions);

    return (
        <div className="h-full rounded-lg w-80">
            <div className="relative w-80 h-44">
                <Image
                fill
                objectFit="cover"
                src={"http://localhost:5888/images/event/" + probs.event.image}
                alt={probs.event.title}
                className="w-full rounded-lg"
                />
            </div>
            <sub className="font-Lexend text-blush">{date+ " | " + probs.event.category}</sub>
            <h2 className="font-bold font-Lexend">{probs.event.title}</h2>
        </div>
    )
}