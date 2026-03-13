"use client"

import { useEffect,useState } from "react"
import { QRCodeCanvas } from "qrcode.react"

interface Batch{
 _id:string
 herbName:string
 batchId:string
 harvestDate:string
 quantity:number
 location:string
 hash:string
 previousHash:string
}

export default function Harvests(){

 const [batches,setBatches] = useState<Batch[]>([])

 const API = process.env.NEXT_PUBLIC_API_URL
 const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

 useEffect(()=>{

  const farmerId = localStorage.getItem("farmerId")
  if(!farmerId) return

  fetch(`${API}/api/batches/farmer/${farmerId}`)
  .then(res=>res.json())
  .then(setBatches)
  .catch(console.error)

 },[API])


 return(

 <div>

 <h1 className="text-3xl font-bold mb-8">
 My Harvests
 </h1>

 <div className="grid grid-cols-2 gap-6">

 {batches.map(batch=>(

 <div
 key={batch._id}
 className="bg-[#062c21] p-6 rounded-xl shadow-lg"
 >

 <img
 src={`/herbs/${batch.herbName.toLowerCase()}.jpg`}
 className="h-40 w-full object-cover rounded"
 />

 <h2 className="text-xl mt-3 font-semibold">
 {batch.herbName}
 </h2>

 <p>Batch ID : {batch.batchId}</p>
 <p>Harvest : {batch.harvestDate}</p>
 <p>Quantity : {batch.quantity} kg</p>
 <p>Location : {batch.location}</p>

 <div className="mt-4 bg-[#041f17] p-3 rounded text-xs">

 <p className="text-green-400">Block Hash</p>

 <p className="break-all text-gray-300">
 {batch.hash}
 </p>

 <p className="text-yellow-400 mt-2">
 Previous Block
 </p>

 <p className="break-all text-gray-400">
 {batch.previousHash}
 </p>

 </div>

 <div className="mt-4 flex justify-center">

 <QRCodeCanvas
 value={`${BASE_URL}/trace/${batch.batchId}`}
 size={120}
 />

 </div>

 </div>

 ))}

 </div>

 </div>

 )

}