const express = require("express")
const router = express.Router()

router.post("/pi-chat", async(req,res)=>{

const msg = req.body.message.toLowerCase()

let reply = "I did not understand."

if(msg.includes("pending")){
reply = "There are pending lab tests that require verification."
}

else if(msg.includes("batch")){
reply = "Use Batch Verification to check batch details."
}

else if(msg.includes("certificate")){
reply = "Certificates are generated in the Lab Certification module."
}

res.json({reply})

})

module.exports = router