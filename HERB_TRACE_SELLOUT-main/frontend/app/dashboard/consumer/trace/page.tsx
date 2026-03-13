"use client"

import { useEffect,useRef,useState } from "react"
import { BrowserMultiFormatReader } from "@zxing/browser"

export default function TracePage(){

const API =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:5000"

const videoRef = useRef<HTMLVideoElement>(null)

const [batchId,setBatchId] = useState("")
const [data,setData] = useState<any>(null)

useEffect(()=>{

const scanner = new BrowserMultiFormatReader()

if(videoRef.current){

scanner.decodeFromVideoDevice(
undefined,
videoRef.current,
(result)=>{
if(result){

const id = result.getText().split("/").pop()
verify(id)

}
})

}

},[])

async function verify(id:any){

const res = await fetch(`${API}/api/trace/${id}`)
const result = await res.json()

if(result.batch){

setData(result.batch)

/* SAVE HISTORY */

const history =
JSON.parse(localStorage.getItem("traceHistory") || "[]")

history.unshift(result.batch)

localStorage.setItem(
"traceHistory",
JSON.stringify(history.slice(0,5))
)

}

}

return(

<div className="p-10 text-white space-y-6">

<h1 className="text-3xl text-green-400">
Product Verification
</h1>

{/* QR CAMERA */}

<div className="bg-[#062c21] p-6 rounded-xl">

<h2 className="mb-4">
Scan QR Code
</h2>

<video
ref={videoRef}
className="w-[400px] rounded"
/>

</div>

{/* MANUAL ENTRY */}

<div className="bg-[#062c21] p-6 rounded-xl">

<h2 className="mb-4">
Manual Batch ID
</h2>

<input
value={batchId}
onChange={e=>setBatchId(e.target.value)}
className="p-3 bg-[#041f17] mr-3"
/>

<button
onClick={()=>verify(batchId)}
className="bg-green-600 px-4 py-2 rounded"
>
Verify
</button>

</div>

{/* RESULT */}

{data &&(

<div className="bg-[#062c21] p-6 rounded-xl space-y-3">

<h2 className="text-xl">
Herb Information
</h2>

<p>Herb: {data.herbName}</p>
<p>Farmer: {data.farmer}</p>
<p>Batch: {data.batchId}</p>
<p>Harvest: {data.harvestDate}</p>
<p>Quantity: {data.quantity} kg</p>

{data.geoImage &&(
<img src={data.geoImage} className="rounded"/>
)}

<div className="mt-3">

<p className="text-green-400">
Blockchain Hash
</p>

<p className="break-all">
{data.hash}
</p>

</div>

</div>

)}

</div>

)

}