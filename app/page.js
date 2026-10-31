"use client"
import WeatherPage from "@/components/WeatherPage";
import { redirect } from "next/navigation";

export default function Home() {
   redirect("/weather");
  
  return <WeatherPage forsearch={city}/>;
}

  
