"use client"
import WeatherPage from '@/components/WeatherPage'
import React from 'react'
import { useRouter } from "next/navigation";


const page = () => {
    const router = useRouter()
    let city = (res)=>{
        
         const params = new URLSearchParams({
            country: res.country,
            city: res.name,
        });

      router.push(`/weather?${params.toString()}`);
    }
  return (
    <WeatherPage forsearch={city} />
  )
}

export default page
