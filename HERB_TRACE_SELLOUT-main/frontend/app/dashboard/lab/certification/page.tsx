"use client"

import {useState} from "react"

export default function Certification(){

const [batch,setBatch]=useState("")

return(

<div>

<h1 className="dashboard-title">Lab Certification</h1>

<div className="panel">

<input
placeholder="Batch ID"
onChange={(e)=>setBatch(e.target.value)}
/>

<button >Generate Certificate</button>

</div>

</div>

)

}