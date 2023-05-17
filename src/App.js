import Navbar from "./components/Navbar";
import "./app.css";
import { useEffect, useState } from "react";
import MemeCard from "./components/MemeCard";
import {Routes, Route} from "react-router-dom";
import Generate from "./components/Generate";
import Pagination from "./components/Pagination";

function App() {

  const [memes, setMemes] = useState();
  const [data, setData] = useState();
  const [currMemes, setCurrMemes] = useState();
  const [pages, setPages]= useState();
  const [currPage, setCurrPage]= useState(0);
  

  // ============= fetching memes ===========================

  const fetchMemes = () => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res.json().then((res) => {
        setData(res.data.memes);
      });
    });
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  useEffect(() => {
    setMemes(data);
    if(data){
    setPages(Math.ceil(data.length/20))
    }

  }, [data]);
  useEffect(()=>{
    if(memes){
      setPages(Math.ceil(memes.length/20))
      }
  },[memes])

  useEffect(()=>{
    if(memes){
      setCurrPage(0)
    }
  },[pages])
// ========================================================


// ============== display current memes ===================

const displayCurrMemes=()=>{
  if(memes){
  setCurrMemes(memes.slice(currPage*20,currPage*20+20))
  }
}

useEffect(()=>{
  displayCurrMemes();
},[memes,currPage])

// ========================================================

// ========== change page number ===================

const changePage=(n)=>{
  setCurrPage(n-1);
  
}
const prevPage=(n)=>{
  setCurrPage(n-1)
}
const nextPage=(n)=>{
  setCurrPage(n+1)
}

// ======================================================
//  ============== search memes =========================
const searchMemes = (searchValue)=>{
      if(searchValue!==""){
           setMemes(data.filter((c,i)=>{
            
           return(c.name.toLowerCase()===searchValue.toLowerCase() ||
             c.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
              c.name.toLowerCase().replaceAll(" ","").includes(searchValue.toLowerCase().replaceAll(" ",""))
             )
           }))
      }
     
}


  return (
    <div className="App">

      

<Routes>

  <Route exact path="/" element= {<>
  {/* ====== Navbar component ====== */}
      <Navbar searchMemes={searchMemes}/>

   {/* ======= Meme Card component */}
        <div className="container-fluid text-center memes-block">
          <div className="select-meme-text">Tap on the meme template you want to select</div>
      {currMemes?currMemes.map((c,i)=>{
        return(<MemeCard meme = {c} key={i}/>)
      }):""}

      
      </div>
      <Pagination pages = {pages} changePage={changePage} currPage={currPage} nextPage={nextPage} prevPage={prevPage}/>
      </>}/>

    {/* ====== Generate component ====== */}

<Route exact path="/generate" element={<Generate/>}/>
    
</Routes>

    </div>
  );
}

export default App;
