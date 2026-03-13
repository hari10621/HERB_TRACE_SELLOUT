export default function StatCard({title,value}:{title:string,value:string}){

return(

<div className="stat-card">

<h3>{title}</h3>

<h2>{value}</h2>

</div>

)

}