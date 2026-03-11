    "use client"

    import { useEffect,useState } from "react"
    import { Bar } from "react-chartjs-2"

    import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
    } from "chart.js"

    ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
    )

    /* ======================
    TYPES
    ====================== */

    interface Review{
    user:string
    comment:string
    rating:number
    }

    interface Farmer{
    _id:string
    name:string
    farmName:string
    location:string
    experience:number
    rating:number
    totalHarvests:number
    profilePhoto:string
    reviews:Review[]
    }

    interface Production{
    herbs:{[key:string]:number}
    totalHarvests:number
    totalQuantity:number
    }

    interface Demand{
    herbs:{[key:string]:number}
    mostDemanded:[string,number]
    leastDemanded:[string,number]
    }

    /* ======================
    COMPONENT
    ====================== */

    export default function FarmerHome(){

    const [farmer,setFarmer] = useState<Farmer | null>(null)
    const [herbStats,setHerbStats] = useState<Production | null>(null)
    const [regionStats,setRegionStats] = useState<{[key:string]:number}>({})
    const [recommendation,setRecommendation] = useState<string>("")

    useEffect(()=>{

    const id = localStorage.getItem("farmerId")
    if(!id) return

    fetch(`http://localhost:5000/api/farmer/${id}`)
    .then(res=>res.json())
    .then(data=>{

    setFarmer(data)

    fetch(`http://localhost:5000/api/production/${data._id}`)
    .then(res=>res.json())
    .then(setHerbStats)

    fetch(`http://localhost:5000/api/production/region/${data.location}`)
    .then(res=>res.json())
    .then(setRegionStats)

    fetch(`http://localhost:5000/api/analytics/demand`)
    .then(res=>res.json())
    .then(res=>{

        if(res.leastDemanded){
        setRecommendation(res.leastDemanded[0])
        }

    })

    })

    },[])

    if(!farmer){
    return <div className="text-white text-xl">Loading...</div>
    }

    /* SAFE DATA */

    const herbs = herbStats?.herbs || {}
    const region = regionStats || {}

    /* CHART OPTIONS */

    const chartOptions={

    responsive:true,
    maintainAspectRatio:false,

    plugins:{legend:{display:false}},

    scales:{
    x:{ticks:{color:"#a7f3d0"}},
    y:{ticks:{color:"#a7f3d0"}}
    }

    }

    /* HERB CHART */

    const herbChart={

    labels:Object.keys(herbs),

    datasets:[{
    label:"Herb Production",
    data:Object.values(herbs),
    backgroundColor:"#22c55e",
    borderRadius:6
    }]

    }

    /* REGION CHART */

    const regionChart={

    labels:Object.keys(region),

    datasets:[{
    label:"Regional Production",
    data:Object.values(region),
    backgroundColor:"#4ade80",
    borderRadius:6
    }]

    }

    return(

    <div className="space-y-8">

    {/* PROFILE */}

    <div className="flex items-center gap-6 bg-[#062c21] p-6 rounded-xl shadow-lg">

    <img
    src={
        farmer.profilePhoto?.startsWith("data:")
        ? farmer.profilePhoto
        : `http://localhost:5000${farmer.profilePhoto}`
    }
    className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
    />

    <div>

    <h2 className="text-2xl font-bold">{farmer.name}</h2>

    <div className="text-yellow-400 mt-1 text-lg">
        {"⭐".repeat(Math.round(farmer.rating))}
        <span className="text-gray-300 ml-2">
        ({farmer.rating}/5)
        </span>
    </div>

    </div>

    </div>

    {/* FARM INFO */}

    <div className="grid grid-cols-4 gap-6">

    <div className="bg-[#062c21] p-5 rounded-xl shadow-md">
    <p className="text-gray-400 text-sm">Farm Name</p>
    <p className="text-lg">{farmer.farmName}</p>
    </div>

    <div className="bg-[#062c21] p-5 rounded-xl shadow-md">
    <p className="text-gray-400 text-sm">Location</p>
    <p className="text-lg">{farmer.location}</p>
    </div>

    <div className="bg-[#062c21] p-5 rounded-xl shadow-md">
    <p className="text-gray-400 text-sm">Experience</p>
    <p className="text-lg">{farmer.experience} yrs</p>
    </div>

    <div className="bg-[#062c21] p-5 rounded-xl shadow-md">
    <p className="text-gray-400 text-sm">Total Harvests</p>
    <p className="text-lg">{herbStats?.totalHarvests || 0}</p>
    </div>

    </div>

    {/* CHARTS */}

    <div className="grid grid-cols-2 gap-6">

    <div className="bg-[#062c21] p-6 rounded-xl shadow-lg">

    <h3 className="text-lg mb-4">
        Herb Cultivation
    </h3>

    <div className="h-[250px]">
        <Bar data={herbChart} options={chartOptions}/>
    </div>

    </div>

    <div className="bg-[#062c21] p-6 rounded-xl shadow-lg">

    <h3 className="text-lg mb-4">
        Regional Farmer Comparison
    </h3>

    <div className="h-[250px]">
        <Bar data={regionChart} options={chartOptions}/>
    </div>

    </div>

    </div>

    {/* AI RECOMMENDATION */}

    {recommendation &&(

    <div className="bg-[#062c21] p-6 rounded-xl shadow-lg">

    <h3 className="text-lg mb-3 text-green-400">
    AI Crop Recommendation
    </h3>

    <p>
    Based on market demand analysis, cultivating
    <span className="text-green-400 font-semibold"> {recommendation}</span>
    is recommended because its supply is currently low.
    </p>

    </div>

    )}

    {/* REVIEWS */}

    <div className="bg-[#062c21] p-6 rounded-xl shadow-lg">

    <h3 className="text-lg mb-4">
    Customer Reviews
    </h3>

    {farmer.reviews.length===0 &&(
    <p className="text-gray-400">No reviews yet</p>
    )}

    {farmer.reviews.map((r,i)=>(

    <div key={i} className="border-b border-green-900 py-3">

        <div className="text-yellow-400">
        {"⭐".repeat(r.rating)}
        </div>

        <p>{r.comment}</p>

        <p className="text-sm text-gray-400">
        - {r.user}
        </p>

    </div>

    ))}

    </div>

    </div>

    )

    }