"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend,
CategoryScale,
LinearScale,
BarElement
} from "chart.js"

import { Pie, Bar } from "react-chartjs-2"

ChartJS.register(
ArcElement,
Tooltip,
Legend,
CategoryScale,
LinearScale,
BarElement
)

export default function LabDashboard(){

const [stats,setStats] = useState({
samples:0,
completed:0,
pending:0,
rejected:0,
bis:0
})

/* Fetch dashboard data */

useEffect(()=>{

axios.get("http://localhost:5000/api/lab/dashboard")
.then(res=>setStats(res.data))
.catch(err=>console.log(err))

},[])

/* Pie Chart */

const pieData = {

labels:["Completed","Pending","Rejected"],

datasets:[
{
data:[
stats.completed,
stats.pending,
stats.rejected
],
backgroundColor:[
"#22c55e",
"#facc15",
"#ef4444"
],
borderWidth:1
}
]

}

/* Bar Chart */

const herbChartData = {

labels:["Ashwagandha","Tulsi","Brahmi","Neem","Turmeric"],

datasets:[
{
label:"Quality Score",
data:[92,88,80,90,85],
backgroundColor:"#22c55e"
}
]

}

return(

<div>

<h1 className="dashboard-title">Lab Dashboard</h1>

{/* Statistics Cards */}

<div className="stats">

<div className="stat-card">
<h3>Total Samples</h3>
<h2>{stats.samples}</h2>
</div>

<div className="stat-card">
<h3>Completed Tests</h3>
<h2>{stats.completed}</h2>
</div>

<div className="stat-card">
<h3>Pending Tests</h3>
<h2>{stats.pending}</h2>
</div>

<div className="stat-card">
<h3>Rejected Tests</h3>
<h2>{stats.rejected}</h2>
</div>

<div className="stat-card">
<h3>BIS Compliance</h3>
<h2>{stats.bis}%</h2>
</div>

</div>

{/* Charts */}

<div className="chart-grid">

<div className="chart-card">

<h3 style={{marginBottom:"10px"}}>Test Status</h3>

<Pie
data={{
labels:["Approved","Rejected","Pending"],
datasets:[
{
data:[stats.completed,stats.rejected,stats.pending
],
backgroundColor:["#22c55e","#ef4444","#facc15"]
}
]
}}
options={{maintainAspectRatio:false}}
/>

</div>

</div>

</div>

)

}