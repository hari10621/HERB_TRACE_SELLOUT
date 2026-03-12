const express = require("express")
const router = express.Router()

const Batch = require("../models/Batch")
const Farmer = require("../models/Farmer")

/* ==========================
   GET ALL BATCHES
========================== */

router.get("/batches", async (req,res)=>{

 try{

  const batches = await Batch
   .find()
   .sort({createdAt:-1})

  res.json(batches)

 }
 catch(err){

  res.status(500).json({error:err.message})

 }

})


/* ==========================
   GET FARMER BATCHES (FIXED)
========================== */

router.get("/batches/farmer/:farmerId", async(req,res)=>{

 try{

  const farmerId = req.params.farmerId

  const farmer = await Farmer.findById(farmerId)

  if(!farmer){

   return res.status(404).json({
    error:"Farmer not found"
   })

  }

  const batches = await Batch.find({

   $or:[
    { farmerId: farmerId },
    { farmerId: farmerId.toString() },
    { farmer: farmer.name }
   ]

  }).sort({createdAt:-1})

  res.json(batches)

 }
 catch(err){

  res.status(500).json({error:err.message})

 }

})


/* ==========================
   CREATE BATCH (BLOCKCHAIN)
========================== */

router.post("/batches", async (req,res)=>{

 try{

  const farmer = await Farmer.findById(req.body.farmerId)

  if(!farmer){

   return res.status(404).json({
    error:"Farmer not found"
   })

  }

  /* GENERATE BATCH ID */

  const count = await Batch.countDocuments()

  const batchId =
   "HB-" + (count+1).toString().padStart(4,"0")


  /* GET PREVIOUS BLOCK */

  const lastBlock = await Batch
   .findOne()
   .sort({createdAt:-1})

  const previousHash =
   lastBlock ? lastBlock.hash : "GENESIS"


  /* GOOGLE MAP IMAGE */

  const lat = req.body.latitude
  const lon = req.body.longitude

  const geoImage =
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=15&size=600x300&markers=color:red%7C${lat},${lon}`


  /* CREATE BLOCK */

  const batch = new Batch({

   batchId,

   herbName:req.body.herbName,

   farmer:farmer.name,

   farmerId:farmer._id.toString(),

   quantity:req.body.quantity,

   unit:"kg",

   harvestDate:req.body.harvestDate,

   location:req.body.location,

   latitude:lat,

   longitude:lon,

   geoImage,

   profilePhoto:farmer.profilePhoto,

   rating:farmer.rating,

   previousHash

  })


  /* GENERATE HASH */

  batch.hash = batch.generateHash()


  /* SAVE BLOCK */

  await batch.save()


  /* UPDATE FARMER STATS */

  await Farmer.findByIdAndUpdate(

   farmer._id,

   {
    $inc:{totalHarvests:1}
   }

  )


  res.json(batch)

 }
 catch(err){

  res.status(500).json({error:err.message})

 }

})


/* ==========================
   TRACE SINGLE BATCH
========================== */

router.get("/batch/:batchId", async(req,res)=>{

 try{

  const batch = await Batch.findOne({
   batchId:req.params.batchId
  })

  if(!batch){

   return res.status(404).json({
    error:"Batch not found"
   })

  }

  res.json(batch)

 }
 catch(err){

  res.status(500).json({error:err.message})

 }

})


/* ==========================
   VERIFY BLOCKCHAIN CHAIN
========================== */

router.get("/blockchain/verify", async(req,res)=>{

 try{

  const blocks = await Batch
   .find()
   .sort({createdAt:1})

  for(let i=1;i<blocks.length;i++){

   const current = blocks[i]
   const previous = blocks[i-1]

   if(current.previousHash !== previous.hash){

    return res.json({
     valid:false,
     message:"Blockchain chain broken",
     block:current.batchId
    })

   }

   const recalculatedHash =
    current.generateHash()

   if(current.hash !== recalculatedHash){

    return res.json({
     valid:false,
     message:"Hash mismatch detected",
     block:current.batchId
    })

   }

  }

  res.json({
   valid:true,
   message:"Blockchain integrity verified"
  })

 }
 catch(err){

  res.status(500).json({error:err.message})

 }

})


/* ==========================
   RECEIVE BATCH
========================== */

router.post("/batch/receive", async(req,res)=>{

 try{

  const {qrData} = req.body

  const batch = await Batch.findOne({
   batchId:qrData
  })

  if(!batch){

   return res.status(404).json({
    message:"Batch not found"
   })

  }

  batch.status = "received"

  await batch.save()

  res.json(batch)

 }
 catch(err){

  res.status(500).json({error:err.message})

 }

})


module.exports = router