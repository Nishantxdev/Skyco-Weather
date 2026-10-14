import { NextResponse } from "next/server";
import { fetchWeatherApi } from "openmeteo";
export async function POST(request) {

  const body = await request.json();

const params = {
	latitude: body.lati,
	longitude: body.long,
	daily: ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset"],
	hourly: ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "rain", "wind_speed_10m", "uv_index", "cloud_cover"],
	current: ["temperature_2m", "precipitation", "rain", "relative_humidity_2m", "wind_speed_10m","cloud_cover"],

};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const current = response.current();
const hourly = response.hourly();
const daily = response.daily();

// Define Int64 variables so they can be processed accordingly
const sunrise = daily.variables(2);
const sunset = daily.variables(3);

// Note: The order of weather variables in the URL query and the indices below need to match
const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature_2m: current.variables(0).value(),
		precipitation: current.variables(1).value(),
		rain: current.variables(2).value(),
		relative_humidity_2m: current.variables(3).value(),
		wind_speed_10m: current.variables(4).value(),
		cloud_cover: current.variables(5).value(),
	},
	hourly: {
		time: Array.from(
			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
			(_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0).valuesArray(),
		relative_humidity_2m: hourly.variables(1).valuesArray(),
		precipitation_probability: hourly.variables(2).valuesArray(),
		rain: hourly.variables(3).valuesArray(),
		wind_speed_10m: hourly.variables(4).valuesArray(),
		uv_index: hourly.variables(5).valuesArray(),
		cloud_cover: hourly.variables(6).valuesArray(),
	},
	daily: {
		time: Array.from(
			{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
			(_ , i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m_max: daily.variables(0).valuesArray(),
		temperature_2m_min: daily.variables(1).valuesArray(),
		// Map Int64 values to according structure
		sunrise: [...Array(sunrise.valuesInt64Length())].map(
			(_ , i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		// Map Int64 values to according structure
		sunset: [...Array(sunset.valuesInt64Length())].map(
			(_ , i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
	},
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
// console.log(
// 	`\nCurrent time: ${weatherData.current.time}\n`,
// 	`\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
// 	`\nCurrent precipitation: ${weatherData.current.precipitation}`,
// 	`\nCurrent rain: ${weatherData.current.rain}`,
// 	`\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
// 	`\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
// );
// console.log("\nHourly data:\n", weatherData.hourly)
// console.log("\nDaily data:\n", weatherData.daily)

    // return NextResponse.json(weatherData)
	// console.log(weatherData)
    
      return NextResponse.json({
   message: "send data successfully!",
   result: weatherData
        }
      )

    
}