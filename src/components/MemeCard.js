import React from 'react';
import "./memecard.css"

const MemeCard = ({meme}) => {
  return (
    <div style={{"display":"inline-block"}}>
        
      <div className="meme-card-holder">
        <div className="meme-card justify-content-center">
            <div className='justify-content-center'>
        
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
