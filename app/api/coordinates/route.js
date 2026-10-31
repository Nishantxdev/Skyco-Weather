import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();

    try {

        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${body.lati}&lon=${body.long}`

        // const url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=28.629747&lon=77.338264'

        const response = await fetch(url, {
            headers: {
                "User-Agent": "SkycoWeather/1.0"
            }
        })

        const data = await response.json();
        let result = {
            latitude: data.lat,
            longitude: data.lon,
            address: data.address["city"],
            country : data.address["country_code"]
        }


        return NextResponse.json({
            message: "send data successfully!",
            result: result
        });

    }

    catch (error) {
        console.error(error);
    }
}