const express = require("express")
const router = express.Router()

const Batch = require("../models/Batch")
const LabTest = require("../models/LabTest")

/* ===================================================
   LAB DASHBOARD
=================================================== */

router.get("/lab/dashboard", async (req, res) => {

try {

const total = await LabTest.countDocuments()

const completed = await LabTest.countDocuments({ status: "Approved" })

const rejected = await LabTest.countDocuments({ status: "Rejected" })

const pending = await LabTest.countDocuments({ status: "Testing" })

const bis = total ? Math.round((completed / total) * 100) : 0

res.json({
samples: total,
completed,
pending,
rejected,
bis
})

}
catch (err) {

console.log(err)
res.status(500).json({ error: "Dashboard error" })

}

})


/* ===================================================
   BATCH VERIFICATION
=================================================== */

router.get("/lab/batch/:batchId", async (req, res) => {

try {

const batch = await Batch.findOne({ batchId: req.params.batchId })

if (!batch) {

return res.json(null)

}

res.json(batch)

}
catch (err) {

console.log(err)
res.status(500).json({ error: "Batch verification failed" })

}

})


/* ===================================================
   SUBMIT QUALITY TEST
=================================================== */

router.post("/lab/test", async (req, res) => {

try {

const test = new LabTest({

batchId: req.body.batchId,
herbName: req.body.herbName,
testerName: req.body.testerName,
moisture: req.body.moisture,
purity: req.body.purity,
heavyMetals: req.body.heavyMetals,
qualityGrade: req.body.qualityGrade,
status: req.body.status

})

await test.save()

res.json({
message: "Lab test saved",
data: test
})

}
catch (err) {

console.log(err)
res.status(500).json({ error: "Test submission failed" })

}

})


/* ===================================================
   LAB INVENTORY
=================================================== */

router.get("/lab/inventory", async (req, res) => {

try {

const data = await LabTest.find().sort({ createdAt: -1 })

res.json(data)

}
catch (err) {

console.log(err)
res.status(500).json({ error: "Inventory fetch failed" })

}

})


/* ===================================================
   LAB CERTIFICATE
=================================================== */

router.get("/lab/certificate/:batchId", async (req, res) => {

try {

const cert = await LabTest.findOne({ batchId: req.params.batchId })

if (!cert) {

return res.json(null)

}

res.json(cert)

}
catch (err) {

console.log(err)
res.status(500).json({ error: "Certificate fetch failed" })

}

})


module.exports = router

router.get("/lab/batch/:batchId", async (req,res)=>{

const batch = await Batch.findOne({batchId:req.params.batchId})

res.json(batch)

})