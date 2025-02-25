import React from 'react'
import { useUserContext } from "../../context"

export const HomePage = () => {
  const { loading, currentUser } = useUserContext; 
  console.log(loading, currentUser)
  return (
    <div>HomePage</div>
  )
}
