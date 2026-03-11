const express = require("express")
const router = express.Router()

const Packet = require("../models/Packet")
const Batch = require("../models/Batch")

router.get("/trace/:id", async (req,res)=>{

 try{

 const id = req.params.id

 /* ==============================
    CHECK IF QR IS PACKET
 ============================== */

 const packet = await Packet.findOne({packetId:id})

 if(packet){

  const batch = await Batch.findOne({batchId:packet.batchId})

  if(!batch){
   return res.status(404).json({error:"Batch not found"})
  }

  return res.json({
   type:"packet",
   packet,
   batch
  })

 }

 /* ==============================
    CHECK IF QR IS BATCH
 ============================== */

 const batch = await Batch.findOne({batchId:id})

 if(batch){

  return res.json({
   type:"batch",
   batch
  })

 }

 /* ==============================
    NOT FOUND
 ============================== */

 return res.status(404).json({
  error:"Trace not found"
 })

 }catch(err){

 console.error(err)

 res.status(500).json({
  error:"Server error"
 })

 }

})

module.exports = router