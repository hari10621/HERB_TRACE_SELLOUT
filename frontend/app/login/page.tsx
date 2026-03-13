



"use client"

import { useRouter } from "next/navigation"

export default function LoginPage(){

 const router = useRouter()

 const roles = [

  {
   name:"Farmer",
   desc:"Manage crops & harvests",
   icon:"🌾",
   route:"/login/farmer"
  },

  {
   name:"Supplier",
   desc:"Track & distribute stock",
   icon:"📦",
   route:"/login/supplier"
  },

  {
   name:"Lab Tester",
   desc:"Verify herb quality",
   icon:"🧪",
   route:"/login/lab"
  },

  {
   name:"Consumer",
   desc:"Trace herb origins",
   icon:"🔎",
   route:"/login/consumer"
  },

  {
   name:"Admin",
   desc:"Oversee the network",
   icon:"🛡",
   route:"/login/admin"
  }

 ]

 return(

 <div className="min-h-screen bg-[#041f17] text-white flex items-center justify-center">

  {/* GRID BACKGROUND */}

  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#134e3a_1px,transparent_1px),linear-gradient(90deg,#134e3a_1px,transparent_1px)] bg-[size:60px_60px]" />

  {/* MAIN PANEL */}

  <div className="relative border border-[#134e3a] rounded-3xl p-16 w-[1200px] backdrop-blur-md bg-[#062c21]">

   {/* HEADER */}

   <div className="text-center mb-14">

    <div className="text-green-400 text-xs tracking-widest mb-3">
     ● BLOCKCHAIN VERIFIED
    </div>

    <h1 className="text-5xl font-bold">

     🌿 Herb<span className="text-green-400">Trace</span>

    </h1>

    <p className="text-gray-400 mt-3">
     Secure Herbal Supply Chain Verification
    </p>

   </div>

   {/* SUBTITLE */}

   <p className="text-center text-gray-500 mb-10 text-sm tracking-widest">
    SELECT YOUR ROLE TO CONTINUE
   </p>

   {/* ROLE CARDS */}

   <div className="grid grid-cols-5 gap-6">

    {roles.map((role,index)=>(

     <div
      key={index}
      onClick={()=>router.push(role.route)}
      className="cursor-pointer border border-[#134e3a] hover:border-green-400 rounded-2xl p-8 text-center transition duration-300 hover:scale-105 bg-[#05251c]"
     >

      <div className="text-3xl mb-4">
       {role.icon}
      </div>

      <h2 className="text-lg font-semibold">
       {role.name}
      </h2>

      <p className="text-gray-400 text-sm mt-2">
       {role.desc}
      </p>

     </div>

    ))}

   </div>

   {/* FOOTER */}

   <p className="text-center text-gray-600 text-xs mt-12">
    End-to-end encrypted · Privacy Policy · v2.4.1
   </p>

  </div>

 </div>

 )

}

