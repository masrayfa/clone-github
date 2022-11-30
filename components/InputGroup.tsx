import React, { useEffect, useRef } from 'react'

interface Props {
  placeholder: string
  refer: any
  className?: string
}

const InputGroup = ({ placeholder, refer, className }: Props) => {
  return (
    <div className="form-control">
      <div className="input-accent">
        <input
          type="text"
          placeholder={placeholder}
          className={`input input-bordered rounded-none ${className}`}
          ref={refer}
        />
      </div>
    </div>
  )
}

export default InputGroup
