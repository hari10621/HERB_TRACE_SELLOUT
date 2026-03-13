"use client"

import { useState } from "react"
import axios from "axios"

export default function QualityTesting(){

const [batchId,setBatchId] = useState("")
const [batch,setBatch] = useState<any>(null)

const [parameters,setParameters] = useState({
color:"",
texture:"",
foreign:"",
aroma:"",
particle:""
})

const [moisture,setMoisture] = useState("")
const [ash,setAsh] = useState("")
const [comments,setComments] = useState("")
const [message,setMessage] = useState("")

/* SEARCH BATCH */

const searchBatch = async ()=>{

try{

const res = await axios.get(`http://localhost:5000/api/lab/batch/${batchId}`)

if(!res.data){
setMessage("Batch not found")
setBatch(null)
return
}

setBatch(res.data)
setMessage("")

}catch(err){

setMessage("Error fetching batch")

}

}

/* UPDATE PARAMETER */

const updateParam = (name:string,value:string)=>{
setParameters({...parameters,[name]:value})
}

/* CALCULATE GRADE */

const calculateGrade = ()=>{

let pass = Object.values(parameters).filter(v=>v==="pass").length

if(pass>=4) return "A"
if(pass>=3) return "B"
return "C"

}

/* SUBMIT TEST */

const submitTest = async ()=>{

if(!moisture || !ash){
setMessage("⚠ Please enter all required data")
return
}

const grade = calculateGrade()

try{

await axios.post("http://localhost:5000/api/lab/test",{

batchId:batch.batchId,
herbName:batch.herbName,
moisture,
ash,
parameters,
comments,
qualityGrade:grade,
status:"Approved"

})

setMessage("✅ Quality test submitted successfully")

}catch(err){

setMessage("❌ Failed to submit test")

}

}

return(

<div className="lab-container">

<h1 className="page-title">Quality Testing</h1>

{/* SEARCH */}

<div className="card">

<h3>Search Batch</h3>

<div className="search-box">

<input
placeholder="Enter Batch ID"
value={batchId}
onChange={(e)=>setBatchId(e.target.value)}
/>

<button onClick={searchBatch}>
Search
</button>

</div>

</div>

{/* MESSAGE */}

{message && (

<div className="message">
{message}
</div>

)}

{/* BATCH INFO */}

{batch && (

<div className="card">

<h3>Batch Information</h3>

<p><b>Batch:</b> {batch.batchId}</p>
<p><b>Herb:</b> {batch.herbName}</p>

</div>

)}

{/* PARAMETERS */}

{batch && (

<div className="card">

<h3>Quality Parameters</h3>

{[
["color","Color Consistency"],
["texture","Texture"],
["foreign","Foreign Matter"],
["aroma","Aroma"],
["particle","Particle Size"]
].map(([key,label])=>(

<div className="param" key={key}>

<p>{label}</p>

<div className="buttons">

<button
className={parameters[key]==="pass"?"pass-active":"btn-pass"}
onClick={()=>updateParam(key,"pass")}
>
Pass
</button>

<button
className={parameters[key]==="fail"?"fail-active":"btn-fail"}
onClick={()=>updateParam(key,"fail")}
>
Fail
</button>

</div>

</div>

))}

</div>

)}

{/* TEST VALUES */}

{batch && (

<div className="card">

<h3>Test Results</h3>

<label>Moisture (%)</label>

<input
value={moisture}
onChange={(e)=>setMoisture(e.target.value)}
/>

<label>Total Ash (%)</label>

<input
value={ash}
onChange={(e)=>setAsh(e.target.value)}
/>

</div>

)}

{/* COMMENTS */}

{batch && (

<div className="card">

<h3>Comments</h3>

<textarea
rows={4}
value={comments}
onChange={(e)=>setComments(e.target.value)}
/>

</div>

)}

{/* SUBMIT */}

{batch && (

<div className="actions">

<button className="reject">
Reject Batch
</button>

<button className="submit" onClick={submitTest}>
Submit Verification
</button>

</div>

)}

</div>

)

}