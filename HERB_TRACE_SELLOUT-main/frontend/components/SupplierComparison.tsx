"use client"

import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
)

export default function SupplierComparison({data}:any){

const chartData={

 labels:data.map((s:any)=>s.name),

 datasets:[
 {
  label:"Batches Processed",
  data:data.map((s:any)=>s.batches),
  backgroundColor:"#4ade80"
 }
 ]

}

return(

<div className="bg-[#083d34] p-6 rounded-xl">

<h2 className="text-green-400 mb-4">
Supplier Comparison
</h2>

<Bar data={chartData}/>

</div>

)

}