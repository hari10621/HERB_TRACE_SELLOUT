"use client"

import { useState } from "react"
import axios from "axios"

export default function PiChat(){

const [message,setMessage] = useState("")
const [chat,setChat] = useState<any[]>([])

const sendMessage = async () => {

if(!message) return

const newChat = [...chat,{role:"user",text:message}]

setChat(newChat)

try{

const res = await axios.post("http://localhost:5000/api/pi-chat",{
message
})

setChat([...newChat,{role:"bot",text:res.data.reply}])

}catch{

setChat([...newChat,{role:"bot",text:"Server not responding"}])

}

setMessage("")

}

return(

<div className="pi-chat">

<h3>🤖 PI Assistant</h3>

<div className="chat-window">

{chat.map((c,i)=>(
<div key={i} className={c.role==="user"?"user-msg":"bot-msg"}>
{c.text}
</div>
))}

</div>

<div className="chat-input">

<input
placeholder="Ask something..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button onClick={sendMessage}>Send</button>

</div>

</div>

)

}