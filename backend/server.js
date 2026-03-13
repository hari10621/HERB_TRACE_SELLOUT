const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config()

const app = express()

/* ===============================
   MIDDLEWARE
=============================== */

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

/* ===============================
   STATIC FILES
=============================== */

app.use("/uploads", express.static(path.join(__dirname,"uploads")))

/* ===============================
   DATABASE
=============================== */

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.error("MongoDB Error:",err))

/* ===============================
   ROUTES
=============================== */

const farmerRoutes = require("./routes/farmerRoutes")
const batchRoutes = require("./routes/batchRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes")
const productionRoutes = require("./routes/productionRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const userRoutes = require("./routes/userRoutes")
const certificateRoutes = require("./routes/certificateRoutes")
const supplierRoutes = require("./routes/supplierRoutes")

const processingRoutes = require("./routes/processingRoutes")
const packetRoutes = require("./routes/packetRoutes")
const inventoryRoutes = require("./routes/inventoryRoutes")
const traceRoutes = require("./routes/traceRoutes")
const receiveRoutes = require("./routes/receiveRoutes")

/* ===============================
   API ROUTES
=============================== */

app.use("/api", farmerRoutes)
app.use("/api", batchRoutes)
app.use("/api", analyticsRoutes)
app.use("/api", productionRoutes)
app.use("/api", uploadRoutes)
app.use("/api", userRoutes)
app.use("/api", certificateRoutes)
app.use("/api", supplierRoutes)

app.use("/api", processingRoutes)
app.use("/api", packetRoutes)
app.use("/api", inventoryRoutes)
app.use("/api", traceRoutes)
app.use("/api", receiveRoutes)

console.log("✅ All routes loaded")

/* ===============================
   TEST ROUTE
=============================== */

app.get("/",(req,res)=>{
res.send("🌿 HerbTrace Backend Running")
})

/* ===============================
   SERVER
=============================== */

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
console.log(`🚀 Server running on port ${PORT}`)
})