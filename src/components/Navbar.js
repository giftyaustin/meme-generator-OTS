import React from 'react';
import "./navbar.css"

const Navbar = () => {


  // =========== form submition =============
  const handleSubmit=(e)=>{
 
        e.preventDefault();
  }
  return (
    <div>

      {/* ============ Navbar ============= */}
     
     
      <div className="nav-holder">
            <div className="input-search-holder">
              <div className="input-holder">
                <form action="submit" onSubmit={e=>{
                  handleSubmit(e)
                }}>
                <input type="text" className='search-input' placeholder='Search name'/></form>
              </div>
              <div className="search-holder">
                <button className='btn search-btn'>Search</button>
              </div>
            </div>
      </div>
    </div>
  )
}

export default Navbar
