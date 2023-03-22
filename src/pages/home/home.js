import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const home = () => {

    const user = useSelector((state) => state.user)

  return (
    <div>home {user.name}</div>
  )
}

export default home