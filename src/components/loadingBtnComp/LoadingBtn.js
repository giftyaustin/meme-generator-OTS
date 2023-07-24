import React from 'react'
import LoadingLines from './LoadingLines'

const LoadingBtn = ({isLoading, btnText}) => {
  return (
    <div className='LoadingBtn'>
      {isLoading ? <LoadingLines/> : <>{btnText}</>}
    </div>
  )
}

export default LoadingBtn
