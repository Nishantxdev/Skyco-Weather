"use client"
import "./style.css"
import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


export default function Home() {

  const [weather_data, setweather_data] = useState(null);
  const [delhi_weather, setdelhi_weather] = useState({})
  const [city_location, setcity_location] = useState(null);
  const [arrayDate, setarrayDate] = useState([])
  const [arrayDay, setarrayDay] = useState([])
  const [arrayTime, setarrayTime] = useState([])
  const [currentDay, setcurrentDay] = useState([])
  const ref = useRef();
  const ref2 = useRef();
  const refscrollhours = useRef()

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
            city: "Varanasi"
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
    if (arrayDate.length == 0) {
      date.forEach(e => {

        // date
        const date = new Date(e);

        const result1 = date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          timeZone: "UTC"
        });

        setarrayDate(e => [...e, result1])

        // day
        const dateString = result1;
        const year = 2026;

        const [month, day] = dateString.split("/").map(Number);

        const date1 = new Date(Date.UTC(year, month - 1, day));

        const dayName = date1.toLocaleDateString("en-US", {
          weekday: "long",
          timeZone: "UTC"
        });

        setarrayDay(e => [...e, dayName])

      })
    }
    if (ref2.current) {

      ref2.current.style.width = `${Math.trunc(response1["result"].current.relative_humidity_2m)}%`
    }

    let time = response1["result"].hourly.time;


    // for 24 hours forecast Time
    if (arrayTime.length == 0) {

      time.forEach((e) => {

        const date = new Date(e);

        let result2 = date.toLocaleString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })


        setarrayTime((e) => [...e, result2])

        const result1 = date.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            timeZone: "UTC"
          });
  
          // day
          const dateString = result1;
          const year = 2026;
  
          const [month, day] = dateString.split("/").map(Number);
  
          const date1 = new Date(Date.UTC(year, month - 1, day));
  
          const dayName = date1.toLocaleDateString("en-US", {
            weekday: "long",
            timeZone: "UTC"
          });
  
          setcurrentDay((e)=>[...e , dayName])
      })
    }
  
  }

  // slide the second div
    const slide = (direction) => {
    refscrollhours.current?.scrollBy({
      left: direction * 537,
      behavior: "smooth",
    });
  };
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
              return (<div key={index} className="current-panel w-137.5 h-96 bg-[#3C77AF] ml-8 mt-5 p-5 text-white rounded-2xl">

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

                <div className=" flex gap-2.5 my-15 text-[#bad2e7]">
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

                    <p className="metric-card px-3 text-white">{item["result"].current.wind_speed_10m.toFixed(1)}km/h</p>
                    <p className="metric-caption px-3">↗ wind</p>
                  </div>


                </div>
              </div>)
            }) : <div className="current-panel w-137.5 h-96 bg-[#3C77AF] ml-8 mt-5 p-5 text-white rounded-2xl">

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

              <div className=" flex gap-2.5 my-15 text-[#bad2e7]">
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
                <p className="text-sm text-[#aac0d4]">The few hours</p>
              </div>
              <div className="flex justify-center items-center pr-6">
                <p className="text-sm font-bold text-[#aac0d4] pr-2">24 hours forecasting</p>
                <button className="flex justify-center items-center cursor-pointer border border-[#c6dff438] w-7 h-7  bg-[#12385929] rounded-full hover:bg-[#87c2ef29] hover:border-[#c6dff485]">
                  <svg className="refresh " viewBox="0 0 20 20" aria-hidden="true"><path d="M16.5 7.5A6.7 6.7 0 1 0 17 10M16.5 3.5v4h-4" /><path d="M10 6.5V10l2.3 1.4" /></svg>
                </button>
              </div>
            </div>



            <div  onClick={()=>slide(1)} className="right">
              <div className="right_icon"><IoIosArrowForward /></div>
            </div>

            <div  onClick={()=>slide(-1)} className="left">
              <div className="left_icon"><IoIosArrowBack /></div>
            </div>

            {weather_data &&
              Array(arrayTime).map((item, index) => {
                
                
                const allsecond = [];
                for (let i = 0; i < 19; i++) {

                  let cloud_cond = weather_data["result"].hourly.cloud_cover[i]
                  let precipitation_probability = weather_data["result"].hourly.precipitation_probability[i]
                  let relative_humidity_2m = Math.trunc(weather_data["result"].hourly.relative_humidity_2m[i])

                  let wind_speed_10m = weather_data["result"].hourly.wind_speed_10m[i].toFixed(1)

                  let temperature_2m = Math.trunc(weather_data["result"].hourly.temperature_2m[i])

                  allsecond.push(
                    <div key={i} className="column1 column w-1/5 border-r-2 border-[#CDE5FA21] flex flex-col items-center gap-2 ">
                      <div>
                        <p className="label label_day pt-1.5">{currentDay[i].slice(0,3).toUpperCase()}</p>
                        <p className="label label_time">{item[i]}</p>
                      </div>

                      <div className="w-28 h-10">
                        <img className="cloud" src="sun_cloud.png" alt="sun and cloud" />
                      </div>

                      <span className="font-bold">{temperature_2m}°c</span>
                      
                      {cloud_cond >= 0 && cloud_cond <= 10 ? (<span className="hour_desc">Clear Sky</span>) :
                        cloud_cond >= 11 && cloud_cond <= 25 ? (<span className="hour_desc">Mostly Clear</span>) : cloud_cond >= 26 && cloud_cond <= 50 ? (<span className="hour_desc">Partly Cloudy</span>) : cloud_cond >= 51 && cloud_cond <= 75 ? (<span className="hour_desc">Mostly Cloudy</span>) :
                          cloud_cond >= 76 && cloud_cond <= 90 ? (<span className="hour_desc">Very Cloudy</span>) :
                            cloud_cond >= 91 && cloud_cond <= 100 && (<span className="hour_desc">Overcast</span>)}


                      <div className="pt-16">
                        <div className="desc ">
                          <p className="text-[12px] text-[#d7e7f5]">Rain</p>
                          <p className="text-[12px] font-bold">{precipitation_probability}</p>
                        </div>
                        <div className="desc ">
                          <p className="text-[12px] text-[#d7e7f5]">Humidity</p>
                          <p className="text-[12px] font-bold">{relative_humidity_2m}%</p>
                        </div>
                        <div className="desc ">
                          <p className="text-[12px] text-[#d7e7f5]">Wind</p>
                          <p className="text-[12px] font-bold">{wind_speed_10m} km/h</p>
                        </div>
                      </div>
                    </div>

                  );
                }
                return (
                  <div ref={refscrollhours} key={index} className="scroll_hours flex">
                    {allsecond}
                  </div>)
              })}

          </div>


        </div>
        <div className="third_div text-white rounded-2xl ml-8 ">
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
            weather_data &&
            Array(arrayDate).map((item, index) => {
              let all_third = []
              for (let j = 0; j <= 6; j++) {
                if (j == 0) {
                  all_third.push(
                    <div key={j} className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col  items-center gap-1.5 ">
                      <div>
                        <p className="label label_day pt-1.5">{item[j]} Today</p>
                      </div>

                      <div className="w-28 h-10">
                        <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
                      </div>

                      <span className="font-bold">{Math.trunc(weather_data["result"].daily.temperature_2m_min[j])}°c /{Math.trunc(weather_data["result"].daily.temperature_2m_max[j])}°c </span>

                    </div>
                  )
                }

                else if (j == 1) {
                  all_third.push(
                    <div key={j} className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col  items-center gap-1.5 ">
                      <div>
                        <p className="label label_day pt-1.5">{item[j]} Yesterday</p>
                      </div>

                      <div className="w-28 h-10">
                        <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
                      </div>

                      <span className="font-bold">{Math.trunc(weather_data["result"].daily.temperature_2m_min[j])}°c /{Math.trunc(weather_data["result"].daily.temperature_2m_max[j])}°c </span>

                    </div>
                  )
                }
                else {
                  all_third.push(
                    <div key={j} className="column1 justify-center last_column w-1/7 border-r-2 border-[#CDE5FA21] flex flex-col  items-center gap-1.5 ">
                      <div>
                        <p className="label label_day pt-1.5">{item[j]} {arrayDay[j].slice(0, 3).toUpperCase()}</p>
                      </div>

                      <div className="w-28 h-10">
                        <img className="cloud1" src="sun_cloud.png" alt="sun and cloud" />
                      </div>

                      <span className="font-bold">{Math.trunc(weather_data["result"].daily.temperature_2m_min[j])}°c /{Math.trunc(weather_data["result"].daily.temperature_2m_max[j])}°c </span>

                    </div>

                  )
                }
              }
              return (
                <div key={index} className="flex ">
                  {all_third}
                </div>
              )
            })

          }
        </div>

      </div>
    </div >
  );
}
