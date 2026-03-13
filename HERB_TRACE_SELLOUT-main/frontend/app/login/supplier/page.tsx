"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SupplierLogin(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const login = async ()=>{

const res = await fetch("http://localhost:5000/api/supplier/login",{
 method:"POST",
 headers:{ "Content-Type":"application/json" },
 body:JSON.stringify({email,password})
})

const data = await res.json()

if(res.ok){

 localStorage.setItem("supplierId",data.supplierId)

 router.push("/dashboard/supplier")

}else{

 alert(data.message)

}

}

return(

<div className="flex items-center justify-center h-screen bg-[#041f1a]">

<div className="bg-[#083d34] p-8 rounded-xl w-96">

<h1 className="text-green-400 text-xl mb-4">
Supplier Login
</h1>

<input
className="w-full p-2 mb-3 bg-[#062f27]"
placeholder="Email"
onChange={e=>setEmail(e.target.value)}
/>

<input
type="password"
className="w-full p-2 mb-4 bg-[#062f27]"
placeholder="Password"
onChange={e=>setPassword(e.target.value)}
/>

<button
onClick={login}
className="bg-green-500 px-4 py-2 rounded w-full"
>
Login
</button>

</div>

</div>

)

}