const express = require("express")
const router = express.Router()

const Batch = require("../models/Batch")
const Farmer = require("../models/Farmer") // IMPORTANT


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
   GET FARMER BATCHES
========================== */

router.get("/batches/farmer/:farmerId", async(req,res)=>{

 try{

  const batches = await Batch
   .find({ farmerId:req.params.farmerId })
   .sort({createdAt:-1})

  res.json(batches)

 }
 catch(err){

  res.status(500).json({error:err.message})

 }

})


/* ==========================
   CREATE BATCH
========================== */

router.post("/batches", async (req,res)=>{

 try{

  const farmer = await Farmer.findById(req.body.farmerId)

  const count = await Batch.countDocuments()

  const batchId =
   "HB-" + (count+1).toString().padStart(4,"0")


  const lastBlock = await Batch
   .findOne()
   .sort({createdAt:-1})

  const previousHash =
   lastBlock ? lastBlock.hash : "GENESIS"


  const lat = req.body.latitude
  const lon = req.body.longitude


  const geoImage =
   `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=15&size=600x300&markers=color:red%7C${lat},${lon}`


  const batch = new Batch({

   batchId,

   herbName:req.body.herbName,

   farmer:farmer.name,

   farmerId:farmer._id,

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


  batch.hash = batch.generateHash()

  await batch.save()

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

router.post("/batch/receive", async(req,res)=>{

 try{

 const { qrData } = req.body

 const batch = await Batch.findOne({
 batchId:qrData
 })

 if(!batch){

 return res.status(404).json({
 message:"Batch not found"
 })

 }

 batch.status="received"

 await batch.save()

 res.json(batch)

 }catch(err){

 res.status(500).json({error:err.message})

 }

})

module.exports = router