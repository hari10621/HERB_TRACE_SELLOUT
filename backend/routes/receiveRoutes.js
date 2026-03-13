const express = require("express")
const router = express.Router()

const Batch = require("../models/Batch")

/* ===============================
   RECEIVE BATCH FROM QR
=============================== */

router.post("/receive/batch", async(req,res)=>{

try{

const { batchId } = req.body

if(!batchId){

return res.status(400).json({
success:false,
message:"Batch ID missing"
})

}

/* find batch */

const batch = await Batch.findOne({batchId})

if(!batch){

return res.status(404).json({
success:false,
message:"Batch not found"
})

}

/* update status */

batch.status = "received"

await batch.save()

res.json({

success:true,
batch

})

}catch(err){

console.error(err)

res.status(500).json({
success:false,
error:err.message
})

}

})

module.exports = router