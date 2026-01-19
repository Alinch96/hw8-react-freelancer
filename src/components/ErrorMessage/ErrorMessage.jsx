import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div>{message || "ErrorMessage"}</div>
  )
}

export default ErrorMessage