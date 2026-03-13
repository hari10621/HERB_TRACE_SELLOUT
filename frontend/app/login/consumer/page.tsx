"use client"

import { useRouter } from "next/navigation"

export default function ConsumerLogin(){

 const router = useRouter()

 return(

 <div className="min-h-screen bg-[#041f17] flex items-center justify-center text-white">

  <div className="absolute inset-0 opacity-20 
  bg-[linear-gradient(#134e3a_1px,transparent_1px),linear-gradient(90deg,#134e3a_1px,transparent_1px)]
  bg-[size:60px_60px]" />

  <div className="relative border border-[#134e3a] rounded-3xl p-12 w-[420px] bg-[#062c21]">

   <h1 className="text-3xl font-bold text-center mb-8">
    🔎 Consumer Login
   </h1>

   <input
    placeholder="Email"
    className="w-full p-3 mb-4 rounded bg-[#041f17] border border-[#134e3a]"
   />

   <input
    type="password"
    placeholder="Password"
    className="w-full p-3 mb-6 rounded bg-[#041f17] border border-[#134e3a]"
   />

   <button
    onClick={()=>router.push("/dashboard/consumer")}
    className="w-full bg-green-400 hover:bg-green-300 text-black p-3 rounded font-semibold"
   >
    Login
   </button>

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