import { useState, useEffect } from 'react';


export default function Fetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url, {
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

    return data;

}