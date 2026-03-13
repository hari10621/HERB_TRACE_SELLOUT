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

export default function SupplierCharts({data}:any){

const chartData={
 labels:data.map((item:any)=>item.herb),

 datasets:[
 {
  label:"Herbs Processed",
  data:data.map((item:any)=>item.quantity),
  backgroundColor:"#22c55e"
 }
 ]
}

return(

<div className="bg-[#083d34] p-6 rounded-xl">

<h2 className="text-green-400 mb-4">
Herb Processing
</h2>

<Bar data={chartData}/>

</div>

)

}