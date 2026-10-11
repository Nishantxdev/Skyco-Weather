"use client"
import {  useState , useRef } from "react";

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

  
  

  let getlocation = async()=>{
    const data = await fetch(
        "/location",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city:"Varanasi"
          }),
        }
      );

      let response = await data.json()
      console.log(response)
      // setapidata(response)

       getweather(response)

    }
    let getweather = async (response)=>{
      console.log(response)
      const data1 = await fetch(
         "/weather",
         {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              lati : response.result.latitude,
              long : response.result.longitude,
          }),
        }
      );

      let response1 = await data1.json()
      console.log(response1)
    }
  return (
    <div>
      <ul>
        <button onClick={getlocation}><li >Varanasi</li></button>
      </ul>
    </div>
  );
}
