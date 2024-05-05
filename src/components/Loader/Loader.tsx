import React from 'react'

type Props = {
  className?: string
}

const Loader = (props: Props) => {
  return (
    <div className='loader__container'>
       <span className={`loader ${props.className ? props.className : ''}`}></span>
    </div>
  )
}

export default Loader