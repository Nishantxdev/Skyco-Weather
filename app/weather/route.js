// import { fetchWeatherApi } from "openmeteo";

export async function GET(request) {

    // const params = new URLSearchParams({
    //     latitude: 28.6519,
    //     longitude: 77.2315,
    //     current: "temperature_2m,relative_humidity_2m,precipitation,rain,showers,wind_speed_10m,wind_direction_10m",
    //     hourly: "uv_index,relative_humidity_2m,precipitation_probability,temperature_2m,rain,visibility,wind_speed_10m"
    // });

    //     const params = {
    // 	latitude: 28.6519,
    // 	longitude: 77.2315,
    // 	hourly: ["uv_index", "relative_humidity_2m", "precipitation_probability", "temperature_2m", "rain", "visibility", "wind_speed_10m"],
    // 	current: ["temperature_2m", "relative_humidity_2m", "precipitation", "rain", "showers", "wind_speed_10m", "wind_direction_10m"],
    // }   ;
    // const url = "https://customer-api.open-meteo.com/v1/forecast";
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    // const responses = await fetch(`${url}?${params.toString().replaceAll("%2",",")}`);

    url.searchParams.set("latitude" ,25.3176)
    url.searchParams.set("longitude", 83.0077)
    url.searchParams.set("current", "temperature_2m,relative_humidity_2m,precipitation,rain,showers,wind_speed_10m,wind_direction_10m")
    url.searchParams.set("hourly" ,"uv_index,relative_humidity_2m,precipitation_probability,temperature_2m,rain,visibility,wind_speed_10m" )


    // const responses = await fetch(`${url}?${params}`)
    const responses = await fetch(url)
    // console.log("response", responses)
    // console.log("url ", responses[0])
    const response = await responses.json()

    // Process first location. Add a for-loop for multiple locations or weather models
    // const response = responses[0];

    // Attributes for timezone and location
    // const latitude = response.latitude();
    // console.log("latitude", latitude)
    // const longitude = response.longitude();
    // const elevation = response.elevation();
    // const utcOffsetSeconds = response.utcOffsetSeconds();

    // console.log(
    //     `\nCoordinates: ${latitude}°N ${longitude}°E`,
    //     `\nElevation: ${elevation}m asl`,
    //     `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    // );

    // const current = response.current();
    // console.log(current)
    // const hourly = response.hourly();
    // console.log(hourly)

    // // Note: The order of weather variables in the URL query and the indices below need to match
    // const weatherData = {
    //     current: {
    //         time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    //         temperature_2m: current.variables(0).value(),
    //         relative_humidity_2m: current.variables(1).value(),
    //         precipitation: current.variables(2).value(),
    //         rain: current.variables(3).value(),
    //         showers: current.variables(4).value(),
    //         wind_speed_10m: current.variables(5).value(),
    //         wind_direction_10m: current.variables(6).value(),
    //     },
    //     hourly: {
    //         time: Array.from(
    //             { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
    //             (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
    //         ),
    //         uv_index: hourly.variables(0).valuesArray(),
    //         relative_humidity_2m: hourly.variables(1).valuesArray(),
    //         precipitation_probability: hourly.variables(2).valuesArray(),
    //         temperature_2m: hourly.variables(3).valuesArray(),
    //         rain: hourly.variables(4).valuesArray(),
    //         visibility: hourly.variables(5).valuesArray(),
    //         wind_speed_10m: hourly.variables(6).valuesArray(),
    //     },
    // };

    // // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
    // console.log(
    //     `\nCurrent time: ${weatherData.current.time}\n`,
    //     `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
    //     `\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
    //     `\nCurrent precipitation: ${weatherData.current.precipitation}`,
    //     `\nCurrent rain: ${weatherData.current.rain}`,
    //     `\nCurrent showers: ${weatherData.current.showers}`,
    //     `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
    //     `\nCurrent wind_direction_10m: ${weatherData.current.wind_direction_10m}`,
    // );
    // console.log("\nHourly data:\n", weatherData.hourly)
    return new Response(JSON.stringify(response))
}




