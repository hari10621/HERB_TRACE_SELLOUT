"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface Batch {
  batchId: string
  herbName: string
  qualityGrade: string
  status: string
}

export default function LabInventory() {

  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/lab/inventory")
      .then((res) => {
        setBatches(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })

  }, [])

  return (

    <div style={{ padding: "30px" }}>

      <h1 style={{
        fontSize: "30px",
        marginBottom: "20px",
        fontWeight: "600"
      }}>
        Lab Inventory
      </h1>

      <div className="inventory-card">

        <table className="inventory-table">

          <thead>

            <tr>
              <th>Batch ID</th>
              <th>Herb</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                  Loading inventory...
                </td>
              </tr>

            ) : batches.length === 0 ? (

              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                  No batches found
                </td>
              </tr>

            ) : (

              batches.map((batch, i) => (

                <tr key={i}>

                  <td className="batch-id">{batch.batchId}</td>

                  <td>{batch.herbName}</td>

                  <td>
                    <span className={`grade grade-${batch.qualityGrade}`}>
                      {batch.qualityGrade}
                    </span>
                  </td>

                  <td>
                    <span className={`status status-${batch.status}`}>
                      {batch.status}
                    </span>
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  )
}