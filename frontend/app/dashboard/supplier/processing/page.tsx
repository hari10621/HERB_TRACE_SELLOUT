"use client"

import { useState, useEffect } from "react"

export default function ProcessingPage(){

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const [herb,setHerb] = useState("")
const [farmer,setFarmer] = useState("")
const [quantity,setQuantity] = useState("")

const [temperature,setTemperature] = useState("")
const [duration,setDuration] = useState("")
const [method,setMethod] = useState("")
const [yieldPercent,setYield] = useState("")
const [waste,setWaste] = useState("")

const [latitude,setLatitude] = useState<number | null>(null)
const [longitude,setLongitude] = useState<number | null>(null)

const [message,setMessage] = useState("")

/* ===============================
   GET LOCATION AUTOMATICALLY
=============================== */

useEffect(()=>{

 if(!navigator.geolocation){

  console.log("Geolocation not supported")

  return
 }

 navigator.geolocation.getCurrentPosition(

  (position)=>{

   setLatitude(position.coords.latitude)
   setLongitude(position.coords.longitude)

  },

  (error)=>{

   console.error("Location error:",error)

  }

 )

},[])

/* ===============================
   SUBMIT PROCESSING
=============================== */

const submitProcessing = async () => {

 try {

 const res = await fetch(`${API}/api/processing/create`,{

 method:"POST",
 headers:{
 "Content-Type":"application/json"
 },

body:JSON.stringify({

herbName:herb,
farmerName:farmer,
quantity:Number(quantity),
temperature:Number(temperature),
duration,
method,
yieldPercent:Number(yieldPercent),
waste:Number(waste),
latitude,
longitude

})

 })

 const data = await res.json()

 /* SAFE RESPONSE CHECK */

 if(data.success && data.batch){

 setMessage(`Batch ${data.batch.batchId} created successfully`)

 }else{

 setMessage(data.message || data.error || "Batch creation failed")

 }

 }catch(err){

 console.error(err)

 setMessage("Server connection failed")

 }

}

return(

<div className="p-10 text-white">

<h1 className="text-3xl mb-6">
Processing Log
</h1>

<div className="bg-[#083d34] p-8 rounded-xl max-w-lg">

{/* HERB */}

<select
className="w-full p-3 rounded bg-[#062f27] mb-4"
onChange={(e)=>setHerb(e.target.value)}
>

<option>Select Herb</option>
<option>Brahmi</option>
<option>Tulsi</option>
<option>Ashwagandha</option>
<option>Turmeric</option>
<option>Neem</option>

</select>

{/* FARMER */}

<input
type="text"
placeholder="Farmer Name"
className="w-full p-3 rounded bg-[#062f27] mb-4"
onChange={(e)=>setFarmer(e.target.value)}
/>

{/* QUANTITY */}

<input
type="number"
placeholder="Amount (kg)"
className="w-full p-3 rounded bg-[#062f27] mb-4"
onChange={(e)=>setQuantity(e.target.value)}
/>

{/* PROCESS PARAMETERS */}

<input
type="number"
placeholder="Temperature °C"
className="w-full p-3 rounded bg-[#062f27] mb-4"
onChange={(e)=>setTemperature(e.target.value)}
/>

<input
type="number"
placeholder="Duration (hours)"
className="w-full p-3 rounded bg-[#062f27] mb-4"
onChange={(e)=>setDuration(e.target.value)}
/>

<input
type="text"
placeholder="Processing Method"
className="w-full p-3 rounded bg-[#062f27] mb-4"
onChange={(e)=>setMethod(e.target.value)}
/>

<input
type="number"
placeholder="Yield Percentage"
className="w-full p-3 rounded bg-[#062f27] mb-4"
onChange={(e)=>setYield(e.target.value)}
/>

<input
type="number"
placeholder="Waste (kg)"
className="w-full p-3 rounded bg-[#062f27] mb-6"
onChange={(e)=>setWaste(e.target.value)}
/>

{/* LOCATION DISPLAY */}

<div className="bg-[#041f17] p-3 rounded mb-4 text-sm">

<p>Latitude : {latitude ?? "Detecting..."}</p>
<p>Longitude : {longitude ?? "Detecting..."}</p>

</div>

<button
className="bg-green-600 px-4 py-2 rounded"
onClick={submitProcessing}
>

Create Batch

</button>

{message &&(

<p className="mt-4 text-green-400">
{message}
</p>

)}

</div>

</div>

)

}