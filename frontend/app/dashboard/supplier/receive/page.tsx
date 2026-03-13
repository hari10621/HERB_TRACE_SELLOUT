"use client"

import { useEffect, useRef, useState } from "react"
import { BrowserMultiFormatReader } from "@zxing/browser"

export default function ReceivePage(){

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const videoRef = useRef<HTMLVideoElement>(null)

const [message,setMessage] = useState("")
const [scanner,setScanner] = useState<any>(null)

useEffect(()=>{

const codeReader = new BrowserMultiFormatReader()

setScanner(codeReader)

if(videoRef.current){

codeReader.decodeFromVideoDevice(

undefined,
videoRef.current,

async(result,err)=>{

if(result){

const scannedText = result.getText()

try{

const batchId = scannedText.split("/").pop()

const res = await fetch(`${API}/api/receive/batch`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
batchId
})

})

const data = await res.json()

if(data.success){

setMessage(`Batch ${data.batch.batchId} received successfully`)

}else{

setMessage(data.message)

}

}catch(error){

console.error(error)

setMessage("Receive failed")

}

}

}

)

}

return()=>{

if(scanner){
scanner.reset()
}

}

},[])

return(

<div className="p-10 text-white">

<h1 className="text-3xl mb-6">
Receive Batch
</h1>

<div className="bg-[#083d34] p-6 rounded-xl w-[500px]">

<video
ref={videoRef}
className="w-full rounded"
/>

<p className="mt-4 text-green-400">
{message}
</p>

</div>

</div>

)

}