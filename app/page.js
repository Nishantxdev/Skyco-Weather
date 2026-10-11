"use client"
import { useState, useRef } from "react";

export default function Home() {

  const [apidata, setapidata] = useState({});
  // const cityRef = useRef(null);
  // console.log(cityRef.current)

  // let getweather = async ()=>{
  //    const response = await fetch(
  //       "https://localhost:3000/weather",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           city:"Varanasi"
  //         }),
  //       }
  //     );

  // }




  let getlocation = async () => {
    const data = await fetch(
      "/api/location",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: "Varanasi"
        }),
      }
    );

    let response = await data.json()
    console.log(response)
    // setapidata(response)

    getweather(response)

  }
  let getweather = async (response) => {
    console.log(response)
    const data1 = await fetch(
      "/api/weather",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lati: response.result.latitude,
          long: response.result.longitude,
        }),
      }
    );

    let response1 = await data1.json()
    console.log(response1)
  }
  return (
    <div>

      <div className="current-panel w-[550px] h-96 bg-[#3C77AF] m-8 my-18 p-5 text-white rounded-2xl">

        <div className="flex justify-between">
          <span className="text-[#E5F2FF] font-bold">Right Now</span>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"></path>
          </svg> */}

          <button className="flex justify-center items-center cursor-pointer border border-[#c6dff438] w-7 h-7  bg-[#2F6FA2] rounded-full hover:bg-[#87c2ef29] hover:border-[#c6dff485]"> 
            <svg className="refresh " viewBox="0 0 20 20" aria-hidden="true"><path d="M16.5 7.5A6.7 6.7 0 1 0 17 10M16.5 3.5v4h-4" /><path d="M10 6.5V10l2.3 1.4" /></svg>
            </button>

        </div>
        <div className="flex flex-col  justify-center items-center">
          <div className="w-28 h-16">
            <img  src="sun_cloud.png" alt="sun and cloud" />
          </div>
          <p className="current-temp ">12°c</p>
          <p className=" font-semibold ">Partly cloudy</p>
        </div>

        <div className=" flex gap-2.5 my-[60px] text-[#bad2e7]">
          <div className="Rain flex flex-col  bg-[#0f36576e] w-40 h-20 rounded-xl ">
            <p className="metric-label px-3 pt-2 ">Rain</p>

            <p className="metric-card px-3 text-white">0 mm</p>
            <p className="metric-caption px-3">Next 24 hours</p>
        </div>
          <div className="Rain flex flex-col bg-[#0f36576e] w-40 h-20 rounded-xl ">
            <p className="metric-label px-3 pt-2 ">Humidity</p>

            <p className="metric-card px-3 text-white">85%</p>
            <p className="metric-caption px-3">Next 24 hours</p>
        </div>
          <div className="Rain flex flex-col  bg-[#0f36576e] w-40 h-20 rounded-xl ">
            <p className="metric-label px-3 pt-2 ">Wind</p>

            <p className="metric-card px-3 text-white">8.1 km/h</p>
            <p className="metric-caption px-3">↗ wind</p>
        </div>
          
          
        </div>
      </div>

    </div>
  );
}
