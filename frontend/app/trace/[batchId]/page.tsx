"use client"

import { useEffect, useState } from "react"
import { QRCodeCanvas } from "qrcode.react"

interface Batch {
  batchId: string
  herbName: string
  farmer: string
  quantity: number
  location: string
}

interface Packet {
  packetId: string
  batchId: string
  herbName: string
  weight: number
}

export default function PackagingPage() {

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  const [batches, setBatches] = useState<Batch[]>([])
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const [packets, setPackets] = useState<Packet[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    fetch(`${API}/api/batches`)
      .then(res => res.json())
      .then(data => setBatches(data))
      .catch(err => console.error(err))

  }, [])

  const generatePackets = async () => {

    if (!selectedBatch) return

    setLoading(true)

    const res = await fetch(`${API}/api/packets/create`, {

      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({

        batchId: selectedBatch.batchId,
        herbName: selectedBatch.herbName,
        totalWeight: selectedBatch.quantity * 1000,
        packetWeight: 250

      })

    })

    const data = await res.json()

    if (data.packets) {
      setPackets(data.packets)
    }

    setLoading(false)
  }

  return (

    <div className="p-8 text-white">

      <h1 className="text-3xl mb-6 text-green-400">
        Packaging & QR Generation
      </h1>

      {/* SELECT BATCH */}

      <select
        className="w-full p-3 bg-[#062f27] rounded"
        onChange={(e) => {

          const batch = batches.find(
            b => b.batchId === e.target.value
          )

          if (batch) setSelectedBatch(batch)

        }}
      >

        <option>Select Batch</option>

        {batches.map(batch => (

          <option key={batch.batchId} value={batch.batchId}>
            {batch.batchId} - {batch.herbName}
          </option>

        ))}

      </select>

      {/* BATCH DETAILS */}

      {selectedBatch && (

        <div className="mt-6 bg-[#083d34] p-6 rounded">

          <p><b>Batch:</b> {selectedBatch.batchId}</p>
          <p><b>Herb:</b> {selectedBatch.herbName}</p>
          <p><b>Farmer:</b> {selectedBatch.farmer}</p>
          <p><b>Location:</b> {selectedBatch.location}</p>
          <p><b>Quantity:</b> {selectedBatch.quantity} kg</p>

          <div className="mt-4">

            <p className="mb-2 text-green-400">
              Farmer Batch QR
            </p>

            <QRCodeCanvas
              value={`${BASE}/trace/${selectedBatch.batchId}`}
              size={120}
            />

          </div>

          <button
            onClick={generatePackets}
            className="mt-6 bg-green-600 px-4 py-2 rounded"
          >
            {loading ? "Generating..." : "Generate QR Codes"}
          </button>

        </div>

      )}

      {/* PACKETS */}

      {packets.length > 0 && (

        <div className="mt-6 grid grid-cols-5 gap-4">

          {packets.map(packet => (

            <div key={packet.packetId} className="bg-[#062f27] p-4 rounded">

              <QRCodeCanvas
                value={`${BASE}/trace/${packet.packetId}`}
                size={100}
              />

              <p className="text-xs mt-2 break-all">
                {packet.packetId}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  )
}