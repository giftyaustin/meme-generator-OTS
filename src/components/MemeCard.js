import React, { useEffect }  from 'react';
import "./memecard.css";
import {useNavigate} from "react-router-dom"
import { isAuthorizedUser } from '../utils/isAuthorizedUser';


const MemeCard = ({meme}) => {
const history = useNavigate()

// ========= meme selected ==============
const memeSelected = ()=>{
sessionStorage.setItem("memeSelected", JSON.stringify(meme))
history("/generate")
}


  return (
    <div style={{"display":"inline-block"}}className='meme-'>
        
      <div className="meme-card-holder">
        <div className="meme-card justify-content-center" onClick={memeSelected}>
            <div className='justify-content-center big-screen'>
        
            <div className='meme-name-holder text-start'>
        <span className='meme-name'>{meme.name}</span></div>
        
            <div className="image-holder">
                <img src= {meme.url}alt="Meme Template" className='meme-template'/>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MemeCard
