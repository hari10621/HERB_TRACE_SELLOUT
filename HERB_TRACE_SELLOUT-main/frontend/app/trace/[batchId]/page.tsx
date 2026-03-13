"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function TracePage() {

const { id } = useParams()

const API =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:5000"

const [batch,setBatch] = useState<any>(null)
const [packet,setPacket] = useState<any>(null)
const [loading,setLoading] = useState(true)
const [error,setError] = useState("")

/* ============================
   FETCH TRACE DATA
============================ */

useEffect(()=>{

async function loadTrace(){

 try{

  const res = await fetch(
   `${API}/api/trace/${id}`
  )

  if(!res.ok){
   throw new Error("Trace API failed")
  }

  const text = await res.text()

  /* Detect HTML response */

  if(text.startsWith("<!DOCTYPE")){
   throw new Error("API returned HTML instead of JSON")
  }

  const data = JSON.parse(text)

  if(data.type === "packet"){
   setBatch(data.batch)
   setPacket(data.packet)
  }

  if(data.type === "batch"){
   setBatch(data.batch)
  }

 }catch(err:any){

  console.error(err)
  setError("Unable to load trace data")

 }

 setLoading(false)

}

loadTrace()

},[id,API])

/* ============================
   LOADING
============================ */

if(loading){
 return(
  <div className="p-10 text-white">
   Loading trace data...
  </div>
 )
}

/* ============================
   ERROR
============================ */

if(error){
 return(
  <div className="p-10 text-red-400">
   {error}
  </div>
 )
}

/* ============================
   PAGE UI
============================ */

return(

<div className="min-h-screen bg-[#041f17] text-white p-10">

<h1 className="text-3xl text-green-400 mb-6">
🌿 Herb Traceability
</h1>

{/* BATCH INFO */}

<div className="bg-[#062c21] p-6 rounded-xl space-y-3">

<p><b>Herb :</b> {batch.herbName}</p>

<p><b>Batch ID :</b> {batch.batchId}</p>

{packet && (
<p><b>Packet ID :</b> {packet.packetId}</p>
)}

<p><b>Farmer :</b> {batch.farmer}</p>

<p><b>Harvest Date :</b> {batch.harvestDate}</p>

<p><b>Quantity :</b> {batch.quantity} kg</p>

<p><b>Location :</b> {batch.location}</p>

</div>


{/* GPS IMAGE */}

{batch.geoImage &&(

<div className="mt-6">

<p className="text-green-400 mb-2">
Farm GPS Location
</p>

<img
src={batch.geoImage}
className="rounded-lg border border-green-700 w-full max-w-xl"
/>

</div>

)}


{/* BLOCKCHAIN */}

<div className="mt-6 bg-[#062c21] p-4 rounded">

<p className="text-green-400">
Blockchain Hash
</p>

<p className="break-all text-sm">
{batch.hash}
</p>

<p className="text-yellow-400 mt-2">
Previous Hash
</p>

<p className="break-all text-sm">
{batch.previousHash}
</p>

</div>

</div>

)

}