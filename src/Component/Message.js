import React from 'react'

export const Message = ({variant, children}) => {
  return (
    <div className={`alert alert-${variant}`}>{children}</div>
  )
}
