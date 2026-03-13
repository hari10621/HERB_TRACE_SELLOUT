"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ConsumerDashboard(){

const router = useRouter()

const API =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:5000"

const [consumer,setConsumer] = useState<any>(null)
const [recent,setRecent] = useState<any[]>([])

useEffect(()=>{

const id = localStorage.getItem("consumerId")
if(!id) return

fetch(`${API}/api/consumer/${id}`)
.then(res=>res.json())
.then(setConsumer)

const history =
JSON.parse(localStorage.getItem("traceHistory") || "[]")

setRecent(history)

},[])

if(!consumer){
return <div className="p-10 text-white">Loading...</div>
}

return(

<div className="p-10 text-white space-y-8">

<h1 className="text-3xl text-green-400">
Consumer Dashboard
</h1>

{/* PROFILE */}

<div className="grid grid-cols-2 gap-6">

<div className="bg-[#062c21] p-6 rounded-xl">

<h2 className="text-xl mb-3">
Profile
</h2>

<p>Name: {consumer.name}</p>
<p>Email: {consumer.email}</p>
<p>Location: {consumer.location}</p>

</div>

<div className="bg-[#062c21] p-6 rounded-xl">

<h2 className="text-xl mb-3">
Market Insights
</h2>

<p>Trusted Herb: Ashwagandha</p>
<p>Top Farmer: Ramesh</p>
<p>Supply Trend: Growing</p>

</div>

</div>

{/* QUICK ACTIONS */}

<div className="grid grid-cols-3 gap-6">

<button
onClick={()=>router.push("/dashboard/consumer/trace")}
className="bg-[#083d34] p-6 rounded-xl"
>
Scan / Verify Product
</button>

<button
onClick={()=>router.push("/dashboard/consumer/herbs")}
className="bg-[#083d34] p-6 rounded-xl"
>
Browse Herbs
</button>

<button
onClick={()=>router.push("/dashboard/consumer/feedback")}
className="bg-[#083d34] p-6 rounded-xl"
>
Submit Feedback
</button>

</div>

{/* RECENT TRACE */}

<div className="bg-[#062c21] p-6 rounded-xl">

<h2 className="text-xl mb-4">
Recent Verifications
</h2>

{recent.length===0 &&(
<p className="text-gray-400">
No recent verifications
</p>
)}

<div className="grid grid-cols-3 gap-4">

{recent.map((r:any,i:number)=>(
<div key={i} className="bg-[#083d34] p-4 rounded">

<p><b>{r.herbName}</b></p>
<p>Batch: {r.batchId}</p>
<p>Farmer: {r.farmer}</p>

</div>
))}

</div>

</div>

</div>

)

}