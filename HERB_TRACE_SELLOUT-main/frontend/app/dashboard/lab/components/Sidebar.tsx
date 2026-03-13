"use client"

import Link from "next/link"

export default function Sidebar(){

return(

<div className="sidebar">

<h2>🌿 HerbTrace</h2>

<ul>

<li><Link href="/dashboard/lab">Dashboard</Link></li>

<li><Link href="/dashboard/lab/verification">Batch Verification</Link></li>

<li><Link href="/dashboard/lab/testing">Quality Testing</Link></li>

<li><Link href="/dashboard/lab/inventory">Lab Inventory</Link></li>

<li><Link href="/dashboard/lab/certification">Lab Certification</Link></li>

</ul>

</div>

)

}