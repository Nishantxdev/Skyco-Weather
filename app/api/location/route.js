import { NextResponse } from "next/server";
export async function POST(request) {
  const body = await request.json();
  console.log(body)

  try{
    const apiKey = process.env.OPENWEATHER_API_KEY;
    console.log(apiKey)
    let city = body.city
    console.log(city)
   const url =
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
    
      console.log(data)
      let result = {
        city: data[0].name,
        country: data[0].country,
        latitude: data[0].lat,
        longitude: data[0].lon,
      };

      return NextResponse.json({
   message: "send data successfully!",
   result: result
 });
    } catch (error) {
      console.error(error);

  }
}