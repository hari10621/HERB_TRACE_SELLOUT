const mongoose = require("mongoose")

const LabTestSchema = new mongoose.Schema({

batchId: String,

herbName: String,

testerName: String,

testDate: {
type: Date,
default: Date.now
},

moisture: Number,

purity: Number,

contamination: String,

heavyMetals: String,

qualityGrade: String,

status: String,

certificateId: String

})

module.exports = mongoose.model("LabTest", LabTestSchema)