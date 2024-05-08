import React from "react"

export default function SortLinks({ name, handleClick }) {
  return (
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          handleClick({ name, order: "desc" })
        }}
      >
        desc
      </a>{" "}
      |{" "}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          handleClick({ name, order: "asc" })
        }}
      >
        asc
      </a>
    </>
  )
}
