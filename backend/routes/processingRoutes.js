const express = require("express")
const router = express.Router()

const Batch = require("../models/Batch")

/* ===============================
   CREATE PROCESSING BATCH
=============================== */

router.post("/processing/create", async (req,res)=>{

try{

const {
herbName,
farmerName,
quantity,
temperature,
duration,
method,
yieldPercent,
waste,
latitude,
longitude
} = req.body

/* ===============================
VALIDATION
=============================== */

if(!herbName || !farmerName || !quantity){

return res.status(400).json({
success:false,
message:"Herb, Farmer and Quantity are required"
})

}

/* ===============================
GENERATE BATCH ID
=============================== */

const count = await Batch.countDocuments()

const batchId =
"HB-" + (count+1).toString().padStart(4,"0")

/* ===============================
GENERATE FARMER ID
=============================== */

const farmerId = "FR-" + Date.now()

/* ===============================
PREVIOUS HASH
=============================== */

const lastBatch = await Batch
.findOne()
.sort({createdAt:-1})

const previousHash =
lastBatch ? lastBatch.hash : "GENESIS"

/* ===============================
GOOGLE MAP IMAGE
=============================== */

let geoImage=""

if(latitude && longitude){

geoImage =
`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:red%7C${latitude},${longitude}`

}

/* ===============================
CREATE BATCH
=============================== */

const batch = new Batch({

batchId,

herbName,

farmer:farmerName,
farmerId,

quantity,
unit:"kg",

harvestDate:new Date(),

location:"Supplier Processing Facility",

latitude,
longitude,
geoImage,

temperature,
duration,
method,
yieldPercent,
waste,

previousHash

})

/* ===============================
GENERATE HASH
=============================== */

batch.hash = batch.generateHash()

await batch.save()

/* ===============================
SUCCESS RESPONSE
=============================== */

res.status(201).json({

success:true,
message:"Batch created successfully",
batch

})

}catch(err){

console.error("Processing error:",err)

res.status(500).json({
success:false,
error:err.message
})

}

})

module.exports = router