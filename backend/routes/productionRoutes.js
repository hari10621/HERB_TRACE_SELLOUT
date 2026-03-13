const express = require("express")
const router = express.Router()

const Batch = require("../models/Batch")

/* =====================================
   FARMER HERB PRODUCTION
===================================== */

router.get("/production/:farmerId", async(req,res)=>{

 try{

  const batches = await Batch.find({
   farmerId:req.params.farmerId
  })

  const herbs = {}
  let totalQuantity = 0

  batches.forEach(b=>{

   if(!herbs[b.herbName]){
    herbs[b.herbName] = 0
   }

   herbs[b.herbName] += b.quantity
   totalQuantity += b.quantity

  })

  res.json({
   herbs,
   totalHarvests:batches.length,
   totalQuantity
  })

 }
 catch(err){

  res.status(500).json({error:err.message})

 }

})


/* =====================================
   REGIONAL FARMER COMPARISON
===================================== */

router.get("/production/region/:location", async(req,res)=>{

 try{

  const batches = await Batch.find({
   location:req.params.location
  })

  const stats = {}

  batches.forEach(b=>{

   if(!stats[b.farmer]){
    stats[b.farmer] = 0
   }

   stats[b.farmer] += b.quantity

  })

  res.json(stats)

 }
 catch(err){

  res.status(500).json({error:err.message})

 }

})


/* =====================================
   GLOBAL HERB DEMAND ANALYSIS
===================================== */

router.get("/analytics/demand", async(req,res)=>{

 try{

  const batches = await Batch.find()

  const herbs = {}

  batches.forEach(b=>{

   if(!herbs[b.herbName]){
    herbs[b.herbName] = 0
   }

   herbs[b.herbName] += b.quantity

  })

  let mostHerb = null
  let leastHerb = null

  const values = Object.entries(herbs)

  if(values.length){

   mostHerb = values.reduce((a,b)=>a[1]>b[1]?a:b)
   leastHerb = values.reduce((a,b)=>a[1]<b[1]?a:b)

  }

  res.json({
   herbs,
   mostDemanded:mostHerb,
   leastDemanded:leastHerb
  })

 }
 catch(err){

  res.status(500).json({error:err.message})

 }

})

module.exports = router