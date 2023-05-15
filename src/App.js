import Navbar from "./components/Navbar";
import "./app.css";
import { useEffect, useState } from "react";
import MemeCard from "./components/MemeCard";

function App() {
  const [memes, setMemes] = useState();
  const [data, setData] = useState();
  const [currMemes, setCurrMemes] = useState();
  const [pages, setPages]= useState();
  const [currPage, setCurrPage]= useState(1);

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
// ========================================================


// ============== display current memes ===================

const displayCurrMemes=()=>{
  if(memes){
  setCurrMemes(memes.slice(currPage*20,currPage*20+20))
  }
}

useEffect(()=>{
  displayCurrMemes();
},[memes])

// ========================================================
  return (
    <div className="App">

      {/* ====== Navbar component ====== */}


      <Navbar />

      {/* ======= Meme Card component */}
        <div className="container-fluid text-center">
      {currMemes?currMemes.map((c,i)=>{
        return(<MemeCard meme = {c} key={i}/>)
      }):""}
      </div>


    </div>
  );
}

export default App;
