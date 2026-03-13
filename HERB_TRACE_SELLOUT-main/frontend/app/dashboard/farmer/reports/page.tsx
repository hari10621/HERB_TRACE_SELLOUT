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

export default function ReportsPage(){

 const [farmer,setFarmer] = useState<any>(null)
 const [production,setProduction] = useState<any>({})
 const [region,setRegion] = useState<any>({})
 const [demand,setDemand] = useState<any>(null)

 useEffect(()=>{

  const id = localStorage.getItem("farmerId")
  if(!id) return

  fetch(`http://localhost:5000/api/farmer/${id}`)
  .then(res=>res.json())
  .then(data=>{

   setFarmer(data)

   /* FIXED HERE */

   fetch(`http://localhost:5000/api/production/${data._id}`)
   .then(res=>res.json())
   .then(setProduction)

   fetch(`http://localhost:5000/api/production/region/${data.location}`)
   .then(res=>res.json())
   .then(setRegion)

   fetch(`http://localhost:5000/api/analytics/demand`)
   .then(res=>res.json())
   .then(setDemand)

  })

 },[])

 if(!farmer){
  return(
   <div className="text-white text-xl">
    Loading Reports...
   </div>
  )
 }


 const herbChart = {
  labels:Object.keys(production.herbs || {}),
  datasets:[
   {
    label:"Herb Production",
    data:Object.values(production.herbs || {}),
    backgroundColor:"#22c55e"
   }
  ]
 }

 const regionChart = {
  labels:Object.keys(region),
  datasets:[
   {
    label:"Regional Production",
    data:Object.values(region),
    backgroundColor:"#4ade80"
   }
  ]
 }

 return(

 <div className="space-y-10">

 <h1 className="text-3xl font-bold">
  Farm Reports & Analytics
 </h1>

 <div className="grid grid-cols-3 gap-6">

  <div className="bg-[#062c21] p-6 rounded-xl">
   <p className="text-gray-400 text-sm">Total Harvests</p>
   <p className="text-2xl font-bold">
    {production.totalHarvests || 0}
   </p>
  </div>

  <div className="bg-[#062c21] p-6 rounded-xl">
   <p className="text-gray-400 text-sm">Total Production</p>
   <p className="text-2xl font-bold">
    {production.totalQuantity || 0} kg
   </p>
  </div>

  <div className="bg-[#062c21] p-6 rounded-xl">
   <p className="text-gray-400 text-sm">Farm Location</p>
   <p className="text-lg">
    {farmer.location}
   </p>
  </div>

 </div>


 <div className="bg-[#062c21] p-6 rounded-xl">

  <h2 className="text-xl mb-4">
   Herb Cultivation Statistics
  </h2>

  <div className="h-[300px]">
   <Bar data={herbChart}/>
  </div>

 </div>


 <div className="bg-[#062c21] p-6 rounded-xl">

  <h2 className="text-xl mb-4">
   Regional Farmer Comparison
  </h2>

  <div className="h-[300px]">
   <Bar data={regionChart}/>
  </div>

 </div>


 {demand &&(

 <div className="grid grid-cols-2 gap-6">

  <div className="bg-[#062c21] p-6 rounded-xl">
   <p className="text-gray-400">Most Demanded Herb</p>
   <p className="text-2xl text-green-400 font-bold">
    {demand.mostDemanded?.[0]}
   </p>
  </div>

  <div className="bg-[#062c21] p-6 rounded-xl">
   <p className="text-gray-400">Least Demanded Herb</p>
   <p className="text-2xl text-yellow-400 font-bold">
    {demand.leastDemanded?.[0]}
   </p>
  </div>

 </div>

 )}

 </div>

 )

}