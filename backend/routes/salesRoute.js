const express = require("express")
const router = express.Router()

const Packet = require("../models/Packet")

router.put("/packet/sell/:packetId", async(req,res)=>{

 const packet = await Packet.findOne({packetId:req.params.packetId})

 if(!packet){
  return res.status(404).json({message:"Packet not found"})
 }

 packet.status="sold"

 await packet.save()

 res.json({message:"Packet marked as sold"})

})

module.exports = router