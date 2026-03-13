const mongoose = require("mongoose")
const crypto = require("crypto")

const BatchSchema = new mongoose.Schema({

 batchId:{
  type:String,
  required:true,
  unique:true
 },

 herbName:{
  type:String,
  required:true
 },

 /* FARMER INFO */

 farmer:{
  type:String,
  required:true
 },

 farmerId:{
  type:String,
  required:true
 },

 quantity:{
  type:Number,
  required:true
 },

 unit:{
  type:String,
  default:"kg"
 },

 harvestDate:String,

 location:String,

 latitude:Number,

 longitude:Number,

 geoImage:String,

 profilePhoto:String,

 rating:Number,


 /* SUPPLIER INFO */

 supplierId:String,

 supplierName:String,

 supplierCompany:String,

 supplierProcessedDate:String,


 /* PROCESSING */

 processingMethod:String,

 dryingTemperature:Number,

 processingDuration:String,


 /* LAB TEST */

 labTested:{
  type:Boolean,
  default:false
 },

 labName:String,

 labResult:String,

 labTestDate:String,


 /* BLOCKCHAIN */

 previousHash:String,

 hash:String,


 /* TIMESTAMP */

 createdAt:{
  type:Date,
  default:Date.now
 }

})


/* ==========================
   BLOCKCHAIN HASH
========================== */

BatchSchema.methods.generateHash = function(){

 const data =
  this.batchId +
  this.herbName +
  this.farmer +
  this.quantity +
  this.harvestDate +
  this.location +
  this.previousHash

 return crypto
  .createHash("sha256")
  .update(data)
  .digest("hex")

}


module.exports = mongoose.model("Batch",BatchSchema)