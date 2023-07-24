import Navbar from "./components/Navbar";
import "./App.css";
import { useEffect, useState, lazy, Suspense } from "react";
import DisplayMemes from "./components/userComp/DisplayMemes";
import { Routes, Route } from "react-router-dom";
import Home from "./components/homeComp/Home";
import { userContext } from "./components/context/userContext";
import LoginPage from "./components/loginComp/LoginPage";
import { useNavigate } from "react-router-dom";
import LoadingMain from "./components/loadingComp/LoadingMain";
import { useDispatch, useSelector } from "react-redux";
import { MEMES_LOADING, MEMES_SUCCESS } from "./store/constants";

const Generate = lazy(() => import("./components/Generate.js"));
const MemeCard = lazy(() => import("./components/MemeCard.js"));
const Pagination = lazy(() => import("./components/Pagination.js"));

function App() {
  const dispatch = useDispatch()
  const [isGuest, setIsGuest] = useState(false);
  const history = useNavigate();
  const [memes, setMemes] = useState();
  const [userMemes, setUserMemes] = useState();
  const [data, setData] = useState();
  const {currMemes} =useSelector(state=>state.currMemes) 
  const [pages, setPages] = useState();
  const [currPage, setCurrPage] = useState(0);
  const {user} = useSelector(state=>state.user)

  // ============= fetching memes ===========================

  const fetchMemes = () => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res.json().then((res) => {
        setData(res.data.memes);
      });
    });
  };

  useEffect(() => {
    dispatch({type:MEMES_LOADING})
    fetchMemes();
  }, []);

  useEffect(() => {
    setMemes(data);
    if (data) {
      setPages(Math.ceil(data.length / 20));
    }
  }, [data]);
  useEffect(() => {
    if (memes) {
      setPages(Math.ceil(memes.length / 20));
    }
  }, [memes]);

  useEffect(() => {
    if (memes) {
      setCurrPage(0);
    }
  }, [pages]);
  // ========================================================

  // ============== display current memes ===================

  const displayCurrMemes = () => {
    if (memes) {
      dispatch({type:MEMES_SUCCESS, payload:memes.slice(currPage * 20, currPage * 20 + 20)})
      // setCurrMemes(memes.slice(currPage * 20, currPage * 20 + 20));
    }
  };

  useEffect(() => {
    displayCurrMemes();
  }, [memes, currPage]);

  // ========================================================

  // ========== change page number ===================

  const changePage = (n) => {
    setCurrPage(n - 1);
  };
  const prevPage = (n) => {
    setCurrPage(n - 1);
  };
  const nextPage = (n) => {
    setCurrPage(n + 1);
  };

  // ======================================================
  //  ============== search memes =========================
  const searchMemes = (searchValue) => {
    if (searchValue !== "") {
      setMemes(
        data.filter((c, i) => {
          return (
            c.name.toLowerCase() === searchValue.toLowerCase() ||
            c.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
            c.name
              .toLowerCase()
              .replaceAll(" ", "")
              .includes(searchValue.toLowerCase().replaceAll(" ", ""))
          );
        })
      );
    }
  };
  var viewAllResult;
  try {
    viewAllResult = memes.length !== data.length;
  } catch (error) {}
  // ============== view all memes =====================
  const viewAllMemes = () => {
    setMemes(data);
  };
  const fetchUserMemes = async () => {
    
    const response = await fetch(
      `${process.env.REACT_APP_CLIENT_URL}/image/fetch`,
      {
        credentials:"include"
      }
    );
    const memedata = await response.json();
   
    if (memedata.memes && memedata.memes.length) {
      setUserMemes(memedata.memes);
    
    } else {
      alert("no memes to show, create some !");
    }
  };
  useEffect(() => {
    if (userMemes) {
      history("/userdata");
    }
  }, [userMemes]);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <userContext.Provider
              value={{ isGuest: isGuest, setIsGuest: setIsGuest }}
            >
              <Home />
            </userContext.Provider>
          }
        />
        <Route exact path="/auth" element={<LoginPage />} />
        <Route
          exact
          path="/main"
          element={
            <Suspense fallback={<div className="loadingMain-h"><LoadingMain/></div>}>
              {/* ====== Navbar component ====== */}
              <Navbar searchMemes={searchMemes} />
              {!pages === 0 ? (
                <div className="select-meme-text">
                  Tap on the meme template you want to select
                </div>
              ) : (
                ""
              )}
              {pages === 0 ? (
                <div className="my-3 no-memes">No memes found</div>
              ) : (
                ""
              )}
              {!viewAllResult ? (
                ""
              ) : (
                <div className="d-flex justify-content-center">
                  <button
                    className="btn view-all-btn btn-sm my-3"
                    onClick={viewAllMemes}
                  >
                    View all
                  </button>
                </div>
              )}
              {user &&  (
                <div className="d-flex justify-content-center">
                  <button className="your-memes-btn" onClick={fetchUserMemes}>
                    Your memes
                  </button>
                </div>
              ) }
              {/* ======= Meme Card component */}
              <div className="container-fluid text-center memes-block">
                {currMemes
                  ? currMemes.map((c, i) => {
                      return <MemeCard meme={c} key={i} />;
                    })
                  : <LoadingMain/>}
              </div>
              <Suspense fallback={<div></div>}>
                <Pagination
                  pages={pages}
                  changePage={changePage}
                  currPage={currPage}
                  nextPage={nextPage}
                  prevPage={prevPage}
                />
              </Suspense>
            </Suspense>
          }
        />

        {/* ====== Generate component ====== */}

        <Route
          exact
          path="/generate"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <userContext.Provider value={{ isGuest: isGuest }}>
                <Generate />
              </userContext.Provider>
            </Suspense>
          }
        />

        <Route
          exact
          path="/userdata"
          element={
            <userContext.Provider value={{ memes: userMemes }}>
              <DisplayMemes fetchUserMemes={fetchUserMemes}/>
            </userContext.Provider>
          }
        />
      </Routes>

    </div>
  );
}

export default App;
