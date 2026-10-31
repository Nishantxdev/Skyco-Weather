"use client"
import WeatherPage from '@/components/WeatherPage'
import React from 'react'

const page = () => {
    let city = (city)=>{
        return city
    }
  return (
    <WeatherPage forsearch={city} />
  )
}

export default page
