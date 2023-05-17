import React from "react";
import "./page.css";

const Pagination = ({pages, changePage, currPage, nextPage, prevPage}) => {
 
  return (
    <div>
      <div className="pagination-holder">
        <div className="prev-next-holder container text-center justify-content-center">
       
          {currPage===0?"":<button className="btn prev-next-btn mx-3 my-3" onClick={()=>{prevPage(currPage)}}>Prev</button>}
          
          {(pages!==0)&&(currPage!==pages-1)?<button className="btn prev-next-btn mx-3 my-3" onClick={()=>{nextPage(currPage)}}>Next</button>:""}
        </div>
        <div className="pages-holder container text-center">
        
          {Array(pages).fill(0).map((c,i)=>{
            return (<div className="page-num-holder mx-3 my-3" onClick = {()=>{
                changePage(i+1);
            }}key={i}>
            <div className={"page-num-outline" + (currPage===i?" highlight":"")}>
              <div className="page-number">{i+1}</div>
            </div>
          </div>)
          })}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
