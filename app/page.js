"use client"
import "./style.css"
import { useState, useRef, useEffect } from "react";

export default function Home() {

  const [weather_data, setweather_data] = useState(null);
  const [delhi_weather, setdelhi_weather] = useState({})
  const [city_location, setcity_location] = useState(null);
  const [Arraydate, setArraydate] = useState([])
  const [Arrayday, setArrayday] = useState([])
  const ref = useRef();
  const ref2 = useRef();
  useEffect(() => {
    let delhi_location = async () => {
      const data = await fetch(
        "/api/location",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: "delhi"
          }),
        }
      );

      let response = await data.json()
      // setweather_data(response)
      setcity_location(response)
      getweather(response)

    }
    delhi_location();
  }, [])




  let getlocation = async (ref) => {
    const data = await fetch(
      "/api/location",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: ref.current.innerText
        }),
      }
    );

    let response = await data.json()
    setcity_location(response)
    // setweather_data(response)

    getweather(response)
    // console.log(ref.current.innerText)

  }
  let getweather = async (res) => {
    const data1 = await fetch(
      "/api/weather",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lati: res.result.latitude,
          long: res.result.longitude,
        }),
      }
    );

    let response1 = await data1.json()
    setweather_data(response1)
    let date = response1["result"].daily.time

    if (Arraydate.length == 0) {
      date.forEach(e => {

        // date
        const date = new Date(e);

        const result = date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          timeZone: "UTC"
        });

        setArraydate(e => [...e, result])

        // day
        const dateString = result;
        const year = 2026;

        const [month, day] = dateString.split("/").map(Number);

        const date1 = new Date(Date.UTC(year, month - 1, day));

        const dayName = date1.toLocaleDateString("en-US", {
          weekday: "long",
          timeZone: "UTC"
        });

        setArrayday(e => [...e, dayName])

      })
    }
    if (ref2.current) {

      ref2.current.style.width = `${Math.trunc(response1["result"].current.relative_humidity_2m)}%`
    }



  }
  return (
    <div>
      <div className="text-white flex items-center gap-2 pl-10 pt-10">
        <div className="location-heading">
          <span className="location-pin" aria-hidden="true">
            <svg viewBox="0 0 20 20"><path d="M16 8.2c0 4.2-6 9-6 9s-6-4.8-6-9a6 6 0 1 1 12 0Z" /><circle cx="10" cy="8" r="2" /></svg>
          </span>
        </div>

        {city_location ? <div >
          <p className="text-[12px] font-bold text-[#8CA9C3]">YOUR WEATHER</p>
          <p className="text-[25px] font-bold text-[#f4f8fd]"><button className="cursor-pointer" ref={ref} onClick={() => getlocation(ref)}></button><span>{city_location["result"].city},{city_location["result"].country}</span></p>
        </div> : <div >
          <p className="text-[12px] font-bold text-[#8CA9C3]">YOUR WEATHER</p>
          <p className="text-[25px] font-bold text-[#f4f8fd]"><button className="cursor-pointer" ref={ref} onClick={() => getlocation(ref)}></button><span>Your City</span></p>
        </div>

        }
      </div>
      <div className="flex flex-col gap-4">

        <div className="flex gap-4 ">
          {weather_data ?
            Array(weather_data).map((item, index) => {
              return (<div key={index} className="current-panel w-[550px] h-96 bg-[#3C77AF] ml-8 mt-5 p-5 text-white rounded-2xl">

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
                    <img src="sun_cloud.png" alt="sun and cloud" />
                  </div>
                  <p className="current-temp ">{Math.trunc(item["result"].current.temperature_2m)}°c</p>
                  {item["result"].current.cloud_cover >= 0 && item["result"].current.cloud_cover <= 10 ? (<p className=" font-semibold ">Clear Sky</p>) :
                    item["result"].current.cloud_cover >= 11 && item["result"].current.cloud_cover <= 25 ? (<p className=" font-semibold ">Mostly Clear</p>) : item["result"].current.cloud_cover >= 26 && item["result"].current.cloud_cover <= 50 ? (<p className=" font-semibold ">Partly Cloudy</p>) : item["result"].current.cloud_cover >= 51 && item["result"].current.cloud_cover <= 75 ? (<p className=" font-semibold ">Mostly Cloudy</p>) :
                      item["result"].current.cloud_cover >= 76 && item["result"].current.cloud_cover <= 90 ? (<p className=" font-semibold ">Very Cloudy</p>) :
                        item["result"].current.cloud_cover >= 91 && item["result"].current.cloud_cover <= 100(<p className=" font-semibold ">Overcast</p>)}
                </div>

                <div className=" flex gap-2.5 my-[60px] text-[#bad2e7]">
                  <div className="Rain flex flex-col  bg-[#0f36576e] w-40 h-20 rounded-xl ">
                    <p className="metric-label px-3 pt-2 ">Rain</p>

                    <p className="metric-card px-3 text-white">{item["result"].current.rain}mm</p>
                    <p className="metric-caption px-3">Next 24 hours</p>
                  </div>
                  <div className="Rain flex flex-col bg-[#0f36576e] w-40 h-20 rounded-xl ">
                    <p className="metric-label px-3 pt-2 ">Humidity</p>

                    <p className="metric-card px-3 text-white">{Math.trunc(item["result"].current.relative_humidity_2m)}%</p>
                    <div className="meter">
                      <div ref={ref2} className="meter_child w-0 ">

                      </div>
                    </div>
                  </div>
                  <div className="Rain flex flex-col  bg-[#0f36576e] w-40 h-20 rounded-xl ">
                    <p className="metric-label px-3 pt-2 ">Wind</p>

                    <p className="metric-card px-3 text-white">{Math.trunc(item["result"].current.wind_speed_10m)}km/h</p>
                    <p className="metric-caption px-3">↗ wind</p>
                  </div>


                </div>
              </div>)
            }) : <div className="current-panel w-[550px] h-96 bg-[#3C77AF] ml-8 mt-5 p-5 text-white rounded-2xl">

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
                  <img src="sun_cloud.png" alt="sun and cloud" />
                </div>
                <p className="current-temp "></p>
                <p className=" font-semibold ">---------</p>
              </div>

              <div className=" flex gap-2.5 my-[60px] text-[#bad2e7]">
                <div className="Rain flex flex-col  bg-[#0f36576e] w-40 h-20 rounded-xl ">
                  <p className="metric-label px-3 pt-2 ">Rain</p>

                  <p className="metric-card px-3 text-white">----</p>
                  <p className="metric-caption px-3">Next 24 hours</p>
                </div>
                <div className="Rain flex flex-col bg-[#0f36576e] w-40 h-20 rounded-xl ">
                  <p className="metric-label px-3 pt-2 ">Humidity</p>

                  <p className="metric-card px-3 text-white">----</p>
                  <div className="meter">
                    <div className="meter_child w-0">

                    </div>
                  </div>
                </div>
                <div className="Rain flex flex-col  bg-[#0f36576e] w-40 h-20 rounded-xl ">
                  <p className="metric-label px-3 pt-2 ">Wind</p>

                  <p className="metric-card px-3 text-white">----</p>
                  <p className="metric-caption px-3">↗ wind</p>
                </div>


              </div>
            </div>
          }

          <div className="second_div rounded-2xl   text-white mt-5 ">
            <div className="flex justify-between border-b-2 border-[#CDE5FA21]">
              <div className="bottom_line ">
                <p className="font-bold">Hourly forecast</p>
                <p className="text-sm text-[#aac0d4]">The next few hours</p>
              </div>
              <div className="flex justify-center items-center pr-6">
                <p className="text-sm font-bold text-[#aac0d4] pr-2">Next 24 hours</p>
                <button className="flex justify-center items-center cursor-pointer border border-[#c6dff438] w-7 h-7  bg-[#12385929] rounded-full hover:bg-[#87c2ef29] hover:border-[#c6dff485]">
                  <svg className="refresh " viewBox="0 0 20 20" aria-hidden="true"><path d="M16.5 7.5A6.7 6.7 0 1 0 17 10M16.5 3.5v4h-4" /><path d="M10 6.5V10l2.3 1.4" /></svg>
                </button>
              </div>
            </div>

            <div className="flex">
              <div className="column1 column w-1/5 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-2 ">
                <div>
                  <p className="label label_day pt-1.5">WED</p>
                  <p className="label label_time">10:00</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">10.9°c</span>
                <span className="hour_desc">Partly cloudy</span>


                <div className="pt-16">
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Rain</p>
                    <p className="text-[12px] font-bold">0%</p>
                  </div>
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Humidity</p>
                    <p className="text-[12px] font-bold">90%</p>
                  </div>
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Wind</p>
                    <p className="text-[12px] font-bold">7.7 km/h</p>
                  </div>
                </div>
              </div>
              <div className="column2 column w-1/5 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-2 ">
                <div>
                  <p className="label label_day pt-1.5">WED</p>
                  <p className="label label_time">10:00</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">10.9°c</span>
                <span className="hour_desc">Partly cloudy</span>


                <div className="pt-16">
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Rain</p>
                    <p className="text-[12px] font-bold">0%</p>
                  </div>
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Humidity</p>
                    <p className="text-[12px] font-bold">90%</p>
                  </div>
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Wind</p>
                    <p className="text-[12px] font-bold">7.7 km/h</p>
                  </div>
                </div>
              </div>
              <div className="column3 column w-1/5 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-2 ">
                <div>
                  <p className="label label_day pt-1.5">WED</p>
                  <p className="label label_time">10:00</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">10.9°c</span>
                <span className="hour_desc">Partly cloudy</span>


                <div className="pt-16">
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Rain</p>
                    <p className="text-[12px] font-bold">0%</p>
                  </div>
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Humidity</p>
                    <p className="text-[12px] font-bold">90%</p>
                  </div>
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Wind</p>
                    <p className="text-[12px] font-bold">7.7 km/h</p>
                  </div>
                </div>
              </div>
              <div className="column4 column w-1/5 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-2 ">
                <div>
                  <p className="label label_day pt-1.5">WED</p>
                  <p className="label label_time">10:00</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">10.9°c</span>
                <span className="hour_desc">Partly cloudy</span>


                <div className="pt-16">
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Rain</p>
                    <p className="text-[12px] font-bold">0%</p>
                  </div>
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Humidity</p>
                    <p className="text-[12px] font-bold">90%</p>
                  </div>
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Wind</p>
                    <p className="text-[12px] font-bold">7.7 km/h</p>
                  </div>
                </div>
              </div>
              <div className="column5 column w-1/5 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-2 ">
                <div>
                  <p className="label label_day pt-1.5">WED</p>
                  <p className="label label_time">10:00</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">10.9°c</span>
                <span className="hour_desc">Partly cloudy</span>


                <div className="pt-16">
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Rain</p>
                    <p className="text-[12px] font-bold">0%</p>
                  </div>
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Humidity</p>
                    <p className="text-[12px] font-bold">90%</p>
                  </div>
                  <div className="desc ">
                    <p className="text-[12px] text-[#d7e7f5]">Wind</p>
                    <p className="text-[12px] font-bold">7.7 km/h</p>
                  </div>
                </div>
              </div>


            </div>

          </div>


        </div>
        {weather_data ? <div className="third_div text-white rounded-2xl ml-8 ">
          <div className="flex justify-between border-b-2 border-[#CDE5FA21] h-20">
            <div className="pl-5 pt-3">
              <p className="font-bold">7-day forecast</p>
              <p className="text-sm text-[#aac0d4]">A look at the week ahead</p>
            </div>

            <div className="flex justify-center items-center pr-6">
              <p className="text-sm font-bold text-[#aac0d4] pr-2">Daily high and low</p>
              <button className="flex justify-center items-center cursor-pointer border border-[#c6dff438] w-7 h-7  bg-[#12385929] rounded-full hover:bg-[#87c2ef29] hover:border-[#c6dff485]">
                <svg className="refresh " viewBox="0 0 20 20" aria-hidden="true"><path d="M16.5 7.5A6.7 6.7 0 1 0 17 10M16.5 3.5v4h-4" /><path d="M10 6.5V10l2.3 1.4" /></svg>
              </button>
            </div>
          </div>

          {
            Arraydate && Arrayday &&
            <div className="flex ">
              <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col  items-center gap-1.5 ">
                <div>
                  <p className="label label_day pt-1.5">{Arraydate[0]} Today</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">{Math.trunc(weather_data["result"].daily.temperature_2m_min[0])}°c /{Math.trunc(weather_data["result"].daily.temperature_2m_max[0])}°c </span>

              </div>
              <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
                <div>
                  <p className="label label_day pt-1.5">{Arraydate[1]} Tomorrow</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">{Math.trunc(weather_data["result"].daily.temperature_2m_min[1])}°c /{Math.trunc(weather_data["result"].daily.temperature_2m_max[1])}°c </span>

              </div>
              <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
                <div>
                  <p className="label label_day pt-1.5">{Arraydate[2]} {Arrayday[2]}</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">{Math.trunc(weather_data["result"].daily.temperature_2m_min[2])}°c /{Math.trunc(weather_data["result"].daily.temperature_2m_max[2])}°c </span>

              </div>
              <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
                <div>
                  <p className="label label_day pt-1.5">{Arraydate[3]} {Arrayday[3]}</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">{Math.trunc(weather_data["result"].daily.temperature_2m_min[3])}°c /{Math.trunc(weather_data["result"].daily.temperature_2m_max[3])}°c </span>

              </div>
              <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
                <div>
                  <p className="label label_day pt-1.5">{Arraydate[4]} {Arrayday[4]}</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">{Math.trunc(weather_data["result"].daily.temperature_2m_min[4])}°c /{Math.trunc(weather_data["result"].daily.temperature_2m_max[4])}°c </span>

              </div>
              <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
                <div>
                  <p className="label label_day pt-1.5">{Arraydate[5]} {Arrayday[5]}</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">{Math.trunc(weather_data["result"].daily.temperature_2m_min[5])}°c /{Math.trunc(weather_data["result"].daily.temperature_2m_max[5])}°c </span>

              </div>
              <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
                <div>
                  <p className="label label_day pt-1.5">{Arraydate[6]} {Arrayday[6]}</p>
                </div>

                <div className="w-28 h-10">
                  <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
                </div>

                <span className="font-bold">{Math.trunc(weather_data["result"].daily.temperature_2m_min[6])}°c /{Math.trunc(weather_data["result"].daily.temperature_2m_max[6])}°c </span>

              </div>

            </div>

          }


        </div> : <div className="third_div text-white rounded-2xl ml-8 ">
          <div className="flex justify-between border-b-2 border-[#CDE5FA21] h-20">
            <div className="pl-5 pt-3">
              <p className="font-bold">7-day forecast</p>
              <p className="text-sm text-[#aac0d4]">A look at the week ahead</p>
            </div>

            <div className="flex justify-center items-center pr-6">
              <p className="text-sm font-bold text-[#aac0d4] pr-2">Daily high and low</p>
              <button className="flex justify-center items-center cursor-pointer border border-[#c6dff438] w-7 h-7  bg-[#12385929] rounded-full hover:bg-[#87c2ef29] hover:border-[#c6dff485]">
                <svg className="refresh " viewBox="0 0 20 20" aria-hidden="true"><path d="M16.5 7.5A6.7 6.7 0 1 0 17 10M16.5 3.5v4h-4" /><path d="M10 6.5V10l2.3 1.4" /></svg>
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
              <div>
                <p className="label label_day pt-1.5">---</p>
              </div>

              <div className="w-28 h-10">
                <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
              </div>

              <span className="font-bold">-- / --</span>
              <span className="hour_desc">---</span>

            </div>
            <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
              <div>
                <p className="label label_day pt-1.5">---</p>
              </div>

              <div className="w-28 h-10">
                <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
              </div>

              <span className="font-bold">-- / --</span>
              <span className="hour_desc">---</span>

            </div>
            <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
              <div>
                <p className="label label_day pt-1.5">---</p>
              </div>

              <div className="w-28 h-10">
                <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
              </div>

              <span className="font-bold">-- / --</span>
              <span className="hour_desc">---</span>

            </div>
            <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
              <div>
                <p className="label label_day pt-1.5">---</p>
              </div>

              <div className="w-28 h-10">
                <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
              </div>

              <span className="font-bold">-- / --</span>
              <span className="hour_desc">---</span>

            </div>
            <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
              <div>
                <p className="label label_day pt-1.5">---</p>
              </div>

              <div className="w-28 h-10">
                <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
              </div>

              <span className="font-bold">-- / --</span>
              <span className="hour_desc">---</span>

            </div>
            <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
              <div>
                <p className="label label_day pt-1.5">---</p>
              </div>

              <div className="w-28 h-10">
                <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
              </div>

              <span className="font-bold">-- / --</span>
              <span className="hour_desc">---</span>

            </div>
            <div className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-1.5 ">
              <div>
                <p className="label label_day pt-1.5">---</p>
              </div>

              <div className="w-28 h-10">
                <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
              </div>

              <span className="font-bold">-- / --</span>
              <span className="hour_desc">---</span>

            </div>




          </div>


        </div>}


      </div>
    </div >
  );
}
