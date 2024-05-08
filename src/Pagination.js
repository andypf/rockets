import React from "react"

export default function ({ page, onChange, total }) {
  return (
    <div className="pagination">
      {page > 1 && (
        <button className="prev" onClick={() => onChange(page - 1)}>
          Prev
        </button>
      )}
      <span className="current">{page}</span>
      {page < total && (
        <button className="next" onClick={() => onChange(page + 1)}>
          Next
        </button>
      )}
    </div>
  )
}
