"use client"
import WeatherPage from "@/components/WeatherPage";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  let city = (res)=>{
    console.log(res)
    const params = new URLSearchParams({
            country: res.country,
            city: res.name,
        });

      router.push(`/weather?${params.toString()}`);
  }
  
  return <WeatherPage forsearch={city}/>;
}

  
