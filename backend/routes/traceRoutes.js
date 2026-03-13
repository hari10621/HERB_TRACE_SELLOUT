const express = require("express")
const router = express.Router()

const Packet = require("../models/Packet")
const Batch = require("../models/Batch")

router.get("/trace/:id", async (req,res)=>{

 try{

 const id = req.params.id

 // Check packet first
 const packet = await Packet.findOne({packetId:id})

 if(packet){

  const batch = await Batch.findOne({batchId:packet.batchId})

  return res.json({
   type:"packet",
   packet,
   batch
  })

 }

 // Check batch QR
 const batch = await Batch.findOne({batchId:id})

 if(batch){

  return res.json({
   type:"batch",
   batch
  })

 }

 res.status(404).json({error:"Trace not found"})

 }catch(err){

 res.status(500).json({error:err.message})

 }

})

module.exports = router