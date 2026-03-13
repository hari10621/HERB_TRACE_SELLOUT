"use client"

export default function CertificatePage(){

 const API = process.env.NEXT_PUBLIC_API_URL

 function downloadCertificate(){

  const farmerId = localStorage.getItem("farmerId")

  window.open(
   `${API}/api/certificate/${farmerId}`,
   "_blank"
  )

 }

 return(

 <div className="max-w-xl mx-auto bg-[#062c21] p-8 rounded-xl">

 <h1 className="text-3xl text-green-400 font-bold mb-6 text-center">
 Farm Authenticity Certificate
 </h1>

 <p className="text-gray-300 text-center mb-6">
 Download your verified farmer authentication certificate issued by HerbTrace.
 </p>

 <button
  onClick={downloadCertificate}
  className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-semibold"
 >
 Download Certificate
 </button>

 </div>

 )

}