"use client"
import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Searchbar = ({ getweather }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [IsActive, setIsActive] = useState(false)
    const ref = useRef()
    const router = useRouter();

    useEffect(() => {

        if (search.trim().length < 3) {
            setCities([]);
            setLoading(false);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);

            if (showSuggestions) {
                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search)}&count=7&language=en&format=json`
                );

                const data = await response.json();

                if (data.results) {
                    setCities(data.results);

                }


            }
            setLoading(false)

        }, 300);

        return () => {
            clearTimeout(timer)
        };
    }, [search, showSuggestions])

    const handleSelect = (city) => {
       
        

        const params = new URLSearchParams({
            country: city.country,
            city: city.name,
            state:city.admin1
        });

        router.push(`/weather?${params.toString()}`);
    

    getweather(city)
    // setCities([]);

    // setShowSuggestions(false);

    // setCity(city)
    // setSearch(`${city.name}, ${city.admin1}`);

};

let handlechange = (e) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
}

if (IsActive) {
    ref.current.style.display = "block"

    if (search.length == 0) {

        ref.current.style.display = "none"
    }
}

let remove_search = () => {
    setSearch("");
}

return (
    <div className='total_search'>
        <div className="search-bar">
            <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m15.5 15.5 5 5" />
            </svg>

            <input onFocus={() => setIsActive(true)} onChange={handlechange} spellCheck={false} name="search" value={search} type="text" placeholder="Search City..." aria-label="Search" />

            <img onClick={remove_search} ref={ref} className='cross hidden , cursor-pointer' src="/Cross.png" alt="" />
        </div>
        {showSuggestions && search.trim().length >= 3 &&
            <div className="suggestions">

                {cities.length === 0 ? (
                    <h2 className='text-black p-2.5'>No cities found</h2>
                ) : null}
                {
                    !loading && (
                        cities.map((city) => {
                            return (
                                <button
                                    type="button"
                                    key={city.id}
                                    className="suggestion"
                                    onClick={() => handleSelect(city)}
                                >
                                    <strong >{city.name}</strong>
                                    <span className='text-[#3F3F3F]'>
                                        {city.admin1
                                        } , {city.country}
                                    </span>
                                </button>

                            )
                        }))
                }
            </div>}
    </div>

)
}

export default Searchbar
