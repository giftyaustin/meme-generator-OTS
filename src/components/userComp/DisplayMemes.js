import React, { useEffect } from 'react'
import { userContext } from '../context/userContext'
import { useContext } from 'react'
import './style.css'

const DisplayMemes = ({fetchUserMemes}) => {
    const {memes} = useContext(userContext)



useEffect(()=>{
  fetchUserMemes()
},[])

  return (
    <div className='DisplayMemes'>
    
      {memes && memes.map((c,i)=>{return <div className='im-bl' key={i}><img className='i' src={c} alt={`meme${i+1}`} /></div>})}
    </div>
  )
}

export default DisplayMemes
