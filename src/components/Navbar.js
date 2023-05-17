import React, { useEffect, useState } from "react";
import "./navbar.css";


const Navbar = ({ searchMemes }) => {
  const [searchValue, setSearchValue] = useState("");

  // =========== form submition =============
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let cleanText = "";
    for (let i = 0; i < searchValue.length; i++) {
    if(searchValue[i]!==" "){
      cleanText+=searchValue[i]
    }else{
      if(i!==0){
        if(i!==searchValue.length-1){
          if(searchValue[i-1]!==" "&&searchValue[i+1]){
            cleanText+=searchValue[i]
          }
        }
       
      }
    }

    }
    
  if(cleanText[cleanText.length-1]===" "){
    
    cleanText = cleanText.slice(0,cleanText.length-1)
  }
  
   searchMemes(cleanText);
  };



  return (
    <div>
      {/* ============ Navbar ============= */}

      <div className="nav-holder row">
        <div className="input-search-holder col-8">
          <div className="input-holder">
            <form
              action="submit"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <input
                type="text"
                className="search-input"
                placeholder="Search meme"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </form>
          </div>
          <div className="search-holder">
            <button
              className="btn search-btn"
              type="submit"
              onClick={(e) => {
                handleSubmit(e,searchValue);
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="logo-holder col-4"><img className = "logo"  src={require("./images/meme-logo.png")} alt="wwe" /></div>
      </div>
    </div>
  );
};

export default Navbar;
