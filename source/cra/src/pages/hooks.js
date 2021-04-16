import React, { useState, useEffect } from "react"

function Hooks() {
  const [name, setName] = useState("jokcy")

  useEffect(() => {
    console.log('component update');

    return () => {
      console.log('unbind events');
    }
  }, [])

  return (
    <>
      <div>My Name is {name}</div>
      <input type="text" value={name}
        onChange={(e) => { setName(e.target.value) }} />
    </>
  )
}

export default Hooks