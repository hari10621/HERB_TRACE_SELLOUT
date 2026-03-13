"use client"

import { useRouter } from "next/navigation"
import Sidebar from "./components/Sidebar"

export default function LabLayout({ children }: { children: React.ReactNode }) {

const router = useRouter()

const logout = () => {

localStorage.removeItem("token")
localStorage.removeItem("user")

router.push("/login")

}

return (

<div className="layout">

<Sidebar />

<div className="content">

{/* TOP BAR */}

<div className="topbar">

<h2>Lab Tester Panel</h2>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

{/* PAGE CONTENT */}

{children}

</div>

</div>

)

}