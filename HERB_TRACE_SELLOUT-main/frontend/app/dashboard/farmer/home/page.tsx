"use client"

import { useEffect,useState } from "react"
import { Bar } from "react-chartjs-2"

import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
} from "chart.js"

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
)

interface Review{
 user:string
 comment:string
 rating:number
}

interface Farmer{
 _id:string
 name:string
 farmName:string
 location:string
 experience:number
 rating:number
 totalHarvests:number
 profilePhoto:string
 reviews:Review[]
}

interface Production{
 herbs:{[key:string]:number}
 totalHarvests:number
 totalQuantity:number
}

export default function FarmerHome(){

const API = "http://localhost:5000"

const [farmer,setFarmer] = useState<Farmer | null>(null)
const [herbStats,setHerbStats] = useState<Production | null>(null)
const [regionStats,setRegionStats] = useState<{[key:string]:number}>({})
const [image,setImage] = useState<File | null>(null)

/* ======================
LOAD FARMER DATA
====================== */

useEffect(()=>{

const id = localStorage.getItem("farmerId")

if(!id) return

fetch(`${API}/api/farmer/${id}`)
.then(res=>res.json())
.then(data=>{

 setFarmer(data)

 /* FARMER HERB STATS */

 fetch(`${API}/api/production/${data._id}`)
 .then(res=>res.json())
 .then(setHerbStats)

 /* REGIONAL COMPARISON */

 fetch(`${API}/api/production/region/${data.location}`)
 .then(res=>res.json())
 .then(setRegionStats)

})

},[])

/* ======================
UPLOAD PROFILE PHOTO
====================== */

async function uploadPhoto(){

if(!image || !farmer) return

const formData = new FormData()

formData.append("image",image)

const upload = await fetch(`${API}/api/upload/profile`,{

method:"POST",
body:formData

})

const uploadData = await upload.json()

await fetch(`${API}/api/farmer/photo/${farmer._id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

profilePhoto:uploadData.path

})

})

window.location.reload()

}

if(!farmer){

return(
<div className="text-white text-xl">
Loading...
</div>
)

}

/* ======================
HERB CHART DATA
====================== */

const herbs = herbStats?.herbs || {}

const herbChart={

labels:Object.keys(herbs),

datasets:[{
label:"Herb Production",
data:Object.values(herbs),
backgroundColor:"#22c55e",
borderRadius:6
}]

}

/* ======================
REGION CHART DATA
====================== */

const regionChart={

labels:Object.keys(regionStats),

datasets:[{
label:"Regional Farmer Production",
data:Object.values(regionStats),
backgroundColor:"#4ade80",
borderRadius:6
}]

}

/* ======================
CHART OPTIONS
====================== */

const chartOptions={

responsive:true,
maintainAspectRatio:false,

plugins:{
 legend:{display:false}
},

scales:{
 x:{ticks:{color:"#a7f3d0"}},
 y:{ticks:{color:"#a7f3d0"}}
}

}

/* ======================
UI
====================== */

return(

<div className="space-y-8">

{/* PROFILE */}

<div className="flex items-center gap-6 bg-[#062c21] p-6 rounded-xl shadow-lg">

<img
src={`${API}${farmer.profilePhoto}`}
className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
/>

<div>

<h2 className="text-2xl font-bold">{farmer.name}</h2>

<div className="text-yellow-400 mt-1 text-lg">

{"⭐".repeat(Math.round(farmer.rating))}

<span className="text-gray-300 ml-2">
({farmer.rating}/5)
</span>

</div>

{/* PROFILE PHOTO SELECT */}

<div className="mt-4">

<input
type="file"
onChange={(e)=>setImage(e.target.files?.[0] || null)}
className="text-sm"
/>

<button
onClick={uploadPhoto}
className="bg-green-600 px-4 py-1 rounded mt-2"
>

Upload Photo

</button>

</div>

</div>

</div>

{/* FARM INFO */}

<div className="grid grid-cols-4 gap-6">

<div className="bg-[#062c21] p-5 rounded-xl">

<p className="text-gray-400 text-sm">
Farm Name
</p>

<p className="text-lg">
{farmer.farmName}
</p>

</div>

<div className="bg-[#062c21] p-5 rounded-xl">

<p className="text-gray-400 text-sm">
Location
</p>

<p className="text-lg">
{farmer.location}
</p>

</div>

<div className="bg-[#062c21] p-5 rounded-xl">

<p className="text-gray-400 text-sm">
Experience
</p>

<p className="text-lg">
{farmer.experience} yrs
</p>

</div>

<div className="bg-[#062c21] p-5 rounded-xl">

<p className="text-gray-400 text-sm">
Total Harvests
</p>

<p className="text-lg">
{herbStats?.totalHarvests || 0}
</p>

</div>

</div>

{/* CHARTS */}

<div className="grid grid-cols-2 gap-6">

{/* HERB CHART */}

<div className="bg-[#062c21] p-6 rounded-xl">

<h3 className="text-lg mb-4">
Herb Cultivation
</h3>

<div className="h-[250px]">
<Bar data={herbChart} options={chartOptions}/>
</div>

</div>

{/* REGIONAL COMPARISON */}

<div className="bg-[#062c21] p-6 rounded-xl">

<h3 className="text-lg mb-4">
Regional Farmer Comparison
</h3>

<div className="h-[250px]">
<Bar data={regionChart} options={chartOptions}/>
</div>

</div>

</div>

</div>

)

}