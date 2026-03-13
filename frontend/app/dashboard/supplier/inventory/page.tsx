"use client"

import { useEffect,useState } from "react"
import { QRCodeCanvas } from "qrcode.react"

interface Packet{
 packetId:string
 weight:number
}

interface BatchInventory{

 batchId:string
 herbName:string
 farmer:string
 location:string
 packetCount:number
 packets:Packet[]

}

export default function Inventory(){

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const [inventory,setInventory] = useState<BatchInventory[]>([])
const [openBatch,setOpenBatch] = useState<string | null>(null)

useEffect(()=>{

fetch(`${API}/api/inventory`)
.then(res=>res.json())
.then(data=>{

 if(Array.isArray(data)){
 setInventory(data)
 }

})

},[])

return(

<div className="p-8 text-white">

<h1 className="text-3xl text-green-400 mb-6">
Inventory
</h1>

<div className="space-y-4">

{inventory.map(batch=>(

<div
key={batch.batchId}
className="bg-[#083d34] p-6 rounded-xl"
>

<div className="flex justify-between items-center">

<div>

<p><b>Batch ID :</b> {batch.batchId}</p>
<p><b>Herb :</b> {batch.herbName}</p>
<p><b>Farmer :</b> {batch.farmer}</p>
<p><b>Location :</b> {batch.location}</p>
<p><b>Packets :</b> {batch.packetCount}</p>

</div>

<button
className="bg-green-600 px-3 py-1 rounded"
onClick={()=>{

setOpenBatch(
openBatch===batch.batchId
? null
: batch.batchId
)

}}
>

View QR

</button>

</div>


{/* QR GRID */}

{openBatch===batch.batchId &&(

<div className="grid grid-cols-5 gap-4 mt-4">

{batch.packets.map(packet=>(

<div
key={packet.packetId}
className="bg-[#062f27] p-4 rounded text-center"
>

<QRCodeCanvas
value={`http://localhost:3000/trace/${packet.packetId}`}
size={90}
/>

<p className="text-xs mt-2">
{packet.packetId}
</p>

</div>

))}

</div>

)}

</div>

))}

</div>

</div>

)

}