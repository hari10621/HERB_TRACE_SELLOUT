"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function FarmerLogin(){

 const router = useRouter()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [loading,setLoading] = useState(false)

 async function login(){

  try{

   setLoading(true)

   const res = await fetch("http://localhost:5000/api/farmer/login",{
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({ email,password })
   })

   const data = await res.json()

   if(!res.ok){

    alert(data.message || "Login failed")
    setLoading(false)
    return

   }

   // STORE FARMER ID
   localStorage.setItem("farmerId",data._id)

   console.log("Stored farmerId:",data._id)

   // SMALL DELAY (ensures storage is written)
   setTimeout(()=>{
    router.push("/dashboard/farmer/home")
   },200)

  }
  catch(err){

   console.log(err)
   alert("Server error")

  }
  finally{
   setLoading(false)
  }

 }

 return(

 <div className="min-h-screen bg-[#041f17] flex items-center justify-center text-white">

  <div className="border border-green-900 rounded-2xl p-12 w-[420px] bg-[#062c21]">

   <h1 className="text-3xl font-bold mb-8 text-center">
    🌾 Farmer Login
   </h1>

   <input
    placeholder="Email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    className="w-full p-3 mb-4 rounded bg-[#041f17] border border-green-900"
   />

   <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    className="w-full p-3 mb-6 rounded bg-[#041f17] border border-green-900"
   />

   <button
    onClick={login}
    disabled={loading}
    className="w-full bg-green-500 hover:bg-green-400 text-black p-3 rounded"
   >
    {loading ? "Logging in..." : "Login"}
   </button>

  </div>

 </div>

 )
}