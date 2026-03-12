"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ConsumerLogin(){

 const router = useRouter()

 const API =
 process.env.NEXT_PUBLIC_API_URL ||
 "http://localhost:5000"

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [error,setError] = useState("")
 const [loading,setLoading] = useState(false)

 async function handleLogin(){

  setError("")
  setLoading(true)

  try{

   const res = await fetch(`${API}/api/consumer/login`,{

    method:"POST",

    headers:{
     "Content-Type":"application/json"
    },

    body:JSON.stringify({
     email,
     password
    })

   })

   const data = await res.json()

   if(!res.ok){

    setError(data.message || "Login failed")
    setLoading(false)
    return

   }

   /* STORE CONSUMER SESSION */

   localStorage.setItem("consumerId",data.consumerId)
   localStorage.setItem("consumerName",data.name)

   /* REDIRECT */

   router.push("/dashboard/consumer")

  }catch(err){

   console.error(err)
   setError("Server error")

  }

  setLoading(false)

 }

 return(

 <div className="min-h-screen bg-[#041f17] flex items-center justify-center text-white">

  {/* GRID BACKGROUND */}

  <div className="absolute inset-0 opacity-20 
  bg-[linear-gradient(#134e3a_1px,transparent_1px),linear-gradient(90deg,#134e3a_1px,transparent_1px)]
  bg-[size:60px_60px]" />

  {/* LOGIN CARD */}

  <div className="relative border border-[#134e3a] rounded-3xl p-12 w-[420px] bg-[#062c21]">

   <h1 className="text-3xl font-bold text-center mb-8">
    🔎 Consumer Login
   </h1>

   {/* EMAIL */}

   <input
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    placeholder="Email"
    className="w-full p-3 mb-4 rounded bg-[#041f17] border border-[#134e3a]"
   />

   {/* PASSWORD */}

   <input
    type="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    placeholder="Password"
    className="w-full p-3 mb-6 rounded bg-[#041f17] border border-[#134e3a]"
   />

   {/* ERROR */}

   {error &&(

    <p className="text-red-400 mb-4 text-sm">
     {error}
    </p>

   )}

   {/* LOGIN BUTTON */}

   <button
    onClick={handleLogin}
    disabled={loading}
    className="w-full bg-green-400 hover:bg-green-300 text-black p-3 rounded font-semibold"
   >

    {loading ? "Logging in..." : "Login"}

   </button>

   {/* BACK BUTTON */}

   <button
    onClick={()=>router.push("/login")}
    className="text-gray-400 text-sm mt-6 w-full"
   >
    ← Back
   </button>

  </div>

 </div>

 )

}