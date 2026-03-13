"use client"

import { useState } from "react"
import axios from "axios"
import { QRCodeCanvas } from "qrcode.react"

export default function BatchVerification(){

const [batchId,setBatchId] = useState("")
const [batch,setBatch] = useState<any>(null)
const [error,setError] = useState("")

const searchBatch = async () => {

try{

const res = await axios.get(
`http://localhost:5000/api/lab/batch/${batchId}`
)

if(!res.data){
setError("Batch not found")
setBatch(null)
return
}

setBatch(res.data)
setError("")

}catch(err){

setError("Error fetching batch")
setBatch(null)

}

}

return(

<div className="lab-page">

<h1 className="page-title">Batch Verification</h1>

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
Search Batch
</button>

</div>

{error && <p className="error">{error}</p>}

</div>


{/* BATCH DETAILS */}

{batch && (

<div className="card">

<h3>Batch Information</h3>

<div className="grid">

<div>
<b>Batch ID</b>
<p>{batch.batchId}</p>
</div>

<div>
<b>Herb Name</b>
<p>{batch.herbName}</p>
</div>

<div>
<b>Farmer</b>
<p>{batch.farmerName}</p>
</div>

<div>
<b>Location</b>
<p>{batch.location}</p>
</div>

<div>
<b>Harvest Date</b>
<p>{batch.harvestDate}</p>
</div>

<div>
<b>Quantity</b>
<p>{batch.quantity} kg</p>
</div>

<div>
<b>Blockchain Hash</b>
<p className="hash">{batch.blockchainHash}</p>
</div>

</div>

</div>

)}


{/* LAB TEST RESULT */}

{batch && batch.labResult && (

<div className="card">

<h3>Lab Test Result</h3>

<div className="grid">

<div>
<b>Moisture</b>
<p>{batch.labResult.moisture}%</p>
</div>

<div>
<b>Purity</b>
<p>{batch.labResult.purity}%</p>
</div>

<div>
<b>Heavy Metals</b>
<p>{batch.labResult.heavyMetals}</p>
</div>

<div>
<b>Quality Grade</b>
<p className="grade">{batch.labResult.qualityGrade}</p>
</div>

</div>

</div>

)}


{/* QR CERTIFICATE */}

{batch && (

<div className="card center">

<h3>Verification QR</h3>

<QRCodeCanvas
value={`HerbTrace Batch Verified: ${batch.batchId}`}
size={160}
bgColor="#ffffff"
fgColor="#064e3b"
/>

<p>Scan to verify batch authenticity</p>

</div>

)}

</div>

)

}